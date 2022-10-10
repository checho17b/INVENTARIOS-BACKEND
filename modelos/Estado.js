const { Schema, model } = require("mongoose");

const EstadoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del estado es requerido"]
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

module.exports = model('Estado', EstadoSchema)