import React, { useEffect, useState } from 'react';
import Login from '../../backend/login'
import { Link, useNavigate } from 'react-router-dom';
function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [force, setForce] = useState<boolean>(false);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    useEffect(()=>{
        const emailL=localStorage.getItem("Email")
        if (emailL!=null){
            setEmail(emailL)
        }
    },[])
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let status: number
        if (force) {
            status = await Login(email, password, "/loginForce")
        } else {
            status = await Login(email, password, "/login")
        }

        if (status == 403) {
            alert("Solo Puedes tener un dispositivo a la vez vinculado a tu cuenta")
            setForce(true)
            return
        }
        if (status == 200) {
            navigate('/clients');
        }
    };

    return (
        <div className='ClearForm registerUser'>
            <h2>Iniciar Sesión</h2>
            {force && (
                <div className="alert">
                    <p>El inicio de sesión forzado desvinculará las sesiones en otros dispositivos.</p>
                    <p>Te recomendamos cerrar sesión en otros dispositivos antes de continuar para evitar la pérdida de datos no respaldados.</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    /></label>
                </div>
                <div>
                    <label htmlFor="password">Contraseña:
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    /></label>
                </div>
                <button type="submit" className={force ? 'btn_alert' : ''}>
                    {force ? 'Inicio Forzado' : 'Iniciar Sesión'}
                </button>
                <p>¿No tienes cuenta?,<Link to='/register'> <u>registrate aqui</u></Link>
                    </p>
            </form>
        </div>
    );
};

export default LoginPage;

