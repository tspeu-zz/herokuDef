var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
//ruta de comentarios
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res) {
  res.render('author', { errors: [] });
});




router.param('quizId', quizController.load); // autoload :quizId
// Definición de sesion
router.get('/login', sessionController.new); // formulario de login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // cerrar sesión (debería ser delete /login)

// Definición de rutas
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new',  					quizController.new);
router.post('/quizes/create',  				quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  	quizController.edit);
router.put('/quizes/:quizId(\\d+)',  		quizController.update);
router.delete('/quizes/:quizId(\\d+)', 	 	quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);



module.exports = router;
