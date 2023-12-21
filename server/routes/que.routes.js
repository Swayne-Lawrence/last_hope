const QueController = require("../controllers/que.controller");

module.exports = (app)=>{
    app.get("/api/ques", QueController.findAllQues);
    app.get("/api/que/:id", QueController.findOneQue);
    app.post("/api/que", QueController.createQue);
    app.delete("/api/que/:id", QueController.deleteQue);
    app.put("/api/que/:id",QueController.updateQue)
}