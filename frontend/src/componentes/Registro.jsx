import { useState } from "react";
import {useNavigate} from "react-router-dom"
export function Registro(){
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [error, setError] = useState("")
    const usuarioObj = {
        name: name,
        email: email,
        password: password
    }
  function registrarUsuario(){
        if(email.trim() != "" && password != "" && name.trim() != ""){
       fetch("http://localhost:3000/api/autenticacion/registrar", {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(usuarioObj)})
        .then(async (response)=>{
            const obj = {
                respuesta: response,
                json: await response.json()
            }
            return obj
        })
        .then((obj)=>{
            if(obj.respuesta.status == 201){
              setMensaje(obj.json.message)
              navigate("/login")
            }
            else{
                setError(obj.json.message)
            }
           
        })
        }else{
        setError("Debes ingresar nombre, correo y contraseña")
       }
    }
    return(
        <>
        <input value={name} onChange={(e)=>{setName(e.target.value); setError("")}} placeholder="nombre"></input>
        <input value={email} onChange={(e)=>{setEmail(e.target.value); setError("")}} placeholder="email" ></input>
        <input value={password} onChange={(e)=>{setPassword(e.target.value); setError("")}} placeholder="contraseña"></input>
        <button onClick={()=>{registrarUsuario()}}>Registrar usuario</button>
        {mensaje && <p>{mensaje}</p>}
        {error && <p>{error}</p>}
        </>
    )
}