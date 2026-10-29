import db from "../../config/database.js";
export async function listarProgramas() {
    const [rows] = await db.execute(`SELECT * FROM programas ORDER BY name ASC`);
    return rows;
}
export async function obtenerProgramasPorId(id) {
     const [rows] = await db.execute(`SELECT * FROM programas WHERE id = ?`, [id]);
    return rows[0];
}
export async function crearPrograma(name, facultad_id, codigo) {
    const [result] = await db.execute(`INSERT INTO programas(name, facultad_id, codigo) VALUES (?, ?, ?)`,
        [name, facultad_id, codigo]);
    return result.insertId;
}
export async function actualizarPrograma(id, name) {
    await db.execute(`UPDATE programas SET name =? WHERE id =?`,[name, id]);
    return obtenerProgramasPorId(id)
}
export async function eliminarPrograma(id) {
    const [result] = await db.execute(`DELETE FROM programas WHERE id =?`, [id]);
    return(
        result.affectedRows > 0
    )
    
}