const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET method for orders'
    });
})
router.post('/', (req, res, next) => {
    const { quantity, productId } = req.body;
    const order = {
        productId,
        quantity
    };
    res.status(201).json({
        message: 'Handling POST method for orders',
        order
    });
})
router.get('/:id', (req, res, next) => {
    const orderid = req.params.id;
    res.status(200).json({
        message: `Handling GET method for order: ${orderid}`
    });
})
router.delete('/:id', (req, res, next) => {
    const orderid = req.params.id;
    res.status(200).json({
        message: `Handling DELETE method for order: ${orderid}`
    });
})


module.exports = router;