const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET method for products'
    });
})
router.post('/', (req, res, next) => {
    const { name, price } = req.body;
    const product = {
        name,
        price
    };
    res.status(201).json({
        message: 'Handling POST method for products',
        product
    });
});
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: `Handling GET method for product: ${req.params.id}`
    });
});
router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: `Handling PATCH method for product: ${req.params.id}`
    });
});
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: `Handling DELETE method for product: ${req.params.id}`
    });
});

module.exports = router;