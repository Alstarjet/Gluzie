import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUser.css'
interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: number;
}

const RegisterUser: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        phone: 0,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'phone') {
            setUser({
                ...user,
                [name]: parseInt(value),
            });
        } else {
            setUser({
                ...user,
                [name]: value,
            });
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const status = await registerUserPost(user)
        if (status >= 200 && status <= 299) {
            navigate('/login');
        }
        console.log(user);
    };
    const goBack = () => {
        window.history.back();
    };
    return (<div className='ClearForm registerUser'>
                    <div className='HeadFormsBack'>
                <button onClick={goBack}>Atras</button>
                <h2>Registro de Usuario</h2>
            </div>
        <form onSubmit={handleSubmit} className=''>
            <div>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </label>

            </div>
            <div>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        autoComplete='off'
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        autoComplete='off'
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    N.Telefono:
                    <input
                        type="number"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <p>
                    Al registrarte y hacer uso de nuestra aplicación, aceptas nuestros <a href="/termsandconditions" target="_blank">Términos y Condiciones</a>, <a href="/cookiepolicy" target="_blank">Politica de Cookies</a> y <a href="/privacypolicy" target="_blank">Política de Privacidad</a>.
                </p>
            </div>

            <div>
                <button type="submit">Registrarce</button>
            </div>
        </form>
        </div>
    );
};

export default RegisterUser;

const URL_BACK = import.meta.env.VITE_URL_BACK

async function registerUserPost(user: User): Promise<number> {
    try {
        const response = await fetch(URL_BACK + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        if (response.status >= 200 && response.status <= 299) {
            alert("Te has registado exitosamente")
        } else if (response.status >= 400 && response.status <= 499) {
            alert(await response.text())
            return response.status
        } else {
            alert("Problema inesperado, intentalo mas tarde")
        }
        return response.status
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return 500
    }
}

