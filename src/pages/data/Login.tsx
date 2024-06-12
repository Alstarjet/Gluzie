import React, { useState } from 'react';
import Login from '../../backend/login'
import { useNavigate } from 'react-router-dom';

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
            navigate('/');
        }
    };

    return (
        <div className='ClearForm'>
            <h1>Iniciar Sesión</h1>
            {force && (
                <div className="alert">
                    <p>El inicio de sesión forzado desvinculará las sesiones en otros dispositivos.</p>
                    <p>Te recomendamos cerrar sesión en otros dispositivos antes de continuar para evitar la pérdida de datos no respaldados.</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" className={force ? 'btn_alert' : ''}>
                    {force ? 'Inicio Forzado' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;

