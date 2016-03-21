var port = process.env.port || 80;

var mp = require('wechat-mp')('CSHToolsTeam')
var app = require('express')()

app.use('/', mp.start())
app.post('/', function (req, res, next) {
    
    console.log(req.body)
    
    res.body = {
        msgType: 'text',
        content: 'Hi.'
    }
    
    // or rich media message
    res.body = {
        msgType: 'music',
        content: {
            title: 'A beautiful song',
            musicUrl: 'http://.....'
        },
    }
    
    next()
}, mp.end())

app.listen(port);

