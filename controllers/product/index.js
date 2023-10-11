let controllerObject = {};

controllerObject = Object.assign(controllerObject, require("./createProducts"));
controllerObject = Object.assign(controllerObject, require("./updateProduct"));
controllerObject = Object.assign(controllerObject, require("./getProductList"));
controllerObject = Object.assign(controllerObject, require("./deleteProduct"));

module.exports = controllerObject;

