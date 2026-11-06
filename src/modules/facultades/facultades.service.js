import Facultades from "./facultades.model.js";
export async function listarFacultades() {
    return await Facultades.find().sort({nombre: 1});
}

export async function obtenerFacultadPorId(id) {
    return await Facultades.findById(id);
}
export async function crearFacultad(nombre) {
    return await Facultades.create({nombre});
}

export async function actualizarFacultad(id, nombre) {
    return await Facultades.findByIdAndUpdate(
        id, { nombre },
        {returnDocument: 'after', runValidators: true}
    );
}

export async function eliminarFacultad(id) {
    const eliminada = await Facultades.findByIdAndDelete(id);
    return eliminada !== null;
}