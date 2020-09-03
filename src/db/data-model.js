const db = require("./dbmgr");

function getId(table, id, callback)
{
    let sql = `SELECT * FROM ${table} WHERE id=${id}`;
    let data = {};
    console.log("getId: ", sql);
    db.get(sql, [], (err, row) =>
    {
        if (err)
            throw err;

        callback(row);
    });
}

function readTable( table, callback )
{
    let sql = `SELECT * FROM ${table}`;
    let data = [];

    db.all(sql, [], (err, rows) =>
    {
        if (err)
            throw err;

        rows.forEach( (row) => 
        {
            data.push(row);
            /*data[row.id] = {};
            Object.keys(row).forEach(function(k)
            {
                data[row.id][k] = unescape(row[k]);
            });*/
        });
        callback(data);
    });
}

function getItems( callback )
{
    let sql = `SELECT a.id, b.categoryName, b.id as catid, c.instrumentName, c.id as instid, a.title, a.description, a.duration, a.durationDesc, a.goalDesc,
                    a.scheduleDesc, a.startDate, a.endDate, a.lastPractice, a.totalTime, a.archived 
                FROM items a, practiceCategory b, practiceInstrument c
                WHERE a.categoryID = b.id AND a.instrumentID = c.id`;
    let data = [];

    db.all(sql, [], (err, rows) =>
    {
        if (err)
            throw err;

        rows.forEach( (row) => 
        {
            data.push(row);
        });
        callback(data);
    });
}

function updateTable(table, id, values, callback)
{
    let sql = `UPDATE ${table} SET ${values} WHERE id=${id}`;
}
module.exports = {   
    readTable,
    updateTable,
    getItems,
    getId
}
