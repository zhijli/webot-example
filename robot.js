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

webot.set('test', {
    pattern: /^test/i,
    handler: function (info, next) {
        console.log('Server running at http://127.0.0.1:1337/');
        next(null, 'roger that!')
    }
})

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
app.listen(80,"0.0.0.0");

// 如果你不想让 node 应用直接监听 80 端口
// 可以尝试用 nginx 或 apache 自己做一层 proxy
// app.listen(process.env.PORT);
// app.enable('trust proxy');