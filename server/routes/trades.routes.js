const TradesCon= require("../controllers/trades.controller");

module.exports= (app)=>{
    app.post("/api/trades", TradesCon.createTrades);
    app.put("/api/trades/:id",TradesCon.updateTrades);
    app.delete("/api/trades/:id", TradesCon.deleteTrades);
    app.get("/api/tradeses",TradesCon.findAllTrades);
    app.get("/api/trades/:id", TradesCon.findOneTrades)
}