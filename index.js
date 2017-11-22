const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');



module.exports = function () {
    const port = 80;

    const app = express();
    
    
    app.use(bodyParser.json({ type: 'application/json' }))
    app.use(express.static(path.join(__dirname, './dist')));
    
    
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