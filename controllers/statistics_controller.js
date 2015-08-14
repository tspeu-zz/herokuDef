var models = require('../models/models.js');

var statistics = {
      quizes: 0,
      comments: 0,
      commentsUnpublished: 0,
      commentedQuizes:0
    };

var errors = [];

exports.calculate = function (req, res, next) {
  console.log("");
  console.log("----estadísticas ----");
  console.log("");

  models.Quiz.count()
  .then(function (numQuizes) {
    statistics.quizes = numQuizes;
    return models.Comment.count();
  })
  .then(function (numComments) {
    statistics.comments = numComments;
    return models.Comment.countUnpublished();
  })
  .then(function (numUnpublished) {
    statistics.commentsUnpublished = numUnpublished;
    return models.Comment.countCommentedQuizes();
  })
  .then(function (numCommented) {
    statistics.commentedQuizes = numCommented;
  })
  .catch(function (err) { errors.push(err); })
  .finally(function () {
    console.log("");
    console.log("---- Fin estadísticas ----");
    console.log("");
    console.log(statistics);
    next();
  });

};
// GET /quizes/statistics
exports.show = function (req, res) {
  res.render('statistics/show', { statistics: statistics, errors: errors });
};
