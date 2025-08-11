import 'dotenv/config';
import jsonwebtoken from "jsonwebtoken";

export function generarToken(email) {
    return jsonwebtoken.sign({email}, process.env.JWT_TOKEN_SECRET, {expiresIn: '1h'});
}
//el next es para decir que sigue si todoe esta bien
export function verificarToken(req, res, next) {
    //le pido a express el header Authorization si existe ? remplazo el Bearer y lo dejo limpio al token
    const token = req.header('Authorization')?.replace('Bearer ','');

    if(!token) {
        return res.status(401).json( { error: "Token requerido" } );
    }
    //verificamos si es valido
    try {
        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.emailConectado = dataToken.email;
        next(); //para poder seguir encadenando los middleware, sino no avanza
    } catch (e) {
        res.status(401).json( { error: "Token no valido" } );
    }
    
}