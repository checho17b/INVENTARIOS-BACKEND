const { Schema, model } = require("mongoose");

const InventarioSchema = Schema({
    serial: {
        type: String,
        required: [true, "El serial del equipo es requerido"],
        unique: [true, " El equipo est en uso"]
    },
    modelo: {
        type: String,
        required: [true, "El modelo es requerido"]
    },
    descripcion: {
        type: String,
        required: true,
    },
    foto: {
        type: String
    },
    color: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: Date,
        default: new Date()
    },
    precio: {
        type: Number
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false /** se puso false porque se puede crear inventario sin asociar usuario */
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado',
        required: true
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
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

module.exports = model('Inventario', InventarioSchema)