function searchLever(input: string, target: string): number|null {
    const SinAcentos = target
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/Y/g, "I"); // Cambiar Y por I
    const upperCase = SinAcentos.toUpperCase();

    // Aplicar las mismas transformaciones a letras
    let letras = input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/Y/g, "I") // Cambiar Y por I
        .toUpperCase();

    // Separar letras en dos palabras si contiene un espacio
    const letrasArray = letras.split(" ");
    // Prioridad 1: Coincidencia exacta y consecutiva al inicio
    if (upperCase.startsWith(letrasArray[0])) {
        console.log("1"+letras +" compare "+upperCase)
        if (upperCase.includes(letrasArray[1])) {
            return 1;
        } else {
            console.log("3"+letras +" compare "+upperCase)

            return 3;
        }
    }

    // Prioridad 2: Coincidencia exacta y consecutiva en cualquier parte
    if (upperCase.includes(letrasArray[0])) {
        console.log(letrasArray)
        if (upperCase.includes(letrasArray[1])) {
            console.log("2"+letras +" compare "+upperCase)

            return 2;
        } else {
            console.log("4"+letras +" compare "+upperCase)

            return 4;
        }
    }

    // Prioridad 3: Coincidencia no consecutiva en cualquier parte
    const regex = new RegExp(letras.split('').join('.*'), 'i');
    if (regex.test(upperCase)) {
        console.log("5"+letras +" compare "+upperCase)
        return 5;
    }
    return null
}
export default searchLever;