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

router.get('/show_topic/healthy/table_bmi',(req,res)=>
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

        let sql=`SELECT * FROM show_bmi  ORDER BY id`

        con.query(sql,function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/healthy/table-BMI',
            {
                name:req.session.username,
                users:results,
                bodymassindex:results
            });
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.get('/show_topic/healthy/table_bmi/edit',(req,res)=>
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
        let sql=`SELECT * FROM show_bmi WHERE id=? ORDER BY id`

        con.query(sql,[id],function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/healthy/table-bmi-edit',
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


router.post('/show_topic/healthy/table_bmi/edit',(req,res)=>
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
        let weight = req.body.weight || "";
        let height= req.body.height || "";
        let bmi = req.body.bmi || "";

        let sql = `UPDATE show_bmi SET  weight=?, height=?, bmi=? WHERE id=?`;

        con.query(sql,[weight,height,bmi,id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while updating your bmi."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully edited your bmi."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/healthy/table_bmi/delete',(req,res)=>
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

        let sql = `DELETE FROM show_bmi WHERE id=?`;

        con.query(sql,[id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while delete your bmi."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully delete your bmi."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/healthy/table_bmi/success', (req, res) => {
    if (req.session.username != undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        let id=req.body.id||"";
        let weight = req.body.weight || "";
        let height= req.body.height || "";
        let bmi = req.body.bmi || "";

        let sql1 = `INSERT INTO success_bmi (weight,height,bmi) VALUES (?, ?, ?)`;
        let sql2 = `DELETE FROM show_bmi WHERE id = ?`; 

        // ทำงานแบบ transaction เพื่อทำการ INSERT และ DELETE ในรอบเดียว
        con.beginTransaction(function (err) 
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while processing your request."));
                return;
            }

            con.query(sql1, [weight,height,bmi], (err, userResults, fields) => 
            {
                if (err) 
                {
                    console.error(err);
                    con.rollback(function () 
                    {
                        res.status(500).send(showMessage("An error occurred while saving your bmi."));
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
                                res.status(500).send(showMessage("An error occurred while deleting your bmi."));
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
                                    res.status(200).send(showMessage("Successfully deleted and saved your bmi."));
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