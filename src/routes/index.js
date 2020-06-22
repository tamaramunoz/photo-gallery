const { Router } = require('express');
const router = Router();

const fs = require('fs-extra');

const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', async(req, res) => {
    const photos = await Photo.find();
    res.render('images', {
        photos,
        helpers: {
            imageURL: function(){
                return this.imageURL
            }
        }
    });
});

router.get('/images/add', (req, res) => {
    res.render('image_form')
});

router.post('/images/add', async(req, res) => {
    const { title, description } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.send('Received');
});

module.exports = router;