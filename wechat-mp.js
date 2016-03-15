var mp = require('wechat-mp')(process.env.WX_TOKEN)
var app = require('express')()

app.use('/wechat', mp.start())
app.post('/wechat', function (req, res, next) {

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