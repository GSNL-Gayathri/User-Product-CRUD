let controllerObject = {};

controllerObject = Object.assign(controllerObject, require("./registerUser"));
controllerObject = Object.assign(controllerObject, require("./login"));
controllerObject = Object.assign(controllerObject, require("./getUserList"));

module.exports = controllerObject;
