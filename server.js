const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/cadastrar', (req, res) => {
    const novoUsuario = req.body;
    const bancoDeDados = 'usuarios.json';
    let usuarios = [];

    if (fs.existsSync(bancoDeDados)) {
        usuarios = JSON.parse(fs.readFileSync(bancoDeDados, 'utf-8'));
    }

    if (usuarios.find(u => u.email === novoUsuario.email)) {
        return res.status(400).json({ mensagem: "Usuário já cadastrado!" });
    }

    usuarios.push(novoUsuario);
    fs.writeFileSync(bancoDeDados, JSON.stringify(usuarios, null, 2));
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const usuarios = JSON.parse(fs.readFileSync('usuarios.json', 'utf-8'));
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuarioEncontrado) {
        res.json({ mensagem: "Login bem-sucedido! Bem-vindo, " + email });
    } else {
        res.status(401).json({ mensagem: "Email ou senha incorretos!" });
    }
});

app.listen( () => console.log(`https://israelmarques1024-dotcom.github.io/projeto-login-capivara-tech`));