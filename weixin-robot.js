var port = process.env.port || 80;

var express = require('express');
var webot = require('weixin-robot');
var app = express();


// 指定回复消息
webot.set('hi', 'hi');

webot.set('subscribe', {
    pattern: function (info) {
        return info.is('event') && info.param.event === 'subscribe';
    },
    handler: function (info) {
        return '欢迎订阅微信机器人';
    }
});


// 你可以获取已定义的 rule
//
// webot.get('subscribe') ->
//
// {
//   name: 'subscribe',
//   pattern: function(info) {
//     return info.is('event') && info.param.event === 'subscribe';
//   },
//   handler: function(info) {
//     return '欢迎订阅微信机器人';
//   }
// }
//

// 接管消息请求
webot.watch(app, { token: 'CSHToolsTeam', path: '/' });

// 启动 Web 服务
// 微信后台只允许 80 端口
app.listen(port);


