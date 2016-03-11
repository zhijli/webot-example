var mp = require('wechat-mp')("CSHToolsTeam")
var app = require('express')()

app.use('/wechat', mp.start())
app.post('/wechat', function (req, res, next) {

    console.log(req.body)

    res.body = {
        msgType: 'text',
        content: 'Hi.'
    }

    next()
}, mp.end())