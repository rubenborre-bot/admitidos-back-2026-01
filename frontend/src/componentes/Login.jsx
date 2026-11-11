import { useState } from "react";
import {useNavigate} from "react-router-dom"

export function Login(){
const navigate = useNavigate()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")

    const datosObj ={
      email: email,
      password: password
    }

    function iniciarSesion(){
       if(email.trim() != "" && password != ""){
        fetch("http://localhost:3000/api/autenticacion/inicio-sesion", {method:"POST", headers:{ "Content-Type": "application/json"}, body: JSON.stringify(datosObj)})
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
            if(response.token){
                localStorage.setItem("token", response.token)
                navigate("/")
            }
            else{
                setError(response.message || response.error)
            }
        })
       }else{
        setError("Debes ingresar correo y contraseña")
       }
    }
    return(
        <>
        <div className="contenedor-login">
        <h1>Iniciar sesion</h1>
        <input value={email} type="email" onChange={(e)=>{setEmail(e.target.value) ; setError("") }} placeholder="email"></input>
        <input value={password} type="password" onChange={(e)=>{setPassword(e.target.value) ; setError("")}} placeholder="contraseña"></input>
        <button onClick={()=>{iniciarSesion()}}>Iniciar sesion</button>
        <div>
        <label>No se ha registrado? <button onClick={()=>{navigate("/registrar")}}>Registrar usuario</button></label>
        </div>
        {error && <p>{error}</p>}
        </div>
        </>
    )
}