var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');


var id = 2;
var __projectRoot = __dirname + '/';

function ngApp(req, res) {
    res.sendFile(path.join(__projectRoot + '/dist/index.html'));
}

app.use(express.static(__projectRoot));

app.post('/api/login', function (req, res) {
    console.log('login');
    res.end('success');
});

//app.get('/*', function (req, res) {
//    console.log('u');
//    res.sendFile(path.join(__projectRoot + '/dist/index.html'));
//});
app.get('/', ngApp);
app.get('/home', ngApp);
app.get('/about', ngApp);

var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})