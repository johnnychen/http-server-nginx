const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');

const cwd = process.cwd();



module.exports = function (port = 80, dist = './dist') {
    const app = express();

    app.use(bodyParser.json({ type: 'application/json' }))
    app.use(express.static(path.join(cwd, dist)));


    app.use(proxy(['**', '**/*.htm', '**/*.do', '**/*.json', '**/*.jsp'], {
        target: 'http://localhost:8001',
        changeOrigin: false
    }));

    app.listen(port, function (err, result) {
        if (err) {
            console.error(err);
        }
        console.log('Server running on port ' + port);
    });
}