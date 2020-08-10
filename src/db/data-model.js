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
    let data = {};

    db.all(sql, [], (err, rows) =>
    {
        if (err)
            throw err;

        rows.forEach( (row) => 
        {
            console.log(row);
            data[row.id] = {};
            Object.keys(row).forEach(function(k)
            {
                data[row.id][k] = unescape(row[k]);
            });
        });
        callback(data);
    });
}

module.exports = {   
    readTable,
    getId
}
