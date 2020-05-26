const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const API = require('./server/api');
const WebsocketAPI = require('./server/websocket');

const api = new API();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())

app.get('/api', api.handleRequest);

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html')); // relative path
    });
}

const appServer = app.use(express.static( 'build' )).listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});

new WebsocketAPI(appServer);