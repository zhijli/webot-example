var port = process.env.port || 80;

var express = require('express');
var webot = require('weixin-robot');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = express();

var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx1bde71691d38fc81', '97f46c1b33aeed3fccc9e3489c7270c3');
var kid = 'ouDO9vp8ArTJywdlRcE9ZHvfbU9I';

//QR 永久素材 media_id
var qr = '6ElOdcrVjaxV-vWQHI8vsWv9TXCO-0vyjLlinvaNIi8';
//上传临时素材
//api.uploadMedia('qr.jpg', 'image', function (err, result) {
//    qr = result.media_id;
//});

//上传永久素材
//api.uploadMaterial('qr.jpg', 'image', function (err, result) {
//    qr = result.media_id;
//});

//Skype = require('./scripts/SkypeBootstrap.js')
//var jsdom = require('jsdom');
//jsdom.defaultDocumentFeatures = {
//    FetchExternalResources   : ["script", "frame", "iframe", "link", "img"],
//    ProcessExternalResources : ["script", "frame", "iframe", "link", "img"],
//    MutationEvents           : '2.0',
//    QuerySelector            : false
//};

//var document = jsdom.jsdom();
//window = document.defaultView;

////window = require('jsdom').jsdom().defaultView;
//$ = jQuery = require('jQuery');



//require('./scripts/Ucwa/GeneralHelper.js');
//require('./scripts/Ucwa/MemoryStorage.js');
//require('./scripts/Ucwa/Cache.js');
//require('./scripts/Ucwa/Transport.js');
//require('./scripts/Ucwa/Events.js');
//require('./scripts/Ucwa/AutoDiscovery.js');
//require('./scripts/Ucwa/Authentication.js');
//require('./scripts/Ucwa/OperationResource.js');
//require('./scripts/Ucwa/Batch.js');
//require('./scripts/Ucwa/UcwaMain.js')
//require('./scripts/Ucwa/Site.js')
//site = new Site();
//site.setup();
//site.ucwa = new microsoft.rtc.ucwa.samples.Main();

//var body = $("body");
//body.html('<div class="frame" id="container"></div>')
//element = $("#container");
//console.log(body.html());

//var domain = 'metio.net';
//var token = "Bearer cwt=AAEBHAEFAAAAAAAFFQAAAKuuXmvzGAIi1fxkeXgGAACBEOk__ynkOG5QsauvPGWHtGaCAlT0gyC6D1wcwZ4JFdlcj5nMlY8kH0lscyIaHPykCt3FgFr9nIYIbjuXscVe0wgNEPafGCkKskFVn6NvOvBYlbY";
//splitToken = token.split(" ");
//var tokenType = splitToken[0];
//var accessToken = splitToken[1];
//site.ucwa.Transport.setAuthorization(accessToken, tokenType);

//site.ucwa.AutoDiscovery.startDiscovery(domain, element, handleAutoDiscovery);

//function handleAutoDiscovery(link) {
//     site.ucwa.Authentication.setCredentials("", "");
//    site.ucwa.Authentication.start(link, site.ucwa.createApplication(), handleResult);
//}

//function handleResult(isAuthenticated, data) {
//    if (isAuthenticated && data.statusText === "success") {
//	        console.log("login success!")
//    } else {
//        console.log("login failed!")
//    }
//}



//var batch = new microsoft.rtc.ucwa.samples.Batch(site.ucwa.Cache, site.ucwa.Transport);
//var opRes = new microsoft.rtc.ucwa.samples.OperationResource(site.ucwa.Transport, site.ucwa.Events);

//site.ucwa.Cache.read({
//    id: "main"
//}).done(function (cacheData) {
//    batch.queueRequest({
//        url: cacheData._embedded.people._links.myContacts.href,
//        type: "get",
//        callback: handleContacts
//    });

//    batch.queueRequest({
//        url: cacheData._embedded.me._links.self.href,
//        type: "get",
//        callback: function (data) {
//            selfName = data.results.name;
//        }
//    });

//    batch.processBatch();
//});

//function handleContacts(data) {
//    if (data && data.results && data.results._embedded && data.results._embedded.contact && !ucwa.GeneralHelper.isEmpty(data.results._embedded.contact)) {
//        var contacts = data.results._embedded.contact;

//        if ($.isArray(contacts)) {
//            for (var contact in contacts) {
//                handleContact(contacts[contact]);
//            }
//        } else {
//            handleContact(contacts);
//        }

//        batch.processBatch();
//    } else {
//        $("#outgoingContacts").parent().removeClass("controls");
//        $("#outgoingContacts").parent().html($("<p></p>").html("* Add contacts and reload to enable this task").addClass("errorText"));
//    }
//}

///* Copyright (C) Microsoft 2014. All rights reserved. */
//var domain = "https://www.example.com",
//    targetOrigin = "https://www.myDomain.com",
//    element = $("#frame")[0].contentWindow,
//    Transport = new microsoft.rtc.ucwa.samples.Transport(targetOrigin);

//Transport.setElement(element, domain);
//Transport.setAuthorization("cwt=AAEBHAEFAAAAAAAFFQAAACZfw6hMpZ-w7RAMgdAEAACBEPDttJWHCThQn95OJLXgmL2CAvrFgyAMij1C0fFgd9JBx2_VpSjC0fUJFOK02BUWty33xAQH34YIAieH80cSzwg", "Bearer");

//Transport.injectFrame(domain, element.parent(), function () {
//    alert("iframe has been loaded");
//});

//execfile = require('./execfile.js');
//execfile('./scripts/Ucwa/GeneralHelper.js', { window: window, jQuery: jQuery });


//execfile('./test.js', { window: window, jQuery: jQuery, GeneralHelper: window.GeneralHelper });
//Authentication = require('./scripts/Ucwa/Authentication.js');
//execfile('./scripts/Ucwa/Authentication.js', { window: window, jQuery: jQuery,GeneralHelper: window.GeneralHelper });


//performRequest('support.microsoft.com','/api/search/virtualagent', 'GET', 'update', function (data) {
//    items = data.content.webResults.items;

//    items.forEach(function (item) {
//        item.title = item.title.replace(/<[^>]+>/g, "");
//        item.description = item.description.replace(/<[^>]+>/g, "");
//        //A: item.type is conflict with the wechat-robot
//        item.type = undefined;
//    });

//    api.uploadNews(news, function () { 
//    });

//    //item = data.content.webResults.items[0]
//    //item.title = item.title.replace(/<[^>]+>/g, "");
//    //item.description = item.description.replace(/<[^>]+>/g, "");
//    ////A: item.type is conflict with the wechat-robot
//    //item.type = undefined;
//    return next(null, items);
//});

var querystring = require('querystring');
var https = require('https');

function performRequest(host, endpoint, method, data, success) {
    var dataString = JSON.stringify(data);
    var headers = {};
    
    if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
    }
    else {
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length
        };
    }
    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };
    
    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');
        
        var responseString = '';
        
        res.on('data', function (data) {
            responseString += data;
        });
        
        res.on('end', function () {
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });
    
    req.write(dataString);
    req.end();
}

// 指定回复消息
webot.set('sayHi', {
    pattern: /^hi\b|你好|您好/i,
    handler: function (info) {
        return '您好 有什么可以帮您？您可以尝试回复：查询账户余额，取消云订阅。';
    }
});

webot.set('who am I', {
    pattern: /who am I/i,
    handler: function (info) {
        return 'you are ' + info.raw.FromUserName;
    }
});

webot.set('send msg', {
    pattern: /send\s*([0-9a-zA-Z]*)\s*(.*)/i,
    handler: function (info) {
        api.sendText(info.param[1], info.param[2], function (err, data, res) {
           //no cb
        });
        
        return 'Message send to:' + info.param[1] + '\nMessage Content:' + info.param[2];
    }
});

webot.set('get follower', {
    pattern: /get follower/i,
    handler: function (info, next) {
        var users = {};
        api.getFollowers(function (err, result) {
            
            var str = result.count + "user(s):";
            openids = result.data.openid;
            api.batchGetUsers(openids, function (err, result) {
                result.user_info_list.forEach(function (entity) {
                    str = str + '\n' + 'openid:' + entity.openid + '  nickname:' + entity.nickname;
                });
                
                return next(null, str);
            });
        });
    }
});

webot.set('get qr', {
    pattern: /get QR/i,
    handler: function (info) {
        api.sendImage(info.raw.FromUserName, qr, function (err, data, res) {
           //no cb
        });
        
        info.noReply = true;
        return;
    }
});

//test case:
//  true:
//      查询余额
//      查询账户余额
//      查询账号余额
//      查询账户
//      查询账号
//      我想查询余额
//      查余额
//      查账户余额
//      查账户
//  
//  false:
//      查
//      查号

webot.set('query account info', {
    pattern: /查(询)?((账[户号])?余额)|(账[户号])|query account/i,
    handler: function (info) {
        return '没问题，请提供您的LiveId或OrgId';
    },
    replies: {
        '/([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+.[a-zA-Z0-9_]+)/i': function (info) {
            return '您的账号是：' + info.param[0] + '\n 您的余额是：100 RMB';
        },        
        '/.*/': function (info) {
            // 在 replies 的 handler 里可以获得等待回复的重试次数参数
            if (info.rewaitCount < 2) {
                info.rewait();
                return '您提供的账号不存在,或者格式不对。请提供正确的LiveId或者OrgId(e.g. TomSlick@MyCompany.com).';
            }
            return '您提供的账号不存在,或者格式不对。如需进一步帮助，请联系人工客服。';
        },
    }
});

webot.set('cancel sub', {
    pattern: /取消云订阅|cancel sub/i,
    handler: function (info) {
        return '可以，请提供您的订阅号？(e.g. 123-123-123)';
    },
    replies: {
        // \\d - need double slash in string 
        '/(\\d{3}-){2}\\d{3}/i': function (info) {
            return '好的，已经成功取消。退款已打入您的关联账户，请查收';
        },        
        '/.*/': function (info) {
            // 在 replies 的 handler 里可以获得等待回复的重试次数参数
            if (info.rewaitCount < 2) {
                info.rewait();
                return '您提供的订阅号格式不对。请提供正确的订阅号. (e.g. 123-123-123).';
            }
            return '您提供的订阅号格式不对，如需进一步帮助，请联系人工客服。';
        },
    }
});

webot.set('goodbye', {
    pattern: /thank you|good bye|谢谢|再见/i,
    handler: function (info) {
        return '欢迎您再次使用我们的服务';
    }
});

//webot.set('your name', {
//    pattern: /^(?:my name is|i am|我(?:的名字)?(?:是|叫)?)\s*(.*)$/i,
//    handler: function (info) {
//        return 'hi，' + info.param[1];
//    },
//});

webot.set('subscribe', {
    pattern: function (info) {
        return info.is('event') && info.param.event === 'subscribe';
    },
    handler: function (info) {
        return '欢迎关注小软客服机器人';
    }
});

webot.set('support.microsoft.com', {
    pattern: /(.*)/,
    handler: function (info, next) {
        //return "对不起，小冰理解不的意思。"
        data = {
            page: 1,
            query: info.param[1],
            withDialog: true
        };
        
        response = {};
        performRequest('support.microsoft.com','/api/search/virtualagent', 'GET', data, function (data) {
            items = data.content.webResults.items;
            
            items.forEach(function (item) {
                item.title = item.title.replace(/<[^>]+>/g, "");
                item.description = item.description.replace(/<[^>]+>/g, "");
                //A: item.type is conflict with the wechat-robot
                item.type = undefined;
            });
            
            //item = data.content.webResults.items[0]
            //item.title = item.title.replace(/<[^>]+>/g, "");
            //item.description = item.description.replace(/<[^>]+>/g, "");
            ////A: item.type is conflict with the wechat-robot
            //item.type = undefined;
            return next(null, items);
        });

    }
});


webot.watch(app, { token: 'CSHToolsTeam', path: '/' });

//app.use(function (res, rep,next) {
//    api.sendText(kid, info, function (err, data, res) {
//           //no cb
//    });
//    next();
//});

// 如果需要 session 支持，sessionStore 必须放在 watch 之后
app.use(cookieParser());
// 为了使用 waitRule 功能，需要增加 session 支持
app.use(session({
    secret: 'abced111',
    resave: true,
    saveUninitialized: true
}));

// 启动 Web 服务
// 微信后台只允许 80 端口
app.listen(port);
