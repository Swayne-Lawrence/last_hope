const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config")

module.exports=(app)=>{
    app.post("/api/user/register", UserController.register);
    app.post("/api/user/login", UserController.login);
    app.post("/api/user/logout", UserController.logout);
    app.get("/api/users", UserController.findAllUsers);
    app.get("/api/user/logged",authenticate, UserController.getLoggedUser);
    app.get("/api/user/:id", UserController.findOneUser );
    app.put("/api/user/:id",UserController.updateUser);
    app.delete("/api/user/:id", UserController.deleteUser);
    app.get("/api/users/ratio", UserController.findAllUsersRatio)

}