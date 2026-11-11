import { verifyToken } from "./jwtService.js";
export default (req, res, next) => {
 
  const autenticacionHeader = req.headers["authorization"];
  if (!autenticacionHeader)
    return res.status(401).json({ message: "No se proporciona el token" });


  const token = autenticacionHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token malformado" });

  try {
    
    const decodificado = verifyToken(token);

    req.usuario = decodificado;

    
    next();
  } catch (err) {
   
    res.status(401).json({ message: "Token no válido o caducado" });
  }
};