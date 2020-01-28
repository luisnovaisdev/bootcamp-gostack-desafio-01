const express = require('express');

const server = express();

server.use(express.json());

function numberResquests(res, res, next) {

  console.count('Numero de requisições');

  return next();
}

server.use(numberResquests);

function checkIfProjectExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => {
    return project.id == id;
  })
  if (!project) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  return next();

}

let projects = [];

/** 
 * Get all projects route
*/
server.get('/projects', (req, res) => {
  return res.json(projects);
});

/**
 * Insert new project
 */
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };
  projects.push(project);
  return res.json(project);
})

/**
 * Edit project
 */
server.post('/projects/:id', checkIfProjectExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const project = projects.find(project => {
    return project.id == id;
  })

  project.title = title;
  return res.json(project);
})

/**
 * Delete project
 */
server.delete('/projects/:id', checkIfProjectExist, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => {
    return project.id == id;
  })

  projects.splice(projectIndex, 1);
  return res.json(projects);
})

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => {
    return project.id == id;
  })

  project.tasks.push(title);
  return res.json(project);
})

server.listen(3000);