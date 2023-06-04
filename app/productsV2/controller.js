const Product = require('./model');
const path = require('path');
const fs = require('fs');

const index = async (req, res) => {
    try {
        await Product.findAll()
        .then ((data) => {
            if(data.length > 0) {
                res.status(200).json({status: 'success', data})
            } else {
                res.status(200).json({
                    status: 'failed',
                    message: 'Tidak ada data'
                })
            }
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
};

const view = async (req, res) => {
    let param = req.params.id
    try {
        await Product.findOne()
        .then ((data) => {
            if(data.length > 0) {
                res.status(200).json({data})
            } else {
                res.status(200).json({
                    message: 'Tidak ada data'
                })
            }
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
};

const update = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', avatar.originalname);
        fs.renameSync(avatar.path, target);
        try {
            await Product.sync();
            const result = await Product.update({users_id, name, price, stock, status, image});
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    } else {
        try {
            await Product.sync();
            const result = await Product.update({users_id, name, price, stock, status});
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    }
}

const store = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', avatar.originalname);
        fs.renameSync(avatar.path, target);
        try {
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url});
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    } else {
        try {
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status});
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = {
    store,
    index,
    update,
    view
}