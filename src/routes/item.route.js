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
        dataModel.readTable("items", (data) => {
            res.send(data);
        });
    });

    //router.post('/api/items/', itemController.create);
    //router.patch('/api/items/', itemController.update);
    //router.delete('/api/items/',itemController.delete);
}

