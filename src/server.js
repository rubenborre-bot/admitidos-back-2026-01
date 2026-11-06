import app from "./app.js";
import {connectDB} from "./config/database.js";

const PORT = Number(process.env.PORT) || 3306;
const HOST= process.env.HOST;
const APP_NAME= process.env.APP_NAME;

async function startServer(){
    try{
        await connectDB();
        console.log("Base de datos conectada correctamente");
        app.listen(PORT, HOST, ()=>{
        console.log(APP_NAME);
        console.log(`Server is running on http://${HOST}:${PORT}`);
});
    }catch(error){
        console.error("Error al conectar mongoDB", error);
    }
}
startServer();
