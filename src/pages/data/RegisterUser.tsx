import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptTerms(e.target.checked);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert('You must accept the terms and conditions');
            return;
        }
        const status = await registerUserPost(user)
        if (status >= 200 && status <= 299) {
            navigate('/login');
        }
        console.log(user);
    };

    return (
        <form onSubmit={handleSubmit} className='ClearForm'>
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
                    Correo Electronico:
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
                    Constraseña:
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
                    Numero de Telefono:
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
                <label>
                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={handleCheckboxChange}
                    />
                    Accept Terms and Conditions
                </label>
            </div>
            <div>
                <button type="submit">Registrarce</button>
            </div>
        </form>
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
            alert("problema inesperado")
        }
        return response.status
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return 500
    }
}

