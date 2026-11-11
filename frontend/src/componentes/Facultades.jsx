import { useState, useEffect, Fragment } from "react"
export function Facultades(){
    const [facultades, setFacultades] = useState([]);
    const [nombre, setNombre] = useState("")
    const [error, setError] = useState("")
    const [idEditar, setIdEditar] = useState(null)

    function listarFacultades(){
        fetch("http://localhost:3000/api/facultades/show")
    .then((response)=>{
       return response.json()
    })
    .then((response)=>{
       setFacultades(response.data)
    })
}
    useEffect(listarFacultades, [])

const facultadObj = {
    nombre: nombre
}
function registrarFacultad(){
    if(facultadObj.nombre.trim() != ""){
fetch("http://localhost:3000/api/facultades/create", {method: "POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(facultadObj)})
.then((response)=>{
 return response.json()
})
.then(()=>{
 listarFacultades()
 setNombre("")
 setError("")
})
}else{
   setError("Debes ingresar el nombre de la facultad")
}
}

function eliminarFacultad(id){
fetch(`http://localhost:3000/api/facultades/delete/${id}`, {method:"DELETE", headers:{ "Content-Type": "application/json"}})
.then(listarFacultades)
}

function editarFacultad(facultad){
  setNombre(facultad.nombre)
  setIdEditar(facultad._id)
}

function actualizarFacultad(){
     fetch(`http://localhost:3000/api/facultades/update/${idEditar}`, {method: "PUT", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(facultadObj)})
  .then(()=>{
        listarFacultades()
        setNombre("")
        setIdEditar(null)
  })
}
    return(
        <>
        <h1>Gestión de Facultades</h1>
        <ul>
          {
         facultades.map((facultad)=>{
            return <Fragment key={facultad._id}>
                <li>{facultad.nombre}</li>  
            <button onClick={()=>{editarFacultad(facultad)}}>Editar facultad</button>
            <button onClick={()=>{eliminarFacultad(facultad._id)}}>Eliminar facultad</button>
            </Fragment>
           })
          }
        </ul>
        <input value={nombre} onChange={(e)=>{setNombre(e.target.value); setError("") }}></input>
        <button  onClick={registrarFacultad}>Registrar facultad</button>
        <button onClick={actualizarFacultad}>Actualizar facultad</button>
        {error && <p>{error}</p>}
        
        </>
    )
}