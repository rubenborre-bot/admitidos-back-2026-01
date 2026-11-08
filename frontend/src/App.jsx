import './App.css'
import { Encabezado } from './componentes/Encabezado.jsx'
import { Navegacion } from './componentes/Navegacion.jsx'
import { Routes, Route } from 'react-router-dom'
import { Facultades } from './componentes/Facultades.jsx'
import { Programas } from './componentes/Programas.jsx'
import { Inicio } from './componentes/Inicio.jsx'
function App() {
  

  return (
    <>
    <Encabezado/>
    <Navegacion/>
    <Routes>
      <Route path='/facultades' element={<Facultades/>}/>
      <Route path='/programas' element={<Programas/>}/>
      <Route path='/' element={<Inicio/>}/>
    </Routes>
    </>
  )
}

export default App
