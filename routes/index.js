var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
//ruta de comentarios
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
//estadisticas
var statisticsController = require('../controllers/statistics_controller');

router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res) {
  res.render('author', { errors: [] });
});


router.param('quizId', quizController.load); // autoload :quizId
router.param('commentId', commentController.load); // autoload :commentId

// Definición de sesion
router.get('/login', sessionController.new); // formulario de login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // cerrar sesión (debería ser delete /login)

// Definición de rutas
router.get('/quizes', 						          quizController.index);
router.get('/quizes/:quizId(\\d+)', 		    quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new',  	sessionController.loginRequired,	quizController.new);
router.post('/quizes/create', sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,  quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, 	quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

  // debería ser un PUT
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
sessionController.loginRequired,commentController.publish);

//  ruta para las estadísticas
router.get('/quizes/statistics', statisticsController.calculate, statisticsController.show);


module.exports = router;
