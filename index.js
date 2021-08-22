//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
var tasks = []
var surrogatekey = 1;

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

// Crear una nueva tarea
app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogatekey++;
    tasks.push(req.body);
    res.send("OK");
});

//listar
app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});


app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});


// bucar
app.get("/tasks/:taskId", (req, res, next) => {
    const id = req.params.taskId;
    const i = tasks.findIndex(x => x.id == id);
    res.json(tasks[i]);
});


//borrar
app.delete("/tasks/:taskId" , jsonParser, (req, res, next) => {
    const id = req.params.taskId;
    const i = tasks.findIndex(x => x.id == id );
    console.log(i)
    if (i>=0){
        tasks.splice(i,1);
        res.send("delete " + req.params.taskId);
    } else
        res.send("Not found")
    
    
});
