// PACOTES
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const ejs = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// START
const app = express();

// AMBIENTE
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// ARQUIVOS ESTATICOS
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

// SETUP MONGODB
const dbs = require("./config/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// SETUP EJS - pacote de visualização
app.set("view engine", "ejs");

// CONFIGURACOES de segurança
if (!isProduction) {
    app.use(morgan("dev"));
}
app.use(cors());
app.disable("x-powered-by"); // campo do reader do express. desabilitado por segurança. tanto faz em dev
app.use(compression()); // deixa requisições mais leves

// limite de 1.5MB de cache
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }));

// MODELS
require("./models");

// ROTAS
app.use("/", require("./routes"));

// 404 - ROTA
app.use((req, res, next) => {
    const err = new Error("Not Found!!");
    err.status = 404;
    next(err)
});

// 422, 500, 401 - gerencia todas essas ROTAs
app.use((err, req, res, next) => {
    res.status(err.status || 500); // 500 é erro do servidor
    if (err.status !== 404) {
        console.warn("Error: ", err.message, new Date());
    }
    // res.json({ errors: { message: err.message, status: err.status } });
    res.json(err);
});

// ESCUTAR aplicação
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Rodando na //localhost:${PORT}`);
});