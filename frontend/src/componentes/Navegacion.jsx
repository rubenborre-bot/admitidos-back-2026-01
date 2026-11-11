import { Link, useNavigate } from 'react-router-dom'
export function Navegacion(){
    const navigate = useNavigate()
    function cerrarSesion(){
        localStorage.removeItem("token")
        navigate("/login")
    }
    return(
        <>
        <nav>
            <ul>
                <li><Link to="/facultades">Facultades</Link></li>
                <li><Link to="/programas">Programas</Link></li>
                <li><Link to="/estudiantes">Estudiantes</Link></li>
                <li><Link to="/perfil">Perfil</Link></li>
            </ul>
            <button onClick={()=>{cerrarSesion()}}>cerrar sesion</button>
        </nav>
        </>
    )
}