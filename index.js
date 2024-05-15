const  express = require('express');
const app = express();
let mysql=require('mysql');
const crypto=require('crypto');
const cookieSession = require('cookie-session');

//buff password
const password_salt="hey yo what's up mam";

app.set("view engine","ejs");
app.set("views","views");

//middleware
app.use("/css",express.static(__dirname+"/css"));
app.use("/js",express.static(__dirname+"/js"));
app.use("/css2",express.static(__dirname+"/css2"));
app.use("/js2",express.static(__dirname+"/js2"));
app.use("/fontawesome",express.static(__dirname+"/fontawesome"));
app.use("/image_card",express.static(__dirname+"/image_card"));
app.use("/image_many",express.static(__dirname+"/image_many"));
app.use("/views/dashboard",express.static(__dirname+"/views/dashboard"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieSession({
    name:'session',
    keys:['key1,key2'],
    maxAge:24*60*60*100
}));

app.use(require('./src/rotue/routes'));

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

app.get("/",(req,res)=>
{
    res.render("login");
});

app.get("/login",(req,res)=>
{
    let password_wrong=req.query.password||"";
    if(password_wrong=="wrong")
    {
        password_wrong=true;
    }
    else
    {
        password_wrong=false;
    }
    res.render("login",{password_wrong:password_wrong});
});

app.post("/login",(req,res)=>
{
    let user=req.body.email||""; //ต้องตรงกับ name="email" ใน login.ejs นะ
    let password=req.body.password||""; //ต้องตรงกับ name="password" ใน login.ejs นะ
   

    let con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",                                                                                               
            database: "todolist"
        });

        const hash = crypto.createHash('sha256').update(password+password_salt).digest('base64');
        
        let sqlcheackemail=`SELECT * FROM users WHERE email=? AND password=?`
        //password ในคำสั่งsql ต้องตรงกับใน database
      
        
        con.query(sqlcheackemail,[user,hash], function (err,results,fields) 
        {
            console.log(results);
         
            if (err) throw err;
            if(results.length>0)
            {
                //name  ต้องตรงกับในdatabaseนะ
                // req.session จะจำไว้ที่server ไม่ได้ส่งไปหา client
                req.session.username=results[0].name;
                req.session.email=results[0].email;
                res.redirect("/dashboard");
            }
            else
            {
                res.redirect("/login?password=wrong");
            }
            con.end(); 
        });
       
});


app.get("/logout",(req,res)=>
{
    //deleteseesion
    req.session=null;
    res.redirect("/");
    
});

app.get("/registor",(req,res)=>
{
    res.render("registor");
});

app.post("/registor",(req,res)=>
{
    let con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });
       
        let name=req.body.name || "";
        let email=req.body.email || ""; // name="email" must match with registor.ejs
        let password=req.body.password || "";
        let phone=req.body.phone || "";

        //เช็คว่ามีอีเมลซ้ำในระบบมั้ย
        let sqlcheackemail=`SELECT count(*) AS count FROM users WHERE email=?`

        con.query(sqlcheackemail,[email], function (err, results,fields)
        {
            if (err)
            {
                console.error(err);
                throw err;
            } 

            if(results[0].count>0)
            {
                res.status(200).send(showMessage("This email has already"));
                return; //จบการทำงาน
            }
            
            let emailForm = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

            //การใช้เมธอด test() ของ Regular Expression
            //เพื่อตรวจสอบว่าค่า newEmail ที่รับเข้ามามีรูปแบบของอีเมลที่ถูกต้องหรือไม่ ถ้ารูปแบบอีเมลถูกต้อง 
            //ฟังก์ชัน test() จะส่งค่า true กลับมา มิฉะนั้นจะส่งค่า false กลับมา 
            if (emailForm.test(email)) 
            {
                if(password.length>5)
                {
                    let sql=`INSERT INTO users (name,email,password,phone) VALUES(?,?,?,?) `;

                    const hash = crypto.createHash('sha256').update(password+password_salt).digest('base64');
                    /* ในทางเทคนิค Base64 คือการแปลงข้อมูล (binary data) ให้อยู่ในรูปของข้อความที่มีเพียงอักขระตัวอักษรภายใน ASCII 
                    ตั้งแต่ 0-63 ตัวอักษร และใช้ตัวอักษรสามตัวในการแทนตำแหน่งของข้อมูล 6 บิตเลขที่ถูกแปลงมา เพื่อให้ง่ายต่อการอ่านและรับค่า*/
                    console.log(hash);
                    con.query(sql,[name,email,hash,phone], function (err, results,fields) 
                    {
        
                        if (err) throw err;
                        res.status(201).send(showMessage("Registor Successfull Let's go login"));
                        con.end();    
                    });   
                }
                else 
                {
                    res.status(400).send(showMessage("Your password must be more than 5 characters."));
                    return
                }
      
            } 
            else 
            {
                res.status(400).send(showMessage("Invalid email format."));
                return
            }
        });
});

app.get('/dashboard',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/index',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.get('/dashboard/user',(req,res)=>
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
        
        let email=req.session.email ||"";
        let sql=`SELECT * FROM users WHERE email=? ORDER BY id`

        con.query(sql,[email],function(err,results,fields)
        {
            if(err) throw err;
            res.render('dashboard/list/user',
            {
                name:req.session.username,
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

app.post('/dashboard/user/edit', (req, res) => {
    if (req.session.username !== undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        //แก้ไขข้อมูล 
        let id = req.body.id || "";
        let newName = req.body.name || "";
        let newEmail = req.body.email || "";
        let newPhone = req.body.phone || "";

        let emailForm = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        //การใช้เมธอด test() ของ Regular Expression
        //เพื่อตรวจสอบว่าค่า newEmail ที่รับเข้ามามีรูปแบบของอีเมลที่ถูกต้องหรือไม่ ถ้ารูปแบบอีเมลถูกต้อง 
        //ฟังก์ชัน test() จะส่งค่า true กลับมา มิฉะนั้นจะส่งค่า false กลับมา 
        if (emailForm.test(newEmail)) 
        {
            let sql = `UPDATE users SET name=?, email=?, phone=? WHERE id=?`;
            con.query(sql, [newName, newEmail, newPhone,id], function (err, results, fields) {
                if (err) 
                {
                    console.error(err);
                    res.status(500).send(showMessage("An error occurred while updating your profile."));
                } 
                else 
                {
                    res.status(200).send(showMessage("Successfully edited your profile."));
                }
                con.end();
            });
        } 
        else 
        {
            res.status(400).send(showMessage("Invalid email format."));
            con.end();
        }
    } else {
        res.redirect('/login');
    }
});


app.get('/dashboard/working', (req, res) => {
    
    if (req.session.username !== undefined) 
    {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        let email = req.session.email || "";
        let sql1 = `SELECT * FROM users WHERE email=? ORDER BY id`;
        let sql2 = `SELECT * FROM working ORDER BY id`;
        

        con.query(sql1,[email], (err, userResults, fields) => 
        {
            if (err) throw err;

            con.query(sql2,(err, workResults, fields) => 
            {
                if (err) throw err;

                res.render('dashboard/list/working', {
                    
                    name:req.session.username,
                    users:userResults,
                    work: workResults

                   
                });

                con.end();
            });
        });
    } else {
        res.redirect('login');
    }
});


app.post('/dashboard/working/edit', (req, res) => {
    if (req.session.username !== undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        //let id = req.body.id || "";
        let newtopic = req.body.Topic || "";
        let newstart = req.body.Start || "";
        let newdeadline = req.body.deadline || "";
        let newcontent = req.body.content || "";

        let sql = `INSERT INTO working (Topic, Start, deadline, content) VALUES (?, ?, ?, ?)`;

        con.query(sql, [newtopic, newstart, newdeadline, newcontent], function (err, results, fields) {
            if (err) {
                console.error(err);
                res.status(500).send(showMessage("can't save your work"));
            } else {
                res.status(200).send(showMessage("save your work success!!"));
            }

            con.end();
        });
    } else {
        res.redirect('/login');
    }
});


app.get('/dashboard/healthy',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/list/healthy',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

//healthy_all
app.get('/dashboard/healthy/food',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/healthy/food',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.post('/dashboard/healthy/edit/food',(req,res)=>
{
    if (req.session.username !== undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        //let id = req.body.id || "";
        let Day = req.body.Day || "";
        let morning = req.body.morning || "";
        let noon = req.body.noon || "";
        let evening = req.body.evening || "";
        let total_kcal = req.body.total_kcal || "";

        let sql = `INSERT INTO food_health (Day,morning,noon,evening,total_kcal) VALUES (?, ?, ?, ?,?)`;

        con.query(sql, [Day,morning ,noon ,evening,total_kcal ], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your meal"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your meal has been saved successfully!"));
            }

            con.end();
        });
    } 
    else
    {
        res.redirect('/login');
    }
});

app.get('/dashboard/healthy/exercise',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/healthy/exercise',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.post('/dashboard/healthy/edit/exercise',(req,res)=>
{
    if (req.session.username !== undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        //let id = req.body.id || "";
        let Day = req.body.Day || "";
        let name = req.body.name || "";
        let number_time = req.body.number_time || "";
        let number_set = req.body.number_set || "";
        let start = req.body.start || "";
        let finish = req.body.finish || "";

        let sql = `INSERT INTO exercise (Day,name,number_time,number_set,start,finish) VALUES (?, ?, ?, ?,?,?)`;

        con.query(sql, [Day,name ,number_time ,number_set,start,finish], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your table exercise"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your table exercise has been saved successfully!"));
            }

            con.end();
        });
    } 
    else
    {
        res.redirect('/login');
    }
});


app.get('/dashboard/healthy/Weight_Height',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/healthy/wehi',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.post('/dashboard/healthy/edit/Weight_Height',(req,res)=>
{
    if (req.session.username !== undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        //let id = req.body.id || "";
        let Day = req.body.Day || "";
        let weight = req.body.weight || "";
        let height = req.body.height || "";

        let sql = `INSERT INTO height_weight (Day,weight,height) VALUES (?, ?, ?)`;
        //console.log(sql);
        con.query(sql, [Day,weight,height], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your weight and height"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your weight and height has been saved successfully!"));
            }

            con.end();
        });
    } 
    else
    {
        res.redirect('/login');
    }
});

app.get('/dashboard/healthy/BMI',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/healthy/BMI',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.post('/dashboard/healthy/save/BMI',(req,res)=>
{
    if (req.session.username !== undefined) {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });

        //let id = req.body.id || "";
        let weight = req.body.weight || "";
        let height = req.body.height || "";
        let bmi=req.body.bmi||"";

        let sql = `INSERT INTO show_bmi (weight,height,bmi) VALUES (?, ?, ?)`;
        //console.log(sql);
        con.query(sql, [weight,height,bmi], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your weight and height and BMI"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your BMI and weight and height has been saved successfully!"));
            }

            con.end();
        });
    } 
    else
    {
        res.redirect('/login');
    }
});


//


app.get('/dashboard/travel',(req,res)=>
{
    if (req.session.username !== undefined) 
    {
        res.render('dashboard/list/travel',
        {
            name:req.session.username
        });
    } 
    else
    {
        res.redirect('/login');
    }
});

app.post('/dashboard/save/travel',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });
           let name_place=req.body.place || "";
           let start_tip=req.body.start || "";	
           let end_tip	=req.body.end || "";
           let vehicles	=req.body.car || "";
           let plan_tip	=req.body.plan || "";
           let money_tip=req.body.money || "";

        let sql = `INSERT INTO travel (name_place,start_tip,end_tip,vehicles,plan_tip,money_tip) VALUES (?,?,?,?,?,?)`;
        
        con.query(sql, [name_place,start_tip,end_tip,vehicles,plan_tip,money_tip], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your plan travel"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your plan travel has been saved successfully!"));
            }

            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});


app.get('/dashboard/personnal',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/list/personnal',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.post('/dashboard/save/personnal',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });
           let goals=req.body.goals || "";
           let book=req.body.book || "";	
           let positive	=req.body.positive || "";
           let dreams	=req.body.dreams || "";


        let sql = `INSERT INTO personal_g (goals,namebook,positive,dreams) VALUES (?,?,?,?)`;
        
        con.query(sql, [goals,book,positive,dreams], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your plan for self-development"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your plan for self-development has been saved successfully!"));
            }

            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.get('/dashboard/money',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        res.render('dashboard/list/money',
        {
            name:req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});

app.post('/dashboard/save/money',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "todolist"
        });
        
        let  Day	=req.body.Date || "";
        let  income	=req.body.income || 0;
        let  expenses	=req.body.expenses || 0;
        let  investment	=req.body.investment || 0;
        let  extrajob	=req.body.extrajob || 0;
        let  savings	=req.body.savings || 0;
        let  note=req.body.note || "";


        let sql = `INSERT INTO money (Day,income,expenses,investment,extrajob,savings,note) VALUES (?,?,?,?,?,?,?)`;
        
        con.query(sql, [Day,income,expenses,investment,extrajob,savings,note], function (err, results, fields) {
            if (err) 
            {
                console.error(err);
                res.status(500).send(showMessage("Cannot save your budget"));
            } 
            else 
            {
                res.status(200).send(showMessage("Your plan budget has been saved successfully!"));
            }

            con.end();
        });
    }
    else
    {
        res.redirect('login');
    }
});

//แต่ route ต้องเติม / เสมอ
app.get('/dashboard/success/show-topic',(req,res)=>
{
    if(req.session.username !=undefined)
    {
        //render ไม่ต้องเติม / นะ
        res.render('dashboard/success/topic-sucess', 
        {
            name: req.session.username
        });
    }
    else
    {
        res.redirect('login');
    }
});



const port = 6060;
app.listen(port, () => console.log(` Server running..... port is ${port}`));