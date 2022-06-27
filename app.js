const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes");
const personRouter = require("./routes/person");

const AppError = require("./utils/appError");
const ErrorHandle = require("./utils/errorHandle");

const PORT = 3350;
const corsOptions ={
    origin:'*', 
    credentials:true,           
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(router);
app.use(personRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalURL} does not exists`, 404));
});

app.use(ErrorHandle);


app.listen(PORT, ()  => {
    console.log(`El servidor esta siendo escuchado por el puerto: ${PORT}`);
})


module.exports = app;