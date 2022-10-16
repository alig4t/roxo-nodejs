const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let ip = req.ip;
    let log = now + ' : ' + ip + ' - ' + req.url + ' - ' + req.method + "\n";
    fs.appendFileSync('log.txt',log);
    next();
})

app.use((req,res,next)=>{
    res.render('404.hbs');
})


app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getDay', () => {
    let dayInteger = new Date().getDay();
    let dayStr = '';
    switch (dayInteger) {
        case 1:
            dayStr = 'دوشنبه';
            break;
        case 2:
            dayStr = 'سه شنبه';
            break;
        case 3:
            dayStr = 'چهار شنبه';
            break;
        case 4:
            dayStr = 'پنج شنبه';
            break;
        case 5:
            dayStr = 'جمعه';
            break;
        case 6:
            dayStr = 'شنبه';
            break;
        case 7:
            dayStr = 'یکشنبه';
            break;
    }
    return dayStr;
})

hbs.registerHelper('upperCase', (txt) => {
    return txt.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send("<h1>Hello EXPRESS</h1>")
    res.render('index.hbs', {
        title: "صفحه اصلی سایت",
        msg: "به سایت ما خیلی خوش آمدید",
        admin: "ali qasemi",
        year: new Date().getFullYear()
    })
    // res.send({ "Ali":"Ali", "sara":"sara", "reza":"reaz"})
})

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        title: "درباره ما",
        admin: "ali qasemi",
        year: new Date().getFullYear()
    })
})
app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to fetch data"
    })
})
app.listen(3000);
