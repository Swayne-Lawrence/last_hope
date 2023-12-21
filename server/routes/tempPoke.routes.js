const TempPokeCon=require("../controllers/tempPoke.controller");

module.exports=(app)=>{
    app.post("/api/tempPoke", TempPokeCon.createTempPoke);
    app.put("/api/tempPoke/:id", TempPokeCon.updateTempPoke);
    app.delete("/api/tempPoke/:id", TempPokeCon.deleteTempPoke);
    app.get("/api/tempPokes", TempPokeCon.findAllTempPoke);
    app.get("/api/tempPoke/:id", TempPokeCon.findOneTempPoke);

}