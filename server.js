'use strict';

var express = require('express');
var Weixin = require('weixin-apis');
var app = express();

// 配置参数
var weixin = new Weixin({
    app: app,
    appid: '你的appid（可选）',
    appsecret: '你的secret（可选）',
    token: 'CSHToolsTeam'
});

weixin.on('textMsg', function (data) {
    var msg = {
        toUserName: data.fromUserName,
        fromUserName: data.toUserName,
        msgType: 'text',
        content: data.content
    };
});

app.listen(80);