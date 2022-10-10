const { Schema, model } = require("mongoose");

const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la marca es requerido"]
    },
    estado: {
        type: String,

        required: true,
        enum: [
            "Activo",
            "Inactivo"
        ]
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Marca', MarcaSchema) /** exportamos */