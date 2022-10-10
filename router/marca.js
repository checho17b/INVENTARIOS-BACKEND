const { Router } = require("express");

const router = Router();
const Marca = require("../modelos/Marca");

// crear marca con POST
router.post("/", async function(req, res) {
    try {
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }

});
// Consuktar marca con GET
router.get("/", async function(req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }

});
// Actualizar marcas se hace con PUT
router.put("/:marcaId", async function(req, res) {
    try {
        let marca = await Marca.findById(req.params.marcaId);
        if (!marca) {
            return res.status(400).send("Esta marca no existe");
        }
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        //marca.fechaCreacion = new Date(); // esta se calcula cuando se hace el registro
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error");
    }
});


router.delete("/:deleteMarcaId", async function(req, res) {
    try {
        console.log(req.body, req.params);
        let marca = await Marca.findById(req.params.deleteMarcaId);
        if (!marca) {
            return res.status(400).send(" Esta marca no existe")
        }
        const MarcaBd = await Marca
            .findOneAndDelete({ email: req.body.email, _id: { $ne: marca._id } });
        console.log("Marca eliminada", MarcaBd);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error")
    }
});
module.exports = router;