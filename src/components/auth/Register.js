import React,{useState, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {Animated} from "react-animated-css";
import AlertaContext from '../../context/validacion/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Register = (props) =>{

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta , mostrarAlerta} = alertaContext;

    //Extraer valores del context auth
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;
    
    //Encaso de autenticado o duplicado
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');

        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);

        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])
    
    //Definir el state para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    //Extraer de Usuario
    const {nombre, email, password, confirmar} = usuario;
    const onChange = e =>{
        // Con esto se guarda en el state
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e =>{
        e.preventDefault();

        //Validar que no hayan campos vacios
        if(nombre === '' || password === '' || email === '' || confirmar === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Password mínimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('La contraseña debe de ser mínimo de 6 caracteres', 'alerta-error');
            return;
        }
        //Revisar 2 passwords
        if(password !== confirmar){
            mostrarAlerta('Las contraseñas no son iguales', 'alerta-error')
            return;
        }
        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return(
        <Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
        <div className="form-usuario">
    {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null }
            <div className="contenedor-form sombra-dark">
                <h1>Registra tus datos</h1>
                <i className="login-icons far fa-id-badge"></i>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre<i className="fas fa-user-tag"></i></label>
                        <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        placeholder="Tu nombre"
                        onChange={onChange}
                        >
                        </input>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Correo<i className="fas fa-at"></i></label>
                        <input 
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Tu email"
                        onChange={onChange}
                        >
                        </input>
                    </div>
                    
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña <i className="fas fa-lock"></i></label>
                        <input 
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        placeholder="Tu password"
                        onChange={onChange}
                        >
                        </input>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Repetir contraseña <i className="fas fa-user-shield"></i></label>
                        <input 
                        type="password"
                        id="confirmar"
                        value={confirmar}
                        name="confirmar"
                        placeholder="Repite tu contraseña"
                        onChange={onChange}
                        >
                        </input>
                    </div>

                    <div className="campo-form">
                        <input type="submit" className=" btn btn-primario- btn-block"
                        value="Guardar"
                        >
                        
                        
                        </input>
                    </div>

                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver uwu
                </Link>

            </div>
        </div>
        </Animated>
    );
}

export default Register;