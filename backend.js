import express from "express";
const app = express();
app.use(express.json());
app.use(cors());
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import criptografar from "./modules/encrypt.js";
import connectDB from "./modules/connect.js";
import Filme from "./model/Filme.js";
import Usuario from "./model/Usuario.js";
import encrypt from "./modules/encrypt.js";

//Requisição GET no endereço http://localhost:3000/filmes
//Obtem a lista de filmes
app.get("/filmes", async (req, res) => {
    try {
        const filmes = await Filme.find();
        if (!filmes) {
            res.status(422).json({
                msg: "Nenhum filme encontrado!",
            });
        }
        res.status(200).json(filmes);
    } catch (error) {
        console.log("Erro na aplicação: " + error);
        res.status(500).json({
            msg: "Erro na aplicação!",
        });
    }
});
//POST em http://localhost:3000/filmes
app.post("/filmes", async (req, res) => {
    const { titulo, sinopse } = req.body;

    const filme = new Filme({
        titulo: titulo,
        sinopse: sinopse,
    });
    await filme.save();
    const filmes = await Filme.find();
    res.status(200).json(filmes);
});

app.post("/signup", async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!login) {
            return res.status(400).json({ msg: "O login é obrigatório" });
        }
        if (!password) {
            return res.status(400).json({ msg: "A senha é obrigatório" });
        }
        const passHash = await encrypt(password);
        const usuario = new Usuario({
            login,
            password: passHash,
        });

        const respMongo = await usuario.save();

        console.log(respMongo);
        res.status(201).json({ msg: "Usuário criado com sucesso!" }).end();
    } catch (error) {
        console.log("Erro ao cadastrar usuário: " + error);
        res.status(409).json({ msg: "Erro ao cadastrar usuário" }).end();
    }
});

app.listen(3000, () => {
    connectDB();
    console.log("🔥 Servidor rodando na porta 3000");
});
