const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const personRouter = require("./routes/person");
const especialidadRouter = require("./routes/especialidad");


const AppError = require("./utils/appError");
const ErrorHandle = require("./utils/errorHandle");
const bodyParser = require("body-parser");

const PORT = 3350;
const corsOptions ={
    origin:'*', 
    credentials:true,           
    optionSuccessStatus:200,
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.use(router);
app.use(personRouter);
app.use(especialidadRouter);


app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalURL} does not exists`, 404));
});

app.use(ErrorHandle);


app.listen(PORT, ()  => {
    console.log(`El servidor esta siendo escuchado por el puerto: ${PORT}`);
})


module.exports = app;