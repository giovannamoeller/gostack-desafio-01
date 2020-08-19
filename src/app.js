const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json({ repositories: repositories });
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository);
  return response.status(200).json('Success at creating new repository');
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const findIndex = repositories.findIndex(repository => repository.id === id);
  if(findIndex < 0) return response.status(400).json('Error finding repository');
  const repository = {
    ...repositories[findIndex],
    title,
    url,
    techs
  }
  repositories[findIndex] = repository;
  return response.status(200).json('Success at updating repository');
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const findIndex = repositories.findIndex(repository => repository.id === id);
  if(findIndex < 0) return response.status(400).json('Error finding repository');

  repositories.splice(findIndex, 1);
  return response.status(200).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
