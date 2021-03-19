const newUser = require("./newUser");
const validateUser = require("./validateUser");
const loginUser = require("./loginUser");
const getUser = require("./getUser");
const deleteUser = require("./deleteUser");
const editUser = require("./editUser");
const editUserPass = require("./editUserPass");
const recoverUserPass = require("./recoverUserPass");
const resetUserPass = require("./resetUserPass");

module.exports = {
    newUser,
    validateUser,
    loginUser,
    getUser,
    deleteUser,
    editUser,
    editUserPass,
    recoverUserPass,
    resetUserPass,
};