import { useContext } from "react";
import { AuthContext } from "../context/authContext";

//custom hook para usar el contexto de autentificacion
export default function useAuth() {
    const context = useContext(AuthContext);
    return context;
}