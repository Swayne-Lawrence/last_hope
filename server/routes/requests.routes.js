const RequestsCon= require("../controllers/requests.controller");

module.exports= (app)=>{
    app.post("/api/requests",  RequestsCon.createRequests);
    app.put("/api/requests/:id", RequestsCon.updateRequests);
    app.delete("/api/requests/:id", RequestsCon.deleteRequests);
    app.get("/api/requestses",RequestsCon.findAllRequests);
    app.get("/api/requests/:id", RequestsCon.findOneRequests)
}