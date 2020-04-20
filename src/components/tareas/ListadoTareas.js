import React,{Fragment, useContext} from 'react';
import Tarea from '../tareas/Tarea';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const ListadoTareas = () =>{

    //Obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //Obtener el state de tareas
    const tareaContext = useContext(TareaContext);
    const { tareasproyecto } = tareaContext;

    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;
    
    //Elimina un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }
    
    return(
        <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>

        <ul className="listado-tareas">
            {tareasproyecto.length === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
                : <TransitionGroup
                >
                {tareasproyecto.map(tarea =>(
                    <CSSTransition
                    key={tarea._id}
                    timeout={300}
                    classNames="tarea"
                    >
                        <Tarea
                    tarea = {tarea}
                    >

                    </Tarea>
                    </CSSTransition>
                ))}
                </TransitionGroup>
            }
        </ul>

        <button
            type = "button"
            className="btn btn-eliminar"
            onClick={onClickEliminar}
        >
            Eliminar Proyecto &times;
        </button>
        </Fragment>
    );
}

export default ListadoTareas;