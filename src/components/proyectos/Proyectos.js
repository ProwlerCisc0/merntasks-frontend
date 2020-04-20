import React,{useContext, useEffect} from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra"
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthConext from '../../context/autenticacion/authContext';



const Proyectos = () =>{

    //Extraer la información de autenticación
    const authContext = useContext(AuthConext);
    const {usuarioAutenticado} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);

    return(
        <div className="contenedor-app">
          
          <Sidebar></Sidebar>

            <div className="seccion-principal">
                <Barra></Barra>
                <main>
                    <FormTarea></FormTarea>
                    <div className="contenedor-tareas">
                        <ListadoTareas></ListadoTareas>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Proyectos;