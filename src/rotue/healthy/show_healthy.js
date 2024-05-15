const router=require('express').Router();
let mysql=require('mysql');
const cookieSession = require('cookie-session');
router.use(cookieSession({
    name:'session',
    keys:['key1,key2'],
    maxAge:24*60*60*100
}));

function showMessage(msg)
{
    return `     
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard</title>
        <link href="/css2/bootstrap.css" rel="stylesheet">
        <script src="/js2/bootstrap.bundle.min.js"></script>
        <link href="/fontawesome/css/all.css" rel="stylesheet">
        <script src="fontawesome/js/all.js" crossorigin="anonymous"></script>
        <link href="/css/styles.css" rel="stylesheet">
        <link href="/css/styles2.css" rel="stylesheet">
        <script src="/js/bootstrap.bundle.min.js"></script>
        <script src="/js/scripts.js"></script>
        <style>
           
        </style>
    </head>

        <body>
        <h1>${msg}</h1>
        <button
            class="btn btn-success"
            style="background-color:rgb(20,150,250);" 
            onclick="history.back()">Back
        </button>
        </body>
        </html>
    `
}

//ใส่ /dashboard ตรงไฟล์ routes ไปแล้วเลยไม่ต้อง /dashboard/show_topic/working
router.get('/show_topic/healthy/all-healthy', (req, res) => 
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/show_topic/healthy/all-healthy', 
        {
            name: req.session.username
        });
    
    }
    else 
    {
        res.redirect('login');
    }
});

router.get('/success/healthy/topic-healthy',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        //render ไม่ต้องเติม / นะ
        res.render('dashboard/success/healthy/topic-healthy', 
        {
            name: req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

module.exports=router;