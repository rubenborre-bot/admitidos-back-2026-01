import db from "../../config/database.js";
export async function listarFacultades() {
    const [rows] = await db.execute(`SELECT id, name FROM facultades ORDER BY name ASC`);
    return rows;
}
export async function obtenerFacultadPorId(id) {
     const [rows] = await db.execute(`SELECT id, name FROM facultades WHERE id = ?`, [id]);
    return rows[0];
}
export async function crearFacultad(name) {
    const [result] = await db.execute(`INSERT INTO facultades(name) VALUES (?)`, [name]);
    return result.insertId;
}
export async function actualizarFacultad(id, name) {
    await db.execute(`UPDATE facultades SET name =? WHERE id =?`,[name, id]);
    return obtenerFacultadPorId(id)
}
export async function eliminarFacultad(id) {
    const [result] = await db.execute(`DELETE FROM facultades WHERE id =?`, [id]);
    return(
        result.affectedRows > 0
    )
    
}