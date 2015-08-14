// Middleware para autologout

var defaultTime = 2 * 60 * 1000; // dos minutos en ms

module.exports = function(t) {

  var logoutTime = t || defaultTime;

  //test
  console.log("Nos piden autologout con t = " + logoutTime);

  return function(req, res, next)
  {
    var now = new Date().getTime();
    //test
    console.log("Tiempo actual: " + now);

    // recuperamos la hora de la última petición
    var lastReqTime = req.session.reqTime || now;

    // si hay un usuario registrado y ha sobrepasado el logoutTime
    if (req.session.user && (now - lastReqTime > logoutTime))
    {
      delete req.session.user; // eliminamos la sesión
      //test
      console.log("Hemos eliminado la sesión por inactividad");
    }

    //actualizar
    req.session.reqTime = now;
    // pasamos al siguiente MW
    next();
  };
};
