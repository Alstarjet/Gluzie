const URL_BACK = import.meta.env.VITE_URL_BACK

async function registerUserPost():Promise<boolean> {
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
        if (response.status>=200 && response.status<=299) {
            alert("Los datos se respaldaron con exito")
        } else if (response.status >= 400 && response.status<=499) {
            alert("la sesión caduco, inicia secion optener los datos")
            localStorage.setItem('Token', "");
            return false
        } else{
            alert("problema inesperado")
        }
        return true
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false
    }
}


export  {registerUserPost};