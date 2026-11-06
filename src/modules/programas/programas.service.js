import Programas from "./programas.model.js";
export async function listarProgramas() {
    return await Programas.find().sort({name: 1});
}

export async function obtenerProgramasPorId(id) {
    return await Programas.findById(id);
}
export async function crearProgramas(name, facultad_id, codigo) {
    return await Programas.create({name: name,
        facultad_id: facultad_id,
        codigo: codigo});
}

export async function actualizarPrograma(id, name, facultad_id, codigo) {
    return await Programas.findByIdAndUpdate(
        id,{name: name,
        facultad_id: facultad_id,
        codigo: codigo},
        {returnDocument: 'after', runValidators: true}
    );
}

export async function eliminarPrograma(id) {
    const eliminada = await Programas.findByIdAndDelete(id);
    return eliminada !== null;
}