import { AES,enc } from 'crypto-ts';

// Asumiendo que secretKey se obtiene de variables de entorno de Vite
const secretKey = import.meta.env.VITE_KEY_SECRET;


function saveTypeclient(typeclient: string): void {
    // Encriptamos el JSON
    const encryptedData = AES.encrypt(typeclient, secretKey).toString();
    // Guardamos en local storage
    localStorage.setItem("Typeclient", encryptedData);
}

function consultTypeclient(): string {
    // Obtenemos el item del local storage
    const encryptedData = localStorage.getItem("Typeclient");
    if (!encryptedData) {
        return "";
    }
    try {
        const bytes = AES.decrypt(encryptedData, secretKey);
        var typeclient = bytes.toString(enc.Utf8);
        return typeclient
    } catch (e) {
        console.error("Error al desencriptar", e);
        return "";
    }
}
function saveDeviceID(DeviceID: string): void {
    // Serializamos el objeto a JSON
    // Encriptamos el JSON
    const encryptedData = AES.encrypt(DeviceID, secretKey).toString();
    // Guardamos en local storage
    localStorage.setItem("DeviceID", encryptedData);
}

function consultDeviceID(): string {
    // Obtenemos el item del local storage
    const encryptedData = localStorage.getItem("DeviceID");
    if (!encryptedData) {
        return "";
    }
    try {
        const bytes = AES.decrypt(encryptedData, secretKey);
        var typeclient = bytes.toString(enc.Utf8);
        return typeclient
    } catch (e) {
        console.error("Error al desencriptar", e);
        return "";
    }
}
const CryptoStorage={
    consultTypeclient,
    saveTypeclient,
    saveDeviceID,
    consultDeviceID
}
export default CryptoStorage
