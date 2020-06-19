const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('welcome to my app')
});

module.exports = router;