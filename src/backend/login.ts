import { saveDataOfCloud } from './getData'
import type { GetData } from '../interfaces/API'
import CryptoStorage from '../localstorage/mangerstorage'
interface LoginResponse {
    token: string
    expires: Date
    username: string
    data: GetData
    typeclient:string
}

import { v4 as uuidv4 } from 'uuid';

const URL_BACK = import.meta.env.VITE_URL_BACK

async function Login(email: string, password: string,path :string): Promise<number> {
    try {
        let device = CryptoStorage.consultDeviceID()
        if (device == null || device.length < 3) {
            device = uuidv4()
            CryptoStorage.saveDeviceID(device)
        }


        const response = await fetch(URL_BACK + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, device })
        });
        if (response.status!=200){
            return response.status
        }
        const data: LoginResponse = await response.json();
 
        saveDataOfCloud(data.data)

        localStorage.setItem('Token', data.token)
        localStorage.setItem('TokenExpires', data.expires.toString())
        localStorage.setItem('UserName', data.username)
        CryptoStorage.saveTypeclient(data.typeclient)

        return response.status
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return 500
    }
}
export default Login