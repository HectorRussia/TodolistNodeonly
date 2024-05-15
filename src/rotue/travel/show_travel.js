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
router.get('/show_topic/travel/table-travel',(req,res)=>
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
        
        let sql=`SELECT * FROM travel  ORDER BY id`

        con.query(sql,function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/travel/table-travel',
            {
                name:req.session.username,
                travel:results,
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

router.get('/show_topic/travel/tabel-travel-edit/edit',(req,res)=>
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
        let sql=`SELECT * FROM travel WHERE id=? ORDER BY id`

        con.query(sql,[id],function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/show_topic/travel/tabel-travel-edit',
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


router.post('/show_topic/travel/travel_edit',(req,res)=>
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
        let name_place  =req.body.name_place||"";
        let start_tip	=req.body.start_tip||"";
        let end_tip	    =req.body.end_tip||"";
        let vehicles	=req.body.vehicles||"";
        let plan_tip	=req.body.plan_tip||"";
        let money_tip	=req.body.money_tip||"";

        let sql = `UPDATE travel SET name_place=?,start_tip=?,end_tip=?,vehicles=?,plan_tip=?,money_tip=? WHERE id=?`;

        con.query(sql,[name_place,start_tip,end_tip,vehicles,plan_tip,money_tip,id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while updating your travel."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully edited your travel."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/travel/traveling/delete',(req,res)=>
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

        let sql = `DELETE FROM travel WHERE id=?`;

        con.query(sql,[id],function(err,results,fields)
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while delete your personal."));
            } 
            else 
            {
                res.status(200).send(showMessage("Successfully delete your personal."));
            }
            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

router.post('/show_topic/travel/traveling/success',(req,res)=>
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
        let name_place  =req.body.name_place||"";
        let start_tip	=req.body.start_tip||"";
        let end_tip	    =req.body.end_tip||"";
        let vehicles	=req.body.vehicles||"";
        let plan_tip	=req.body.plan_tip||"";
        let money_tip	=req.body.money_tip||"";


        let sql1 = `INSERT INTO success_travel (name_place,start_tip,end_tip,vehicles,plan_tip,money_tip) VALUES (?, ?, ?, ?, ?, ?)`;
        let sql2 = `DELETE FROM travel WHERE id=?`;

        //เขียนแบบ protect sql injecttion
        con.query(sql1, [name_place,start_tip,end_tip,vehicles,plan_tip,money_tip], (err, userResults, fields) => 
        {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("An error occurred while sending success your travel."));
            } 
            else 
            {
                // ประมวลผลหลังจากคำสั่ง SQL ทำงานสำเร็จ
                con.query(sql2, [id], (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send(showMessage("An error occurred while deleting your travel."));
                    } else {
                        res.status(200).send(showMessage("Successfully deleted your travel."));
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