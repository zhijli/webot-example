var http = require('http');
var xmlBodyParser = require('express-xml-parser');
var Wechat = require('nodejs-wechat');

var opt = {
    token: 'TOKEN',
    url: '/'
};
var parse = xmlBodyParser({
    type: 'text/xml'
});
var wechat = new Wechat(opt);
wechat.on('event.subscribe', function (session) {
    session.replyTextMessage('欢迎您关注我们的订阅号');
});
var server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        wechat.verifyRequest(req, res);
    } else {
        parse(req, res, function (err) {
            if (err) {
                res.end();
                return;
            }
            wechat.handleRequest(req, res);
        });
    }
});
server.listen(80);