const express = require('express');
const dataModel = require('../db/data-model');

module.exports = function(router)
{
    router.get( '/api/categories/:id', (req, res) => 
    {
        dataModel.getId("practiceCategory", req.params.id, (data) => {
            res.send(data);
        });
    });

    router.get( '/api/categories/', (req, res) => 
    {
        dataModel.readTable("practiceCategory", (data) => {
            res.send(data);
        });
    });

    //router.post('/api/categories/', itemController.create);
    //router.patch('/api/categories/', itemController.update);
    //router.delete('/api/categories/',itemController.delete);
}
