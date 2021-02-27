const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'santosh',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection sucessful.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users WHERE id= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});



//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req, res) => {
    let Emp = req.body;
  
    mysqlConnection.query("INSERT INTO `users` (`name`,`email`,`password`) VALUES (?,?,?)", [Emp.name, Emp.email,Emp.password],function (err,result){
        if (!err)
        res.send(result.affectedRows + "row inserted" );
    else
        console.log(err);
    });

    });


app.put('/employees/:id', (req, res) => {
    // let Emp = req.body;
    // console.log("fghfhgfhgfhgfjhfh");
    console.log(req.params);
  
    mysqlConnection.query("UPDATE  `users` SET `name`=?,`email`=?,`password`=? WHERE `id`=?", [req.body.name, req.body.email,req.body.paasword,req.params.id],function (err,result){
        if (!err)
        res.send(result.affectedRows + "row update" );
    else
        console.log(err);
    });

    });

