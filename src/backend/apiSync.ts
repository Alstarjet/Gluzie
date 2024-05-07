import type { DataOffCloud } from '../interfaces/API'
const URL_BACK = import.meta.env.VITE_URL_BACK

async function postNewData(DataOffCloud:DataOffCloud):Promise<number> {
    try {
        let Token = localStorage.getItem('Token')
        const response = await fetch(URL_BACK+"/UploadData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}` // Agregar el token JWT al encabezado Authorization
            },
            body: JSON.stringify(DataOffCloud)
        });
        return response.status
    } catch (error) {
        console.error('Error al enviar informacion', error);
        return 600
    }
}


export  {postNewData};