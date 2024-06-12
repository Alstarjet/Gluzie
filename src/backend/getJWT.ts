

import type { GetData } from '../interfaces/API'
import CryptoStorage from '../localstorage/mangerstorage'
const URL_BACK = import.meta.env.VITE_URL_BACK
interface LoginResponse {
    token: string
    expires: Date
    username: string
    data: GetData
    typeclient: string
}
async function getNewJWT(): Promise<number> {
    const expiresJWT = localStorage.getItem('TokenExpires');
    if (expiresJWT) {
        const expiresDate = new Date(expiresJWT);
        if (expiresDate > new Date()) {
            return 200
        }
    }
    try {
        const response = await fetch(URL_BACK + "/GetJwt", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status >= 200 && response.status <= 299) {
            const data: LoginResponse = await response.json();
            localStorage.setItem('Token', data.token);
            localStorage.setItem('TokenExpires', data.expires.toString())
            localStorage.setItem('UserName', data.username)
            CryptoStorage.saveTypeclient(data.typeclient)
            return response.status
        } else if (response.status >= 400 && response.status <= 499) {
            alert("Tu sesión ha caducado")
            localStorage.setItem('Token', "");
            return response.status
        }
        return response.status
    } catch (error) {
        console.error('Error al Actualizar token', error);
        return 500
    }

}

export default getNewJWT;