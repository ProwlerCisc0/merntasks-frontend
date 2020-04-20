import React,{useState, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {Animated} from "react-animated-css";
import AlertaContext from '../../context/validacion/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';



const Login = (props) =>{

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta , mostrarAlerta} = alertaContext;

    //Extraer valores del context auth
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

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
        email:'',
        password:''
    });

    //Extraer de Usuario
    const {email, password} = usuario;
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
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'aleta alerta-error');
            return;
        }
        //Pasarlo al action
        iniciarSesion({email, password});
    }

    return(
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <div className="form-usuario">
        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) :null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <i className="fas fa-user login-icons"></i>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email<i className="fas fa-at"></i></label>
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
                        <label htmlFor="password">Password <i className="fas fa-lock"></i></label>
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
                        <input type="submit" className=" btn btn-primario- btn-block"
                        value="Iniciar Sesión"
                        >
                        
                        
                        </input>
                    </div>

                </form>

                <Link to={'/register'} className="enlace-cuenta">
                    Registrate uwu
                </Link>

            </div>
        </div>

        </Animated>
    );
}

export default Login;