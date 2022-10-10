const { Router } = require("express");
const Inventario = require("../modelos/Inventario");
const router = Router();

// consultar inventarios
router.get("/", async function(req, res) {
    try {
        const inventario = await Inventario.find().populate([
            // en este arreglo con populate viene un listado de objetos
            //esta propiedad le dice a la coleccion de inventario cuales son las ref que tiene mi esquema al momento de listar
            {
                path: "usuario",
                select: "nombre email estado "
                    /**en el select se le puso nombre etc, para que solo se muestren esos datos de usuario */
            },
            {
                path: "marca",
                select: "nombre estado"
            },
            {
                path: "estado",
                select: "nombre estado"
            },
            {
                path: "tipoEquipo",
                select: " nombre estado"
            }
        ]);
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error ");
    }

});

router.post("/", async function(req, res) {
    try {
        const existeInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) { // para que el serial no se repita en  mi base de datos
            return res.status(400).send("Este serial ya existe en otro equipo");
        }
        // ahora creamos la instancia de inventario
        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.estado = req.body.estado._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();
        inventario = await inventario.save();

        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");

    }

});

router.put("/:inventarioId", async function(req, res) {
    try {
        let inventario = await Inventario.findById(req.params.inventarioId)
        if (!inventario) {
            return res.status(400).send("Este inventario no existe") // 400 para señalar errores de clientes
        }
        const existeInventarioPorSerial = await Inventario
            .findOne({ serial: req.body.serial, _id: { $ne: inventario._id } }); // para actualizar agreagamos $ne
        if (existeInventarioPorSerial) { // para que el serial no se repita en  mi base de datos y saber si existe otro inv.
            return res.status(400).send("Este serial ya existe en otro equipo");
        }
        // ahora creamos la instancia de inventario

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.estado = req.body.estado._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();
        inventario = await inventario.save();

        res.send(inventario);
    } catch (error) {
        console.log(error)
        res.status(500).send("Ocurrio un error ") // 500 error del servidor
    }
});

router.delete("/:deleteInventarioId", async function(req, res) {
    try {
        console.log(req.body, req.params);
        let inventario = await Inventario.findById(req.params.deleteInventarioId);
        if (!inventario) {
            return res.status(400).send(" Inventario no existe")
        }
        const EstadoBd = await Inventario
            .findOneAndDelete({ email: req.body.email, _id: { $ne: inventario._id } });
        console.log("Inventario eliminado", EstadoBd);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }
});
module.exports = router;