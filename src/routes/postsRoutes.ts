import express from "express";
import PostController from "@/controllers/postController";

const routes = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista de Posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 */
routes
  .get("/posts", PostController.listarPosts)
  .get("/posts/search", PostController.listarPostsPorPalavrasChave)
  .get("/posts/search/:q", PostController.listarPostsPorPalavrasChave)
  .get("/posts/:id", PostController.listarPostPorId)
  .post("/posts", PostController.cadastrarPost)
  .put("/posts/:id", PostController.atualizarPost)
  .delete("/posts/:id", PostController.excluirPost);

export default routes;
