import { useState, useEffect, Fragment } from "react"
export function Facultades(){
    const [facultades, setFacultades] = useState([]);
    const [nombre, setNombre] = useState("")
    const [error, setError] = useState("")

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
    return(
        <>
        <h1>Gestión de Facultades</h1>
        <ul>
          {
         facultades.map((facultad)=>{
            return <Fragment key={facultad._id}>
                <li>{facultad.nombre}</li>  
            <button onClick={()=>{eliminarFacultad(facultad._id)}}>Eliminar facultad</button>
            </Fragment>
           })
          }
        </ul>
        <input value={nombre} onChange={(e)=>{setNombre(e.target.value); setError("") }}></input>
        <button  onClick={registrarFacultad}>Registrar facultad</button>
        {error && <p>{error}</p>}
        
        </>
    )
}