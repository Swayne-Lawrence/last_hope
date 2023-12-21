const GameCon= require("../controllers/game.controller");

module.exports= (app)=>{
    app.post("/api/game", GameCon.createGame);
    app.put("/api/game/:id",GameCon.updateGame);
    app.delete("/api/game/:id", GameCon.deleteGame);
    app.get("/api/games",GameCon.findAllGames);
    app.get("/api/game/:id", GameCon.findOneGame)
}