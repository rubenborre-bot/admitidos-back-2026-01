import { useState, useEffect } from "react";
export function Perfil(){
    const token = localStorage.getItem("token")
    const [usuario, setUsuario] = useState({})
    function mostrarPerfil(){
        fetch("http://localhost:3000/api/autenticacion/perfil", { method:"GET" , headers: {Authorization: `Bearer ${token}`}})
        .then((response)=>{
             return response.json()
        })
        .then((response)=>{
           setUsuario(response.usuario || {})
        })
    }
    useEffect(mostrarPerfil, [])
    return(
        <>
        <p>Perfil de usuario con Id: {usuario.id}</p> 
        <p>Email: {usuario.email}</p> 
        </>
    )
}