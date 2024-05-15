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

router.get('/show_topic/healthy/table_weight',(req,res)=>
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

        let sql=`SELECT * FROM height_weight  ORDER BY id`

        con.query(sql,function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/healthy/table-weight',
            {
                name:req.session.username,
                users:results,
                weight:results
            });
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.get('/show_topic/healthy/table_weight/edit',(req,res)=>
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
        let sql=`SELECT * FROM height_weight WHERE id=? ORDER BY id`

        con.query(sql,[id],function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/healthy/table-weight-edit',
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


router.post('/show_topic/healthy/table_weight/edit',(req,res)=>
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
        let Day = req.body.Day || "";
        let weight = req.body.weight || "";
        let height= req.body.height || "";
        let date= req.body.date || "";

        let sql = `UPDATE height_weight SET Day=?, weight=?, height=?, date=? WHERE id=?`;

        con.query(sql,[Day,weight,height,date,id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while updating your weight."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully edited your weight."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/healthy/table_weight/delete',(req,res)=>
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

        let sql = `DELETE FROM height_weight WHERE id=?`;

        con.query(sql,[id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while delete your meal."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully delete your meal."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/healthy/table_weight/success', (req, res) => {
    if (req.session.username != undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        let id=req.body.id||"";
        let Day = req.body.Day || "";
        let weight = req.body.weight || "";
        let height= req.body.height || "";

        let sql1 = `INSERT INTO success_weight (Day,weight,height) VALUES (?, ?, ?)`;
        let sql2 = `DELETE FROM height_weight WHERE id = ?`; 

        // ทำงานแบบ transaction เพื่อทำการ INSERT และ DELETE ในรอบเดียว
        con.beginTransaction(function (err) 
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while processing your request."));
                return;
            }

            con.query(sql1, [Day, weight, height], (err, userResults, fields) => 
            {
                if (err) 
                {
                    console.error(err);
                    con.rollback(function () 
                    {
                        res.status(500).send(showMessage("An error occurred while saving your weight."));
                        con.end();
                    });
                } 
                else 
                {
                    
                    con.query(sql2, [id], (err, results, fields) => 
                    {
                        if (err) 
                        {
                            console.error(err);
                            con.rollback(function () 
                            {
                                res.status(500).send(showMessage("An error occurred while deleting your weight."));
                                con.end();
                            });
                        } 
                        else 
                        {
                            con.commit(function (err) 
                            {
                                if (err) 
                                {
                                    console.error(err);
                                    con.rollback(function () {
                                        res.status(500).send(showMessage("An error occurred while processing your request."));
                                        con.end();
                                    });
                                } 
                                else 
                                {
                                    res.status(200).send(showMessage("Successfully deleted and saved your weight."));
                                    con.end();
                                }
                            });
                        }
                    });
                }
            });
        });
    } else {
        res.redirect('login');
    }
});




module.exports=router;