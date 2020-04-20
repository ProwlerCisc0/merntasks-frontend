import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaConext from '../../context/validacion/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const ListadoProyectos = () =>{
    


    const proyectoContext = useContext(ProyectoContext);
    const {proyectos, mensaje, obtenerProyectos} = proyectoContext;
    
    const alertaContext = useContext(AlertaConext);
    const {alerta, mostrarAlerta} = alertaContext;
    //Obtener objetos cuando carga el componente
    //Nunca debe haber un return por encima
    //Del useEffect
    
    useEffect(()=>{

        if(mensaje){
            //Acá, en vez de poner un código html
            //que muestre la alerta, se agrega la función
            //de sweetalert para mostrar el error
            mostrarAlerta(mensaje.msg, `mensaje ${mensaje.categoria}`)
        }
        obtenerProyectos();
    },[mensaje])
    
    if(proyectos.length === 0) return <p>No hay proyectos, prueba agregando uno uwu</p>;


    return(
        <ul className="listado-proyectos">
            
    {alerta ?(<div className= {`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <TransitionGroup>
            {proyectos.map(proyecto=>(
               <CSSTransition
                key={proyecto._id}
                timeout={300}
                classNames="proyecto"
               >
                    <Proyecto
                    proyecto={proyecto}
                ></Proyecto>
               </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;
