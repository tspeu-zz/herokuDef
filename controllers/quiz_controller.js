var models = require('../models/models.js');
var helpers = require('./helpers.js');

var temasAceptados = models.Subject.temasAceptados;

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
  models.Quiz
.findById(Number(quizId))
  .then(function (quiz) {
    if (quiz) {
      req.quiz = quiz;
      next();
    } else {
      next(new Error('No existe quizId=' + quizId));
    }
  })
  .catch(function(error) { next(error); });
};

// GET /quizes
exports.index = function (req, res) {
  
  models.Quiz.findAll({
          where: ["lower(pregunta) like ?", helpers.sanitize(req.query.search).toLowerCase()],
          order: ["pregunta"] 
          })
  .then(function (quizes) {
    res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
  })
  .catch(function (error) { next(error); });
};

// GET /quizes/:quizId
exports.show = function (req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:quizId/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {
              quiz: (resultado === 'Correcto')?null:req.quiz,
              respuesta: resultado,
              errors: []
            });
};

// GET /quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build(
    { pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro" }
  );

  res.render('quizes/new', { quiz: quiz, errors: [], temas: temasAceptados });
};

// POST /quizes/create
exports.create= function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  quiz
  .validate()
  .then(function (err) {
    if (err) {
      res.render('quizes/new', { quiz: quiz, errors: err.errors, temas: temasAceptados });
    } else {
      // guarda en la BD los campos de quiz
      quiz
      .save({ fields: ["pregunta", "respuesta", "tema"] })
      .then(function () {
        res.redirect('/quizes'); // redirección HTTP a la lista de preguntas
      });
    }
  })
  .catch(function(error) { next(error); });

  
};

// GET /quizes/:quizId/edit
exports.edit = function (req, res) {
  var quiz = req.quiz; // aquí lo guarda Autoload
  res.render('quizes/edit', { quiz: quiz, errors: [], temas: temasAceptados });
};

// PUT /quizes/:quizId
exports.update = function (req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors, temas: temasAceptados});
      } else {
        
        req.quiz
        .save({ fields: ["pregunta", "respuesta", "tema"] })
        .then(function() { res.redirect('/quizes');});
      }     
    }
  )
  .catch(function(error) { next(error); });

  
};

// DELETE /quizes/:quizId
exports.destroy = function (req, res) {
  req.quiz
  .destroy()
  .then(function () {
    res.redirect('/quizes');
  })
  .catch(function (error) { next(error); });
};
