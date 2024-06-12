const URL_BACK = import.meta.env.VITE_URL_BACK

async function LogOff(): Promise<number> {
    try {
        let Token = localStorage.getItem('Token')
        const response = await fetch(URL_BACK + "/CloseDevice", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}` // Agregar el token JWT al encabezado Authorization
            },
        });
        if (response.status >= 200 && response.status <= 299) {
            return response.status
        } else {
            return response.status
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return 500
    }
}
export default LogOff