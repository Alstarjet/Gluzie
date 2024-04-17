import React, { useState } from 'react';
import ConsutDataOffCloud from '../../backend/postData'
import Login from '../../backend/login'


function DataInfo() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<string>('login')
    const [name, setName] = useState<string>('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await Login(email, password)
        if (response.ok) {
            setStatus('menue')
            setName(response.hello)
        } else {
            alert("Email o Contraseña Incorrectos")
        }
        ConsutDataOffCloud()
    };

    return (
        <div>
            {status == "login" && <form onSubmit={handleSubmit}>
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
                <button type="submit">Iniciar Sesión</button>
            </form>}
            {status == "menue" && <div>
                <h2>Hola {name}</h2>
                <button type="submit">Respaldar Datos</button>
            </div>}
            
        </div>

    );
};

export default DataInfo;
