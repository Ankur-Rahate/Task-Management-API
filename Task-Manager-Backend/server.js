import app from "./src/app.js";
import { config } from "./src/config/config.js";
import dbconnection from "./src/config/db.js";


const startserver = async() =>{
await dbconnection();
const PORT = config.port || 3006;

app.listen(PORT, () =>{
  console.log(`Server start on port: ${PORT}`)
})
}
startserver();