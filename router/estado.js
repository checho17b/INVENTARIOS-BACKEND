const { Router } = require("express");
const router = Router();
const Estado = require("../modelos/Estado");


router.post("/", async function(req, res) {
    try {
        let estado = new Estado();
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado;
        estado.fechaCreacion = new Date();
        estado.fechaActualizacion = new Date();
        estado = await estado.save();
        res.send(estado);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }
});

router.get("/", async function(req, res) {
    try {
        const tipos = await Estado.find();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }
});

router.put("/:estadoId", async function(req, res) {
    try {
        let estado = await Estado.findById(req.params.estadoId);
        if (!estado) {
            return res.status(400).send("Este estado no existe");
        }
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado;
        //estado.fechaCreacion = new Date(); // este se calcula cuando se hace el registro
        estado.fechaActualizacion = new Date();

        estado = await estado.save();

        res.send(estado);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }

});

router.delete("/:deleteEstadoId", async function(req, res) {

    try {
        console.log(req.body, req.params);
        let estado = await Estado.findById(req.params.deleteEstadoId);
        if (!estado) {
            return res.status(400).send(" Estado no existe")
        }
        const EstadoBd = await Estado
            .findOneAndDelete({ email: req.body.email, _id: { $ne: estado._id } });
        console.log("Estado eliminado", EstadoBd);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }
});


module.exports = router;