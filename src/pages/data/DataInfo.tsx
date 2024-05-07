import React, { useState, useEffect } from 'react';
import Login from '../../backend/login'
//import { postData } from '../../backend/postData'
import {getData} from '../../backend/getData'


function DataInfo() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<string>('login')
    const [name, setName] = useState<string>('');
    useEffect(() => {
        const Token = localStorage.getItem('Token')
        if (Token != null && Token?.length > 3) {
            setStatus("menue")
            const Hello = localStorage.getItem('Hello')
            if (Hello!=null){
                setName(Hello)
            }
        }
    }, [])

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
            setStatus('login')
            alert("Email o Contraseña Incorrectos")
        }
    };
    /*async function PostData() {
        let a = await postData()
        if (!a) {
            setStatus("login")
        }
    }*/
    async function GetData() {
        let a = await getData()
        if (!a) {
            setStatus("login")
        }
    }
    return (
        <div className='pageUse'>
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
                <button onClick={GetData}>Optener Datos</button>
            </div>}

        </div>

    );
};

export default DataInfo;
