const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gallery_photos_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.err(err));