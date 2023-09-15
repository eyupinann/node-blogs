const express = require('express');
const bodyParser = require('body-parser');
const Text = require('../../models/texts');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/' , async (req, res) => {
    /* 	#swagger.tags = ['Texts']
       #swagger.description = 'Endpoint to sign in a specific Text' */

    try {
        const texts = await Text.find().exec();
        res.json({ texts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/random', async (req, res) => {
    /* 	#swagger.tags = ['Texts']
   #swagger.description = 'Endpoint to sign in a specific Text' */

    try {
        const texts = await Text.aggregate([{ $sample: { size: 1 } }]);
        res.json({ texts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;
