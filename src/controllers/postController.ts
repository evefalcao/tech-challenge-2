import { Request, Response } from "express";
import post from "../models/Post.js";

class PostController {

  static async listarPosts(req: Request, res: Response): Promise<void> {
    try {
      const listaPosts = await post.find({});
      res.status(200).json(listaPosts);
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
      } else {
        res.status(500).json({ message: "falha na requisição" });
      }
    }
  }

  static async listarPostPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const postEncontrado = await post.findById(id);
      res.status(200).json(postEncontrado);
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na requisição do post` });
      } else {
        res.status(500).json({ message: "falha na requisição do post" });
      }
    }
  }

  static async listarPostsPorPalavrasChave(req: Request, res: Response): Promise<void> {
    try {
      const palavrasChave = req.query.q as string || ""; // Provide a default value
      const posts = await post.find({
        $or: [{ titulo: new RegExp(palavrasChave, "i") }, { conteudo: new RegExp(palavrasChave, "i") }],
      });

      res.status(200).json(posts);
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na busca` });
      } else {
        res.status(500).json({ message: "falha na busca" });
      }
    }
  }

  static async cadastrarPost(req: Request, res: Response): Promise<void> {
    const novoPost = req.body;
    try {
      const postCompleto = { ...novoPost };
      const postCriado = await post.create(postCompleto);
      res.status(201).json({ message: "criado com sucesso!", post: postCriado });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha ao cadastrar post` });
      } else {
        res.status(500).json({ message: "falha ao cadastrar post" });
      }
    }
  }

  static async atualizarPost(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await post.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "post atualizado" });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na atualização` });
      } else {
        res.status(500).json({ message: "falha na atualização" });
      }
    }
  }

  static async excluirPost(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await post.findByIdAndDelete(id);
      res.status(200).json({ message: "post excluído com sucesso" });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na exclusão` });
      } else {
        res.status(500).json({ message: "falha na exclusão" });
      }
    }
  }
};

export default PostController;
