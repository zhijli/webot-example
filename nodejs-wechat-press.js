
var port = process.env.port || 1337;

var express = require('express');
var app = express();
var middlewares = require('express-middlewares-js');
app.use('/', middlewares.xmlBodyParser({
    type: 'text/xml'
}));

/*
  Alternative way

var xmlBodyParser = require('express-xml-parser');
app.use('/weixin', xmlBodyParser({
  type: 'text/xml',
  limit: '1mb'
}));

*/
var Wechat = require('nodejs-wechat');
var opt = {
    token: 'CSHToolsTeam',
    url: '/'
};

var wechat = new Wechat(opt);

app.get('/', wechat.verifyRequest.bind(wechat));
app.post('/', wechat.handleRequest.bind(wechat));

// you can also work with other restful routes
app.use('/api', middlewares.bodyParser());

wechat.on('text', function (session) {
    session.replyTextMessage('Hello World');
});
wechat.on('image', function (session) {
    session.replyNewsMessage([{
        Title: '新鲜事',
        Description: '点击查看今天的新鲜事',
        PicUrl: 'http://..',
        Url: 'http://..'
    }]);
});
wechat.on('voice', function (session) {
    session.replyMessage({
        Title: 'This is Music',
        MsgType: 'music',
        Description: 'Listen to this music and guess ths singer',
        MusicUrl: 'http://..',
        HQMusicUrl: 'http://..',
        ThumbMediaId: '..'
    });
});

app.listen(port);