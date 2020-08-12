const sqlite3 = require('sqlite3');
const fs = require('fs');
const appConfig = require('../../config.json').serverConfig;

const DBSOURCE = "./db/mtdb.db" 

let db = new sqlite3.Database( DBSOURCE, (err) => 
{
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
    else
    {
        db.exec('PRAGMA foreign_keys = ON;', function(error)  {
            if (error){
                console.error("Pragma statement didn't work.")
            } else {
                console.log("Foreign Key Enforcement is on.")
            }
        });

        // One time db creation
        let install_sql = fs.readFileSync('./db/installdb.sql').toString();
        db.exec(install_sql, (err) => 
        {
            if(!err)
            {
                console.log("DB Creato");
                insertDefaultCategories(db);
                insertDefaultInstruments(db);
            }
            
            console.log("DB ok");
        });
    }
});

function prepareSchedule()
{
    // Check today week and week+1
    // if not exist create week and week+1
    // get all items with enddate = null or >= today
    // 

}

function insertDefaultCategories(db)
{
    console.log('insertDefaultCategories');
    let defaultCategories = appConfig.defaultCategories;

    let placeholders = defaultCategories.map((category) => '(?)').join(',');                                    
    let sqlStr = 'INSERT INTO practiceCategory(categoryName) VALUES ' + placeholders;

    console.log(sqlStr);
    db.run(sqlStr, defaultCategories, (err) => {
        if (err) {
            console.error("insertDefaultCategories sqlStr: ",sqlStr);
            throw err;
        }
        console.log('Rows inserted');
        });
}

function insertDefaultInstruments(db)
{
    console.log('insertDefaultInstruments');
    let defaultInstruments = appConfig.defaultInstruments;

    let placeholders = defaultInstruments.map((instrument) => '(?)').join(',');                                    
    let sqlStr = 'INSERT INTO practiceInstrument(instrumentName) VALUES ' + placeholders;

    console.log(sqlStr);
    db.run(sqlStr, defaultInstruments, (err) => {
        if (err) {
            console.error("insertDefaultInstruments sqlStr: ",sqlStr);
            throw err;
        }
        console.log('Rows inserted');
        });
}

function resetDB()
{
    fs.unlinkSync(DBSOURCE);
}

module.exports = db;
