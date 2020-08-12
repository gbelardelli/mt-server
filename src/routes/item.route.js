const express = require('express');

const dataModel = require('../db/data-model');

module.exports = function(router)
{
    router.get( '/api/items/:id', (req, res) => 
    {
        dataModel.getId("items", req.params.id, (data) => {
            res.send(data);
        });
    });

    router.get( '/api/items/', (req, res) => 
    {
        dataModel.getItems( (data) => {
            console.log("get: ", data);
            res.send(data);
        });
    });

    router.post('/api/items/', (req, res) => 
    {
        console.log("create item: ", req.body);
        dataModel.insertTable("items", req.body, (data) => {
            res.json(data);
        });
    });

    router.patch('/api/items/', (req, res) => 
    {
        dataModel.updateTable("items", req.params.id, null, (data) => {
            res.send(data);
        });
    });
    //router.delete('/api/items/',itemController.delete);
}

