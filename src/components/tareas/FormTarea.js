import React,{useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const FormTarea = () =>{

        //Extraer si un proyecto está activo
        const proyectosContext = useContext(ProyectoContext);
        const { proyecto } = proyectosContext;

        //Obtener el state de tareas
        const tareaContext = useContext(TareaContext);
        const { tareaseleccionada,
                errortarea,
                agregarTarea,
                validarTarea,
                obtenerTareas,
                actualizarTarea,
                limpiarTarea
             } = tareaContext;
        
        //Effect que detecta si hay una tarea seleccionada para editar
        useEffect(()=>{
            if(tareaseleccionada !==null ){
                guardarTarea(tareaseleccionada)
            }
            else{
                guardarTarea({
                    nombre: ''
                })
            }
        },[tareaseleccionada]);

        //State del formulario
        const [tarea, guardarTarea] = useState({
            nombre:''
        })

        //Extraer el nombre del proyecto
        const{ nombre } = tarea;

        //Leer los valores
        const handleChange = e =>{
            guardarTarea({
                ...tarea,
                [e.target.name] : e.target.value
            })
        }

        if(!proyecto) return null;

        
        const [proyectoActual] = proyecto;
    
        const onSubmit = e =>{
            e.preventDefault();

            //validar
            if(nombre.trim() === ''){
                validarTarea();
                return;
            }
            
            if(tareaseleccionada === null){
                //agregar la nueva tarea al state
                tarea.proyecto=proyectoActual._id;
                agregarTarea(tarea);
            }
            else{
                //Actualiza
                actualizarTarea(tarea);
                limpiarTarea();
            }
             
            //Obtener y filtrar las tareas del proyecto actual
            obtenerTareas(proyectoActual._id);
            
            //reiniciar el form
            guardarTarea({
                nombre:''
            })
        }
        return(
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    >
                    
                    </input>
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    >
                    </input>
                </div>    
            </form>
            {errortarea ?<p className="mensaje error">El nombre de la tarea es obligatorio</p> :null}
        </div>
    );
}

export default FormTarea;
