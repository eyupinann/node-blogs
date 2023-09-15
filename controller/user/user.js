const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/' , authMiddleware ,async(req, res) => {
    /* #swagger.security = [{
"Bearer": []
}] */

    /* 	#swagger.tags = ['Users']
    #swagger.description = 'Endpoint to sign in a specific Test' */

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

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ name, email, password : hashedPassword });

    try {
        const user = await newUser.save();
        res.json({ message: 'Kullanıcı başarıyla oluşturuldu', user });
    }catch (err) {
        res.status(500).json({error: err.message});
    }

});

router.get('/' , async (req, res) => {
    /* 	#swagger.tags = ['Users']
       #swagger.description = 'Endpoint to sign in a specific Test' */

    try {
        const users = await User.find({}).exec();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', authMiddleware , async (req, res) => {
    /* #swagger.security = [{
"Bearer": []
}] */
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'Endpoint to sign in a specific Test' */
    const { id } = req.params;

    try {
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/users/:id', authMiddleware , async(req, res) => {
    /* #swagger.security = [{
   "Bearer": []
}] */


    /* 	#swagger.tags = ['Users']
    #swagger.description = 'Endpoint to sign in a specific User' */

    /*

     #swagger.consumes = ['application/x-www-form-urlencoded']
   #swagger.parameters['name'] = {
    in: 'formData',
    type: 'string',
    required: false,
   }
   #swagger.parameters['email'] = {
    in: 'formData',
    type: 'string',
    required: false,
   }
   #swagger.parameters['password'] = {
    in: 'formData',
    type: 'string',
    required: false,
   }
   */
    const { id } = req.params;


    const { name, email, password } = req.body;

    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findByIdAndUpdate(id, { name, email, password : hashedPassword }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
            }

            res.json({ user });

        }

        if (!password) {
            const user = await User.findByIdAndUpdate(id, { name, email, password : hashedPassword }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
            }

            res.json({ user });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.delete('/:id', authMiddleware , async(req, res) => {
    /* #swagger.security = [{
"Bearer": []
}] */
    /* 	#swagger.tags = ['Users']
    #swagger.description = 'Endpoint to sign in a specific Test' */

    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id).exec();
        res.json({ message: 'Kullanıcı başarıyla silindi' });
    }catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;
