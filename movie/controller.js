/**
 * Controller von movie
 */
const model = require('./model');
const view = require('./view');
const form = require('./form');


function listAction(request, response) {
  const movies = model.getAll();
  const body = view.render(movies);
  response.send(body);
}

function deleteAction(request, response) {
  const id = parseInt(request.params.id, 10);
  model.deleteMovie(id);
  response.redirect(request.baseUrl);
}

function formAction(request, response) {
  let movie = { id: '', title: '', year: '' };

  if (request.params.id) {
    movie = model.get(parseInt(request.params.id, 10));
  }

  const body = form.render(movie);
  response.send(body);
}

function saveAction(request, response) {
  const movie = {
    id: request.body.id,
    title: request.body.title,
    year: request.body.year,
  };
  model.save(movie);
  response.redirect(request.baseUrl);
}

module.exports = {
  listAction, deleteAction, formAction, saveAction
}