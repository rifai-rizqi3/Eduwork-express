const { query } = require('express');

const router = require('express').Router();

router.get('/', (req, res) => {
    const {page, total} = req.query;
    res.send({
        status: 'Succesfully',
        message: 'Welcome to Express JS Tutorial',
        page,
        total
    });
});

router.get('/product/:id', (req, res) => {
    res.send({
        id: req.params.id
    });
});

router.get('/:category/:tag', (req, res) => {
    const {category, tag} = req.params
    res.send({
        category: category,
        tag: tag
    });
});

module.exports = router;