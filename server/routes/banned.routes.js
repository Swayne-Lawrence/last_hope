const BannedCon= require("../controllers/banned.controller");

module.exports= (app)=>{
    app.post("/api/banned", BannedCon.createBanned);
    app.get("/api/banned", BannedCon.findAllBanned);
    app.delete("/api/banned/:id", BannedCon.deleteBanned)
}