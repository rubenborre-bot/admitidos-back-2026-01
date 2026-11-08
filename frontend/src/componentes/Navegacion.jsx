import { Link } from 'react-router-dom'
export function Navegacion(){
    return(
        <>
        <nav>
            <ul>
                <li><Link to="/facultades">Facultades</Link></li>
                <li><Link to="/programas">Programas</Link></li>
            </ul>
        </nav>
        </>
    )
}