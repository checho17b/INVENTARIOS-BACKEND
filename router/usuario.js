const { Router } = require("express");
const { db } = require("../modelos/Usuario");

const router = Router();
//importamos el modelo
const Usuario = require("../modelos/Usuario")

/**
 * esta ruta recibe dos parametros que es req y res
 * el req vienen todos los datos que vienen en este recurso la solicitud viene en req
 * res responde a la solicitud. la rta viene en res
 * con router creamos los diferentes metodos post, get, ect.
 */
router.post("/", async function(req, res) {
    try {
        console.log(req.body); // los datos que me envias desde post se recuepran por medio de req.body
        //res.send(req.body);
        /**paraa crear un nuevo usuario debemos asociar los datos que vienen en el body de postman al modelo
         * verificamos que no exista ese usuario con findOne
         */
        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        console.log("Existe este usuario", existeUsuario);
        if (existeUsuario) {
            return res.status(400).send("Este email ya existe");

        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save(); // el metodo save se encarga de crear lo que puse aqui en la base de datos

        res.send(usuario);

    } catch (error) {
        console.log(error) // si ocurre un error sera trapado por catch y se dara una rta al cliente
        res.status(500).send("Ocurrio un error");
    }


});
/** consultar usuarios
 * en el postman nos muestra todos los usuarios que hay
 * */
router.get("/", async function(req, res) {

    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }

});
// actualizar PUT.. es muy similar a creacion con post
router.put("/:usuarioID", async function(req, res) {
    /**para actualizar tambien se verifica si el email ya existe
     * ademas se tiene que enviar el Id de lo que se va a actualizar
     * se envia en la url
     * el usuario que llega se recupera atravez de req.params
     */

    try {
        console.log(req.body, req.params);
        let usuario = await Usuario.findById(req.params.usuarioID);
        if (!usuario) {
            return res.status(400).send(" usuario no existe");
        }

        const existeUsuario = await Usuario
            .findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        console.log("existe usuario", existeUsuario);

        if (existeUsuario) {
            return res.status(400).send("Este usuario ya existe");

        }
        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date()
            // con findById buscamos si el usuario existe por ID
            // $ne= no equals para que busque un email diferente al usuario que se esta actualizando

        usuario = await usuario.save(); // el metodo save se encarga de crear lo que puse aqui en la base de datos

        res.send(usuario);

    } catch (error) {
        console.log(error) // si ocurre un error sera atrapado por catch y se dara una rta al cliente
        res.status(500).send("Ocurrio un error");
    }



});

router.delete("/:deleteUsuarioID", async function(req, res) {
    try {
        console.log(req.body, req.params);
        let usuario = await Usuario.findById(req.params.deleteUsuarioID);
        if (!usuario) {
            return res.status(400).send(" usuario no existe")
        }
        const UsuarioBd = await Usuario
            .findOneAndDelete({ email: req.body.email, _id: { $ne: usuario._id } });
        console.log("Usuario eliminado", UsuarioBd);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }
});
module.exports = router;