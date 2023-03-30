const jwt = require('jsonwebtoken');
const knex = require('../conexao');
const senhaJwt = require('../senhaJwt');

const verificarAutorizaçao = async (req, res, next) => {
    const { authorization } = req.headers;
   
    if (!authorization) {
        return res.status(401).json('Não autorizado!');
    }

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, senhaJwt)
        
        const dado = await knex('usuarios').where({ id }).returning('*');
        
        if (dado.lenght < 1) {
            return res.status(401).json('Usuário não encontrado' );
        }
        
        req.usuario = dado[0]
        
        next()
    } catch (error) {
        return res.status(401).json('Não autorizado!');
     
    }
};

module.exports = verificarAutorizaçao;
