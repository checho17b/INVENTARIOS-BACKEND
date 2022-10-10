const { Router } = require("express");
const router = Router();
const TipoEquipo = require("../modelos/TipoEquipo");

/**
 * esta ruta recibe dos parametros que es req y res
 * el req vienen todos los datos que vienen en este recurso la solicitud viene en req
 * res responde a la solicitud. la rta viene en res
 * con router creamos los diferentes metodos post, get, ect.
 */
router.post("/", async function(req, res) {
    try {
        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);


    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }

});

router.get("/", async function(req, res) {
    try {
        const tipos = await TipoEquipo.find();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }

});

router.put("/:tipoEquipoId", async function(req, res) {
    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoEquipo) {
            return res.status(400).send("Esta equipo no existe");
        }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        //marca.fechaCreacion = new Date(); // se calcula cuando se hace el registro
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }
});

router.delete("/:deleteTipoEquipoId", async function(req, res) {
    try {
        console.log(req.body, req.params);
        let tipoEquipo = await TipoEquipo.findById(req.params.deleteTipoEquipoId);
        if (!tipoEquipo) {
            return res.status(400).send(" Este tipo de equipo no existe")
        }
        const TipoEquipoBd = await TipoEquipo
            .findOneAndDelete({ email: req.body.email, _id: { $ne: tipoEquipo._id } });
        console.log("TipoEquipo eliminado", TipoEquipoBd);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }
});
module.exports = router;