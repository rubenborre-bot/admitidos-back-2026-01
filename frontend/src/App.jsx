import './App.css'
import { Encabezado } from './componentes/Encabezado.jsx'
import { Navegacion } from './componentes/Navegacion.jsx'
import { Routes, Route } from 'react-router-dom'
import { Facultades } from './componentes/Facultades.jsx'
import { Programas } from './componentes/Programas.jsx'
import { Inicio } from './componentes/Inicio.jsx'
import {Estudiantes} from "./componentes/Estudiantes.jsx"
import { Login } from './componentes/Login.jsx'
import { Registro } from './componentes/Registro.jsx'
import { Perfil } from './componentes/Perfil.jsx'
function App() {
  

  return (
    <>
    <Encabezado/>
    <Navegacion/>
    <Routes>
      <Route path='/facultades' element={<Facultades/>}/>
      <Route path='/programas' element={<Programas/>}/>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/estudiantes' element={<Estudiantes/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registrar' element={<Registro/>}/>
      <Route path='/perfil' element={<Perfil/>}/>
    </Routes>
    </>
  )
}

export default App
