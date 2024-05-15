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

//ใส่ /dashboard ตรงไฟล์ routes ไปแล้วเลยไม่ต้อง /dashboard/show_topic
router.get('/show_topic/money/table-money',(req,res)=>
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
        
        let sql=`SELECT * FROM money  ORDER BY id`

        con.query(sql,function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/money/table-money.ejs',
            {
                name:req.session.username,
                bath:results,
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

router.get('/show_topic/money/table-money-edit/edit',(req,res)=>
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
        let sql=`SELECT * FROM money WHERE id=? ORDER BY id`

        con.query(sql,[id],function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/money/table-money-edit',
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


router.post('/show_topic/money/money_edit',(req,res)=>
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
        let Day=req.body.Day||"";	
        let income=req.body.income||0;	
        let expenses=req.body.expenses||0;	
        let investment=req.body.investment||0;	
        let extrajob=req.body.extrajob||0;	
        let savings=req.body.savings||0;	
        let note=req.body.note||"";	
		

        let sql = `UPDATE money SET Day=?,income=?,expenses=?,investment=?,extrajob=?,savings=?,note=? WHERE id=?`;

        con.query(sql,[Day,income,expenses,investment,extrajob,savings,note,id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while updating your money."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully edited your money."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/money/money-bath/delete',(req,res)=>
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

        let sql = `DELETE FROM money WHERE id=?`;

        con.query(sql,[id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while delete your money."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully delete your money."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/money/money-bath/success',(req,res)=>
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
        let Day=req.body.Day||"";	
        let income=req.body.income||0;	
        let expenses=req.body.expenses||0;	
        let investment=req.body.investment||0;	
        let extrajob=req.body.extrajob||0;	
        let savings=req.body.savings||0;	
        let note=req.body.note||"";	

        let sql1 = `INSERT INTO success_money (Day,income,expenses,investment,extrajob,savings,note) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        let sql2 = `DELETE FROM money WHERE id=?`;

        //เขียนแบบ protect sql injecttion
        con.query(sql1, [Day,income,expenses,investment,extrajob,savings,note], (err, userResults, fields) => 
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while sending success your money."));
            } 
            else 
            {
                // ประมวลผลหลังจากคำสั่ง SQL ทำงานสำเร็จ
                con.query(sql2, [id], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send(showMessage("An error occurred while deleting your money."));
                    } else {
                        res.status(200).send(showMessage("Successfully deleted your money."));
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


module.exports=router;