//esta funcion crea un servidor express
import express from "express";
//import accountRouter from "./routes/account.js";
import {sendNotification, startNotificationListener} from "./listener.mjs";
import bodyParser from "body-parser";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const USERS_BD = require("./bd.cjs");

//Esto es para obtener el dirname
import path from "path";
import { fileURLToPath } from "url";
import { create } from "domain";
import { sensitiveHeaders } from "http2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//hasta aqui

const app = express();
const port = 3000;

//middleware para parsear a json el body
app.use(bodyParser.json());
//app.use("/account", accountRouter);

app.get('/account/:guid', (req, res) => {
    const user = USERS_BD.find(i => i.guid === req.params.guid);

    if (!user) return res.status(404).send();

    return res.send(user);
});

//POST

// app.post('/account', (req, res) => {
//     const {name, guid} = req.body;
//     const user = USERS_BD.find(i => i.guid === guid);

//     if (!name || !guid) return res.statusCode(400).send();
//     if (user) return res.status(409).send();

//     USERS_BD.push({
//         guid, name
//     });
//     return res.send();
// });

app.post('/account', (req, res) => {
    let data = req.body;
    sendNotification("hola mundo");
    res.send(`Datos recibidos ` + JSON.stringify(data));
});

//pacth

app.patch('/account/:guid', (req, res) => {
    const {name} = req.body;
    const user = USERS_BD.find(i => i.guid === req.params.guid);

    if (!name) return res.statusCode(400).send();
    if (!user) return res.statusCode(404).send();

    user.name = name;
    return res.send();
});

//delete

app.delete('/account/:guid', (req, res) => {
    const userIndex = USERS_BD.findIndex(i => i.guid === req.params.guid);

    if (userIndex === -1) return res.statusCode(404).send();

    USERS_BD.splice(userIndex, 1);

    return res.send();
});

// Pagina publica
// app.get("/publica", (req, res) => {
//     return res.send("Pagina publica");
// });

// //Autenticada
// app.post("/auth", (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) return res.sendStatus(400);
//     try {
//         const user = USERS_BD.find((user) => {
//             user.email === email;
//         });

//         if (!user) return res.sendStatus(401);

//         if (user.password !== password) return res.sendStatus(401);

//         return res.send(`Bienvenido ${user.name}`);
//     } catch (err) {
//         return res.sendStatus(401);
//     }
// });

startNotificationListener();

app.listen(port, () => {
    console.log("http//localhost:3000");
});
