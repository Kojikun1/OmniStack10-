const express = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController');

const router = express.Router();

router.get('/devs', DevController.index);

router.post('/devs', DevController.store );

router.get('/search',SearchController.index);

router.put('/update', DevController.update);

module.exports = router;