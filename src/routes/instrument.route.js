const express = require('express');

const dataModel = require('../db/data-model');

module.exports = function(router)
{
    router.get( '/api/instruments/:id', (req, res) => 
    {
        dataModel.getId("practiceInstrument", req.params.id, (data) => {
            res.send(data);
        });
    });

    router.get( '/api/instruments/', (req, res) => 
    {
        dataModel.readTable( "practiceInstrument", (data) => {
            console.log("get: ", data);
            res.send(data);
        });
    });

    router.post('/api/instruments/', (req, res) => 
    {
        console.log("create instruments: ", req.body);
        dataModel.insertTable("instruments", req.body, (data) => {
            res.json(data);
        });
    });

    router.patch('/api/instruments/', (req, res) => 
    {
        dataModel.updateTable("instruments", req.params.id, null, (data) => {
            res.send(data);
        });
    });
    //router.delete('/api/items/',itemController.delete);
}

