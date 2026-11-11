import User from "./autenticacion.models.js"
import { hashPassword, comparePassword } from "./hashService.js"
import { generateToken } from "./jwtService.js"

export async function registrar(req, res) {
 try {
    const { name, email, password } = req.body; 


    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste)
      return res.status(400).json({ message: "El usuario ya existe!" });

   
    const hashedPassword = await hashPassword(password);

  
    const usuario = new User({ name, email, password: hashedPassword });
    await usuario.save();

    res.status(201).json({ message: "Usuario registrado con éxito!" });
  } catch (err) {

    res.status(500).json({ error: err.message });
  }   
}

export async function acceso(req, res) {
    try {
    const { email, password } = req.body; 

  
    const usuario = await User.findOne({ email });
    if (!usuario)
      return res.status(400).json({ message: "Correo electrónico o contraseña no válidos" });

    
    const coincide = await comparePassword(password, usuario.password);
    if (!coincide)
      return res.status(400).json({ message: "Correo electrónico o contraseña no válidos" });

    const token = generateToken({ id: usuario._id, email: usuario.email });

    
    res.json({ message: "Inicio de sesión exitoso!", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export function perfil(req, res) {
    res.json({
    message: "Bienvenido a tu perfil!",
    usuario: req.usuario,
  });
}