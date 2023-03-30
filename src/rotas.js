const express = require('express');
const { adicionarAnimal, editarAnimal, deletarAnimal, listarAnimais} = require('./controladores/animais');
const { adicionarUsuario, login } = require('./controladores/tutores');
const verificarAutorizaçao = require('./intermediarios/validaçaoToken')

const rotas = express();

rotas.post('/adicionarTutor', adicionarUsuario);
rotas.post('/login', login);

rotas.use(verificarAutorizaçao);
rotas.post('/adicionarAnimal', adicionarAnimal);;
rotas.get('/listarAnimais', listarAnimais);
rotas.put('/:id', editarAnimal); 
rotas.delete('/:id', deletarAnimal);

module.exports = rotas;