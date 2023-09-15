const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('../../db');
const jwt = require('jsonwebtoken');
const { verifyToken, secretKey } = require('../../auth');
const crypto = require('crypto');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post('/login', async (req, res) => {

    /* 	#swagger.tags = ['Auth']
    #swagger.description = 'Endpoint to sign in a specific Auth' */

    /*
   #swagger.consumes = ['application/x-www-form-urlencoded']
   #swagger.parameters['email'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
   #swagger.parameters['password'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
   */
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Hatalı şifre' });
        }

        if (user) {
            const token = jwt.sign({ userId: user.id }, secretKey);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Kullanıcı girişi sırasında bir hata oluştu:', error);
        res.status(500).json({ error: 'An error occurred during user login' });
    }

});


router.post('/register', async (req, res) => {
    /* 	#swagger.tags = ['Auth']
   #swagger.description = 'Endpoint to sign in a specific Auth' */

    /*
   #swagger.consumes = ['application/x-www-form-urlencoded']
     #swagger.parameters['name'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
   #swagger.parameters['email'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
   #swagger.parameters['password'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
   */

    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser.id }, secretKey);

        res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


});

module.exports = router;
