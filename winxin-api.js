﻿
var port = process.env.port || 80;

var weixin = require('weixin-api');
var express = require('express');
var app = express();

// 接入验证
app.get('/', function (req, res) {

    // 签名成功
    if (weixin.checkSignature(req)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
});

// config 根据自己的实际配置填写
weixin.token = 'CSHToolsTeam';

// 监听文本消息
weixin.textMsg(function (msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = {};

    switch (msg.content) {
        case "你好":
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "你好 有什么可以帮您？",
                funcFlag: 0
            };
            break;

        case "我想取消我们微软云订阅":
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "可以，请问订阅号是？",
                funcFlag: 0
            };
            break;

        case "12345-12345-12345-12345":
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "好的，已经成功取消。退款以打入您的关联账户，请查收",
                funcFlag: 0
            };
            break;

        case "谢谢":
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "欢迎您再次使用我们的服务。",
                funcFlag: 0
            };
            break;

        case "文本":
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "这是文本回复",
                funcFlag: 0
            };
            break;

        case "音乐":
            // 返回音乐消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "music",
                title: "音乐标题",
                description: "音乐描述",
                musicUrl: "音乐url",
                HQMusicUrl: "高质量音乐url",
                funcFlag: 0
            };
            break;

        case "图文":

            var articles = [];
            articles[0] = {
                title: "PHP依赖管理工具Composer入门",
                description: "PHP依赖管理工具Composer入门",
                picUrl: "http://weizhifeng.net/images/tech/composer.png",
                url: "http://weizhifeng.net/manage-php-dependency-with-composer.html"
            };

            articles[1] = {
                title: "八月西湖",
                description: "八月西湖",
                picUrl: "http://weizhifeng.net/images/poem/bayuexihu.jpg",
                url: "http://weizhifeng.net/bayuexihu.html"
            };

            articles[2] = {
                title: "「翻译」Redis协议",
                description: "「翻译」Redis协议",
                picUrl: "http://weizhifeng.net/images/tech/redis.png",
                url: "http://weizhifeng.net/redis-protocol.html"
            };

            // 返回图文消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "news",
                articles: articles,
                funcFlag: 0
            }
    }

    weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function (msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function (msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function (msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function (msg) {
    console.log("eventMsg received");
    console.log(JSON.stringify(msg));
});

// Start
app.post('/', function (req, res) {

    // loop
    weixin.loop(req, res);

});

app.listen(port);

