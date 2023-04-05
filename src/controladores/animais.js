const knex = require("../conexao");

const adicionarAnimal = async (req, res) => {
  const { nome, especie, raça, gênero, idade } = req.body;
  const { id } = req.usuario;

  if (!nome || !especie || !idade) {
    return res.status(400).json("Todos os campos são obrigatórios");
  }

  try {
    const novoAnimal = await knex("animais")
      .insert({
        nome,
        especie,
        raça,
        gênero,
        idade,
        id_usuario: id,
      })
      .returning("*");

    return res.status(201).json(novoAnimal);
  } catch (error) {
    return res.status(500).json("Erro no servidor");
  }
};

const editarAnimal = async (req, res) => {
  const { nome, especie, raça, gênero, idade } = req.body;
  let { id } = req.params;
  id = Number(id);

  try {
    const animalEditado = await knex("animais")
      .update({ nome, especie, raça, gênero, idade })
      .where("id", id)
      .returning("*");

    return res.status(202).json({ animalEditado });
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const listarAnimais = async (req, res) => {
  try {
    const listaDeAnimais = await knex("animais").select("*").returning("*");

    return res.status(201).json(listaDeAnimais);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
};

const deletarAnimal = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await knex("animais")
      .delete()
      .where("id", id)
      .returning("id");

    if (rowCount < 1) {
      return res.status(404).json("Usuário não encontrado");
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  adicionarAnimal,
  editarAnimal,
  listarAnimais,
  deletarAnimal,
};
