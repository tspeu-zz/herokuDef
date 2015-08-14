// Funciones auxiliares

// --- limpia la cadena pasada para poder usarla conlike al buscar
exports.sanitize = function (str) {
  var tmp = str || "";
  return "%" + tmp.trim().replace(/ /g, "%") + "%";
};
