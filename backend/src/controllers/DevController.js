const axios = require('axios');
const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../websocket');



module.exports = {
    async index(req, res){
       const devs = await Dev.find();

       return res.json(devs);
    },
    async store(req,res){
        const { github_username, techs, latitude, longitude } = req.body;

        // verificar se uruario existe //
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const {name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = techs.split(',').map(tech => tech.trim());
    
            const location = {
                type: "Point",
                coordinates: [longitude,latitude],
            };
           
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // filtrar as conecxões que estão no maximo a 10km de distancia
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
            )

            sendMessage(sendSocketMessageTo,'new-dev', dev);
        }   
        return res.json(dev);

    },
    async update(req,res){
          let { latitude, longitude, github_username } = req.body;
          
          const location = {
              type: "Point",
              coordinates: [longitude,latitude]
          }

          let dev = await Dev.findOne({ github_username });

         if(!dev){
             return res.send("user not found");
         }
         dev = await Dev.updateOne(
             { github_username },
              {$set: { location } }
            )
         return res.json(dev);
        
    },
    async destroy(req,res){
        
    }
}