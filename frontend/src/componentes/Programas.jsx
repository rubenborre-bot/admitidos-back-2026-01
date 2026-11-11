import { useEffect, useState } from "react"
import { Fragment } from "react";
export function Programas(){
    const [programas, setProgramas] = useState([])
    const [facultades, setFacultades] = useState([]);
    const [name, setName] = useState("")
    const [codigo, setCodigo] = useState("")
    const [idFacultad, setIdFacultad] = useState("")
    const [error, setError] = useState("")
    const [idEditar, setIdEditar] = useState(null)

    function listarProgramas(){
        fetch("http://localhost:3000/api/programas/show")
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
        setProgramas(response.data)
        })
    }
    useEffect(listarProgramas, []) 

    const programaObj = {
       name: name,
       facultad_id: idFacultad,
       codigo: codigo
    }

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
    function registrarProgramas(){
        if(programaObj.name.trim() != "" && programaObj.codigo.trim() != "" && programaObj.facultad_id.trim() != ""){
     fetch("http://localhost:3000/api/programas/create", {method: "POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(programaObj) })
     .then((response)=>{
        return response.json()
     })
     .then((response)=>{
        if(response.success){
       listarProgramas()
       setIdFacultad("")
       setName("")
       setCodigo("")
       setError("")
        }
        else{
            setError(response.message)
        }
     })
    }else{
        setError("Debes ingresar un nombre, una facultad y un codigo para registrar el programa")
    }
    }
    function eliminarPrograma(id){
       
     fetch(`http://localhost:3000/api/programas/delete/${id}`, {method:"DELETE", headers:{ "Content-Type": "application/json"}})
     .then(()=>{
        listarProgramas()
        if(id === idEditar){
            cancelarEdicion()
        }
     })
        
}

   function editarPrograma(programa){
       setName(programa.name)
       setIdEditar(programa._id)
       setCodigo(programa.codigo)
       setIdFacultad(programa.facultad_id)
    }

function actualizarPrograma(){
    if(programaObj.name.trim() != ""){
     fetch(`http://localhost:3000/api/programas/update/${idEditar}`, {method: "PUT", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(programaObj)})
  .then((response)=>{
       return response.json()
  })
  .then((response)=>{
    if(response.success){
        listarProgramas()
        setName("")
        setIdEditar(null)
        setCodigo("")
        setIdFacultad("")
        setError("")
    }else{
       setError(response.message)  
    }
  })
}else{
   setError("Debes ingresar un nombre para actualizar el programa") 
}
}
function cancelarEdicion(){
        setName("")
        setIdEditar(null)
        setCodigo("")
        setIdFacultad("")
        setError("")
}
    
    return(
        <>
        <h1>Gestión de Programas</h1>
        <ul>
           { programas.map((programa)=>{
           return  <Fragment key={programa._id}>
               <li >{programa.name}</li>
            <button onClick={()=>{editarPrograma(programa)}}>Editar programa</button>
            <button onClick={()=>{eliminarPrograma(programa._id)}}>Eliminar programa</button>
            </Fragment>
            })
           }
        </ul>
        <label>Seleccione una facultad para registrar un programa</label>
        <select value={idFacultad} onChange={(e)=>{setIdFacultad(e.target.value); setError("")}} disabled={idEditar !== null} >
            <option value="">Seleccione...</option>
            {
         facultades.map((facultad)=>{
            return <option value={facultad._id} key={facultad._id}>{facultad.nombre}</option>
         })
            } 
        </select>
        <input value={name} onChange={(e)=>{setName(e.target.value) ; setError("")}} placeholder="programa"></input>
        <input value={codigo} onChange={(e)=>{setCodigo(e.target.value); setError("")}} placeholder="codigo" disabled={idEditar !== null}></input>
        <button onClick={registrarProgramas} disabled={idEditar !== null} >Registrar programa</button>
        <button onClick={actualizarPrograma} disabled={idEditar === null} >Actualizar programa</button>
        {idEditar !== null && <button onClick={cancelarEdicion}>Cancelar</button>}
        {error && <p>{error}</p>}
        </>
    )
}