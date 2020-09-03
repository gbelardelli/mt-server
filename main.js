const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const appConfig = require('./config.json');

//const db = require("./src/db/dbmgr");

const srvListenPort = appConfig.serverConfig.node_port;

const app = express();

// add headers for Cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'Gianluca73mt-serverVersion1.0', // just a long random string
  resave: false,
  saveUninitialized: true
}));

app.get('/', 
  function(req, res) 
  {
    req.sessionID
    res.json({running: true, version: '1.0', sessionID: req.sessionID, sessionID2: req.session.id});
  }
);

require('./src/routes/item.route')(app); // Imports routes for items
require('./src/routes/category.route')(app); // Imports routes for categories
require('./src/routes/instrument.route')(app); // Imports routes for instrument
//const practiceInstrument = require('./src/routes/instrument.route'); // Imports routes for instrument

app.listen( srvListenPort, () =>
  {
    console.log('mt-server started on http://localhost:'+srvListenPort);
  }
);
