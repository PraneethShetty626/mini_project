const Todo = artifacts.require("HospitalContract");


module.exports = function (deployer) {
  deployer.deploy(Todo);
};
