const express = require('express');
const bodyParser = require('body-parser');
const Blog = require('../../models/blog');
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/' , authMiddleware ,async(req, res) => {
    /* #swagger.security = [{
"Bearer": []
}] */

    /* 	#swagger.tags = ['Blogs']
    #swagger.description = 'Endpoint to sign in a specific Test' */

    /*
     #swagger.consumes = ['application/x-www-form-urlencoded']
       #swagger.parameters['title'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
   #swagger.parameters['content'] = {
       in: 'formData',
       type: 'string',
       required: true,
   }
    #swagger.parameters['image'] = {
        in: 'formData',
        type: 'file',
        required: true,
        description: 'Some description...',
    }
    */

    const { title, content, image } = req.body;

    const newBlog = new Blog({ title, content, image });

    try {
        const Blog = await newBlog.save();
        res.json({ message: 'Kullanıcı başarıyla oluşturuldu', Blog });
    }catch (err) {
        res.status(500).json({error: err.message});
    }

});

router.get('/' , async (req, res) => {
    /* 	#swagger.tags = ['Blogs']
       #swagger.description = 'Endpoint to sign in a specific Test' */

    try {
        const blogs = await Blog.find().exec();
        res.json({ blogs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', authMiddleware , async (req, res) => {
    /* #swagger.security = [{
"Bearer": []
}] */
    /* 	#swagger.tags = ['Blogs']
    #swagger.description = 'Endpoint to sign in a specific Test' */
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id).exec();
        if (! blog) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.json({ blog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/Blogs/:id', authMiddleware , async(req, res) => {
    /* #swagger.security = [{
   "Bearer": []
}] */


    /* 	#swagger.tags = ['Blogs']
    #swagger.description = 'Endpoint to sign in a specific Blog' */

    /*

     #swagger.consumes = ['application/x-www-form-urlencoded']
   #swagger.parameters['title'] = {
    in: 'formData',
    type: 'string',
    required: false,
   }
   #swagger.parameters['content'] = {
    in: 'formData',
    type: 'string',
    required: false,
   }
  #swagger.parameters['image'] = {
        in: 'formData',
        type: 'file',
        required: true,
        description: 'Some description...',
    }
   */
    const { id } = req.params;


const {title, content, image} = req.body;

    try {
        const Blog = await Blog.findByIdAndUpdate(id, {title, content, image}, { new: true });

        if (!Blog) {
            return res.status(404).json({ message: 'Blog bulunamadı' });
        }

        res.json({ Blog });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.delete('/:id', authMiddleware , async(req, res) => {
    /* #swagger.security = [{
"Bearer": []
}] */
    /* 	#swagger.tags = ['Blogs']
    #swagger.description = 'Endpoint to sign in a specific Test' */

    const { id } = req.params;

    try {
        await Blog.findByIdAndDelete(id).exec();
        res.json({ message: 'Blog başarıyla silindi' });
    }catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;
