import express from "express";
import { findAll, findById, save, update, remove } from "../services/usuariosService.js"

const usuariosRouter = express.Router();

usuariosRouter.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await findAll();
    return res.status(200).json(usuarios);
  } catch(error) {
    return res.status(500).json({msg: "Erro interno do servidor"});
  }
});

usuariosRouter.get("/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await findById(id);
    if(usuario) {
      return res.status(200).json(usuario);
    } else {
      return res.status(404).json({msg:"Produto não encontrado"});
    }
  } catch (error) {
    return res.status(500).json({msg: "Erro interno do servidor"});
  }
});

usuariosRouter.post("/usuarios", async(req, res) => {
  try {
    const usuario =req.body;
    await save(usuario);
    return res.status(201).json({msg: "Usuário cadastrado"});

  } catch (error) {
    return res.status(500).json({msg: "Erro interno do servidor"});
  }
});

usuariosRouter.put("/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = req.body;
    const flag = await update(id, usuario);
    if(flag) {
      return res.status(200).json({msg:"Usuario alterado com sucesso"})
    } else {
      return res.status(404).json({msg:"Usuário não encontrado"});
    }

  } catch (error) {
    return res.status(500).json({msg: "Erro interno do servidor"});
  }
});

usuariosRouter.delete("/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const flag = await remove(id);
    if(flag) {      
      return res.status(200).json({msg:"Usuário excluído"});
    } else {
      return res.status(404).json({msg:"Usuário não encontrado"})
    }
  } catch (error) {
    return res.status(500).json({msg: "Erro interno do servidor"});
  }
});

export default usuariosRouter;