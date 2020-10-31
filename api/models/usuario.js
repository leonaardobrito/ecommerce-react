const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "não pode ficar vazio."],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "não pode ficar vazio."],
        index: true,
        match: [/\S+@\S+\.\S+/, 'é inválido.']
    },
    permissao: {
        type: Array,
        default: ["cliente"]
    },
    hash: String,
    salt: String,
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {}
    }
}, { timestamps: true });

UsuarioSchema.plugin(uniqueValidator, { message: "já está sendo utilizado." });

// criar nova senha 
UsuarioSchema.methods.setSenha = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UsuarioSchema.methods.validarSenha = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512")..toString("hex");
    return hash === this.hash;
}