const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");


const app = express();
const port = 3000;
var cors = require('cors')
app.use(cors())

const conn = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bicicentro"
});

app.get("/trabajadores",(req,res) => {
    let sql = "select * from trabajadores";
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;
        res.json({
            trabajadores: result
        });
    });

});
app.get("/trabajadores/:dni",(req,res) => {

    let id = req.params["dni"];

    let sql = "SELECT trabajadores.*, sedes.nombreSede FROM trabajadores JOIN sedes ON trabajadores.idsede = sedes.idsede WHERE trabajadores.dni = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/trabajadores/ventas/:dni",(req,res) => {

    let id = req.params["dni"];

    let sql = "SELECT ventas.fecha, inventario.nombre, inventario.numeroserie, marcas.nombre as marca FROM ventas JOIN trabajadores ON ventas.dniTrabajador = trabajadores.dni JOIN inventario ON ventas.id_inventario = inventario.idinventario JOIN marcas ON marcas.idmarca = inventario.idmarca WHERE trabajadores.dni = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/sedes",(req,res) => {
    let sql = "select * from sedes";
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;
        res.json({
            trabajadores: result
        });
    });

});

app.get("/sedes/trabajadores/:idsede",(req,res) => {

    let id = req.params["idsede"];

    let sql = "SELECT trabajadores.* FROM trabajadores JOIN sedes ON trabajadores.idsede = sedes.idsede WHERE sedes.idsede = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});




app.get("/home", (req,res) => {
    res.sendFile(path.join(__dirname ,"vista.html"));
});

app.get("/listatrabajadores", (req,res) => {
    res.sendFile(path.join(__dirname ,"listatrabajadores.html"));
});

app.listen(port,function(){
    console.log("Servidor desplegado correctamente");
});