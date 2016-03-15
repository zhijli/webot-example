var http = require('http');
var xmlBodyParser = require('express-xml-parser');
var Wechat = require('nodejs-wechat');
var port = process.env.port || 1337;

var opt = {
    token: 'CSHToolsTeam',
    url: '/'
};
var parse = xmlBodyParser({
    type: 'text/xml'
});
var wechat = new Wechat(opt);
wechat.on('event.subscribe', function (session) {
    session.replyTextMessage('欢迎您关注我们的订阅号');
});

console.log('starting server...');
var server = http.createServer(function (req, res) {
    console.log('in server');
    req.query = require('url').parse(req.url, true).query;
    console.log("===req:===", req)
    if (req.method === 'GET') {

        wechat.verifyRequest(req, res);
    } else {
        parse(req, res, function (err) {
            if (err) {
                res.end();
                return;
            }
            req.query = require('url').parse(req.url, true).query;
            wechat.handleRequest(req, res);
        });
    }
});
server.listen(port);
console.log('Server is running at port', port);