// Importa as dependências necessárias: Express para criar a aplicação web, Multer para lidar com uploads de arquivos e as funções de controle dos posts.
import express from "express";
import multer from "multer";
import cors from "cors";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsControllers.js";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos utilizando o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados (./uploads/)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest:"./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  // Utiliza o middleware do Multer para tratar o arquivo antes de chamar a função de upload
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
}

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;