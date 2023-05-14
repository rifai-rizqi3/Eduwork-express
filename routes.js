const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({
        status: 'Succesfully',
        message: 'Welcome to Express JS Tutorial'
    });
});

router.get('/product/:id', (req, res) => {
    res.send({
        id: req.params.id
    });
});

module.exports = router;