async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        // Aquí puedes hacer algo con los datos obtenidos
        console.log(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}