import Estudiantes from "./estudiantes.model.js";
export async function listarEstudiantes() {
    return await Estudiantes.find().sort({name: 1});
}

export async function obtenerEstudiantePorId(id) {
    return await Estudiantes.findById(id);
}
export async function crearEstudiante(name, programa_id, codigo) {
    return await Estudiantes.create({name: name,
        programa_id: programa_id,
        codigo: codigo});
}

export async function actualizarEstudiante(id, name, programa_id, codigo) {
    return await Estudiantes.findByIdAndUpdate(
        id,{name: name,
        programa_id: programa_id,
        codigo: codigo},
        {returnDocument: 'after', runValidators: true}
    );
}

export async function eliminarEstudiante(id) {
    const eliminada = await Estudiantes.findByIdAndDelete(id);
    return eliminada !== null;
}