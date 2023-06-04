const connection = require('../../config/mysql');
const path = require('path');
const fs = require('fs');


const index = (req, res) => {
    const {search} = req.query;
    let exec = {};
    if(search) {
        exec = {
            sql: 'SELECT * FROM products WHERE name LIKE ?',
            values: [`%${search}%`]
        }
    } else {
        exec = {
            sql: 'SELECT * FROM products',
        }
    }
    connection.query(exec, _response(res));
};

const view = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
};

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
};

const store = (req, res) => {
    const { users_id, name,  price, stock, status } = req.body;
    const avatar = req.file;
    if(avatar) {
        const target = path.join(__dirname, '../../uploads', avatar.originalname);
        fs.renameSync(avatar.path, target);
        connection.query({
            sql: 'INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            values: [parseInt(users_id), name, price, stock, status, avatar]
        }, _response(res));
    }
};

const update = (req, res) => {
    const { users_id, name,  price, stock, status } = req.body;
    const avatar = req.file;
    if(avatar) {
        let sql = '';
        let values = [];
        const target = path.join(__dirname, '../../uploads', avatar.originalname);
        fs.renameSync(avatar.path, target);
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
        values = [parseInt(users_id), name, price, stock, status, avatar, req.params.id]
    } else {
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?';
        values = [parseInt(users_id), name, price, stock, status, req.params.id]
    }
    connection.query({sql, values}, _response(res));
};

const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: error
            });
        } else {
            res.send({
                status: 'success',
                response: result
            });
        }
    }
};

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}