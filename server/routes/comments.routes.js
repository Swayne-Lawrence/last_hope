const CommentsCon= require("../controllers/comments.controller");

module.exports= (app)=>{
    app.post("/api/comments", CommentsCon.createComments);
    app.put("/api/comments/:id",CommentsCon.updateComments);
    app.delete("/api/comments/:id", CommentsCon.deleteComments);
    app.get("/api/commentses",CommentsCon.findAllComments);
    app.get("/api/comments/:id", CommentsCon.findOneComments)
    app.get("/api/commentses/:pro",CommentsCon.findAllCommentsPro);
}