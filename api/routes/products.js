const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../../models/product.models')

router.get('/', (req, res, next) => {
    Product.find()
        .limit(10)
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error
            });
        })

    // res.status(200).json({
    //     message: 'Handling GET method for products'
    // });
});

router.post('/', (req, res, next) => {
    const { name, price } = req.body;
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        price
    });
    product.save()
        .then(newProduct => {
            console.log(newProduct);
            res.status(201).json({
                message: 'Handling POST method for products',
                createdProduct: newProduct
            });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error })
        });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    Product.findById(id)
        .exec()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.patch('/:id', (req, res, next) => {
    const _id = req.params.id;
    Product.update({ _id }, { $set: { ...req.body } })
        .exec()
        .then(val => {
            res.json(val);
        })
        .catch(error => {
            res.status(200).json({
                error
            });
        })
});

router.delete('/:id', (req, res, next) => {
    const _id = req.params.id;
    Product.remove({ _id })
        .exec()
        .then(val => {
            res.json(val);
        })
        .catch(error => {
            res.status(200).json({
                error
            });
        })
});

module.exports = router;