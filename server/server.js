require("dotenv").config();
const express = require('express');
const cookieParser= require("cookie-parser")
const cors = require('cors')
const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
    
}));



require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/game.routes")(app);
require("./routes/pokemon.routes")(app);
require("./routes/tempPoke.routes")(app);
require("./routes/que.routes")(app);
require("./routes/comments.routes")(app);
require("./routes/requests.routes")(app);
require("./routes/trades.routes")(app);
require("./routes/banned.routes")(app);


const server =app.listen(port, ()=>console.log(`Listening on port: ${port}`));