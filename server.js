const express = require("express"); //importamos express//
const { getConnection } = require("./baseDatos/configuracion");
const cors = require("cors");
require("dotenv").config();

const app = express(); // se creo una variable a traves de la importacion de express que es app//
const port = process.env.PORT; //se creo un puerto 3000
// Antes era puerto 3000 pero ahora se hace el llamado por medio de la variable de entorno .env
/**la variable de entorno se hizo para que la config del puerto y tener mayor flexibilidad*/


app.use(cors());

getConnection();
/**paerseo JSON.  hay que poner middlewares esto es una peticion que se ejecuta antes de llamar a las rutas
 * para que todos los datos que se envien y se respondadn por medio de la app se conviertan o se puesdan tratar cmo JSON
 */
app.use(express.json());


/** con app definimos las rutas padre que usaran las rutas hijas
 * 
 */

app.use("/usuario", require("./router/usuario"));
app.use("/estado", require("./router/estado"));
app.use("/marca", require("./router/marca"));
app.use("/tipoEquipo", require("./router/tipoEquipo"));
app.use("/inventario", require("./router/inventario"));


app.listen(port, () => {
    console.log(`Servidor arrancó por puerto ${port}`)
});
/** importamos para funcion getConnection para conectar con la lbase de datos */
/**usamos express que nos permite crear un servidor web con peticions http al momento de ser llamado por una url*/