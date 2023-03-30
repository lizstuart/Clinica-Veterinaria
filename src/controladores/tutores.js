const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');


const adicionarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: senhaCriptografada
            })
            .returning('*')
        
        return res.status(201).json(novoUsuario)
        
    } catch (error) {
        return res.status(500).json('Erro interno do servidor!')
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json('Email e senha são obrigatórios')
    }

    try {
        const dadosUsuario = await knex("usuarios").where({ email }).first();

        if (dadosUsuario.rowCount < 1) {
            return res.status(404).json('Email ou senha inválidos')
        }

        const validarSenha = await bcrypt.compare(senha, dadosUsuario.senha)

        if (!validarSenha) {
            return res.status(400).json('Email ou senha inválidos')
        }

        const token = jwt.sign({ id: dadosUsuario.id }, senhaJwt, {
            expiresIn: '8h'
        });

        const { senha: _, ...loginDoUsuario } = dadosUsuario;

        return res.status(201).json({ dadosUsuario: loginDoUsuario, token });

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}

module.exports = {
    adicionarUsuario,
    login
}