interface LoginResponse{
    token:string
    hello:string
}
interface LoginReturn{
    ok:boolean
    hello:string
}
import { v4 as uuidv4 } from 'uuid';

const URL_BACK = import.meta.env.VITE_URL_BACK

async function Login(email:string, password:string):Promise<LoginReturn> {
    let ret:LoginReturn={
        ok:true,
        hello:"Error"
    }
    try {
        let device = localStorage.getItem('Device')
        if (device==null||device.length<3){
            device=uuidv4()
            localStorage.setItem('Device', device);
        }

        const response = await fetch(URL_BACK+"/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password,device })
        });
        
        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        const data:LoginResponse = await response.json();
        localStorage.setItem('Token', data.token);
        ret.hello=data.hello
        return ret
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        ret.ok=false
        return ret
    }
}
export default Login