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
router.get('/show_topic/work/working',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con =mysql.createConnection(
        {
                host:"localhost",
                user:"root",
                password:"",
                database:"todolist"
        });
        
        let sql=`SELECT * FROM working  ORDER BY id`

        con.query(sql,function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/work/working',
            {
                name:req.session.username,
                working:results,
                users:results
            });
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.get('/show_topic/work/working/edit',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con =mysql.createConnection(
        {
                host:"localhost",
                user:"root",
                password:"",
                database:"todolist"
        });
        
        let id=req.query.id ||"";
        let sql=`SELECT * FROM working WHERE id=? ORDER BY id`

        con.query(sql,[id],function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/work/working_edit',
            {
                name:req.session.username,
                items:results[0]
            });
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});


router.post('/show_topic/work/working_edit',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con =mysql.createConnection(
        {
                host:"localhost",
                user:"root",
                password:"",
                database:"todolist"
        });
        
        let id=req.body.id||"";
        let Topic = req.body.topic || "";
        let Start = req.body.Start || "";
        let deadline = req.body.deadline || "";
        let content = req.body.content || "";

        let sql = `UPDATE working SET Topic=?, Start=?, deadline=?, content=? WHERE id=?`;

        con.query(sql,[Topic,Start,deadline,content,id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while updating your work."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully edited your work."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/work/working/delete',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con =mysql.createConnection(
        {
                host:"localhost",
                user:"root",
                password:"",
                database:"todolist"
        });
        
        let id=req.body.id||"";

        let sql = `DELETE FROM working WHERE id=?`;

        con.query(sql,[id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while delete your work."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully delete your work."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/work/working/success',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con =mysql.createConnection(
        {
                host:"localhost",
                user:"root",
                password:"",
                database:"todolist"
        });
        
        let id=req.body.id||"";
        let Topic=req.body.Topic||"";
        let Start=req.body.Start||"";
        let deadline=req.body.deadline||"";
        let content=req.body.content||"";


        let sql1 = `INSERT INTO success_work (Topic, Start, deadline, content) VALUES (?, ?, ?, ?)`;
        let sql2 = `DELETE FROM working WHERE id=?`;

        //เขียนแบบ protect sql injecttion
        con.query(sql1, [Topic, Start, deadline, content], (err, userResults, fields) => 
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while sending success your work."));
            } 
            else 
            {
                // ประมวลผลหลังจากคำสั่ง SQL ทำงานสำเร็จ
                con.query(sql2, [id], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send(showMessage("An error occurred while deleting your work."));
                    } else {
                        res.status(200).send(showMessage("Successfully deleted your work."));
                    }
                    con.end();
                });
            }
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/work/working/sucess_work/delete',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con =mysql.createConnection(
        {
                host:"localhost",
                user:"root",
                password:"",
                database:"todolist"
        });
        
        let id=req.body.id||"";

        let sql = `DELETE FROM success_work WHERE id=?`;

        con.query(sql,[id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while delete your target."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully delete your target."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

module.exports=router;