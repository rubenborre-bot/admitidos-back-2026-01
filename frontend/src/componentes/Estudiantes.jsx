import { Fragment } from "react";
import { useState, useEffect } from "react";
export function Estudiantes(){
const [estudiantes, setEstudiantes] = useState([])
const [estudianteId, setEstudianteId] = useState("")
const [estudiante, setEstudiante] = useState(null)
const [error, setError] = useState("")
const [name, setName] = useState("")
const [programaId, setProgramaId] = useState("")
const [codigo, setCodigo] = useState("")
const [programas, setProgramas] = useState([])
const [idEditar, setIdEditar] = useState(null)
    function listarEstudiantes(){
        fetch("http://localhost:3000/api/estudiantes/show")
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
          setEstudiantes(response.data) 
        }
    )
    }
    useEffect(listarEstudiantes,[])
    function mostrarEstudiantePorId(id){
        fetch(`http://localhost:3000/api/estudiantes/info/${id}`)
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
              if(response.success){
          setEstudiante(response.data)
          setError("")
          }
          else{
             setError(response.message)
             setEstudiante(null)
            }
        })
    }
    function listarProgramas(){
        fetch("http://localhost:3000/api/programas/show")
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
            setProgramas(response.data)
        })
    }

    useEffect(listarProgramas,[])
    const estudianteObj = {
    name: name,
    programa_id: programaId,
    codigo: codigo
    }
    function registrarEstudiante(){
        if(estudianteObj.name.trim() != "" && estudianteObj.programa_id.trim() != "" && estudianteObj.codigo.trim() != ""){
        fetch("http://localhost:3000/api/estudiantes/create", {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(estudianteObj)})
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
            if(response.success){
          listarEstudiantes()
          setName("")
          setProgramaId("")
          setCodigo("")
          setError("")
            }else{
                setError(response.message)
            }
        })
    }
        else{
            setError("Los campos no  pueden estar vacios")
        }
    }
    function actualizarEstudiante(){
         if(estudianteObj.name.trim() != "" && estudianteObj.programa_id.trim() != "" && estudianteObj.codigo.trim() != ""){
        fetch(`http://localhost:3000/api/estudiantes/update/${idEditar}`, {method:"PUT",headers:{ "Content-Type": "application/json"}, body: JSON.stringify(estudianteObj)})
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
            if(response.success){
               listarEstudiantes()
          setName("")
          setProgramaId("")
          setCodigo("")
          setIdEditar(null)
          setError("")
          setEstudiante(null)
            }else{
               setError(response.message)
            }
        })
        }else{
            setError("Los campos no  pueden estar vacios")
        }
    }
    function editarEstudiante(estudiante){
       setIdEditar(estudiante._id)
       setName(estudiante.name)
       setCodigo(estudiante.codigo)
       setProgramaId(estudiante.programa_id)
    }  
    function eliminarEstudiante(id){
       fetch(`http://localhost:3000/api/estudiantes/delete/${id}`, {method:"DELETE", headers:{ "Content-Type": "application/json"}})
       .then((response)=>{
        return response.json()
       })
       .then((response)=>{
        if(response.success){
            listarEstudiantes()
            if(id === idEditar){
                cancelarEdicion()
            }

        }
        else{
            setError(response.message)
        }
       })
    }
    function cancelarEdicion(){
        setName("")
        setIdEditar(null)
        setCodigo("")
        setProgramaId("")
        setError("")
    }
    return(
        <>
        <h1>Estudiantes</h1>
        <ul>
            
            {
            estudiantes.map((estudiante)=>{ return <Fragment key={estudiante._id}> <li>{estudiante.name}</li>
                <button onClick={()=>{editarEstudiante(estudiante)}}>Editar estudiante</button>
                <button onClick={()=>{eliminarEstudiante(estudiante._id)}}>Eliminar estudiante</button>
                </Fragment>  
            })
            } 
           
        </ul>
        <div>
        <label>Obtener estudiante por ID</label>
        <input value={estudianteId} onChange={(e)=>{setEstudianteId(e.target.value) ; setError("")}}></input>
        <button onClick={()=>{mostrarEstudiantePorId(estudianteId)}}>Buscar estudiante</button>
        {estudiante && <p>{`Estudiante:${estudiante.name}`}</p>}
        </div>
        <div>
        <label>Registrar nuevo estudiante o actualizar</label>
        <input value={name} onChange={(e)=>{setName(e.target.value); setError("")}} placeholder="nombre"></input>
        <select value={programaId} onChange={(e)=>{setProgramaId(e.target.value); setError("")}}>
            <option value="">Selecciona...</option>
             {programas.map((programa)=>{
              return <option key={programa._id} value={programa._id}>{programa.name}</option>
             })}  
        </select>
        <input value={codigo} onChange={(e)=>{setCodigo(e.target.value) ; setError("")}} placeholder="codigo"></input>
        <button onClick={()=>{registrarEstudiante()}} disabled={idEditar !== null}>Registrar estudiante</button>
        <button onClick={()=>{actualizarEstudiante()}} disabled={idEditar === null} >Actualizar estudiante</button>
        {idEditar !== null && <button onClick={()=>{cancelarEdicion()}}>Cancelar edicion</button> }
        </div>
        {error && <p>{error}</p>}
        </>
    )
}