import * as XLSX from 'xlsx';
import { clientsDB } from '../database/clientsDBController';
import { chargesDB } from '../database/chargesDBController';
import { ordersDB } from '../database/ordersDBController';
import { paymentsDB } from '../database/paymentsDBController';
import type { charge } from '../interfaces/catalog';
import type { client } from '../interfaces/client';
import type { payment } from '../interfaces/payment';
import { saveAs } from 'file-saver';

async function createExcelAllData (){
    console.log("#ASDD")
    const clients=await clientsDB.readClients()
    const charges=await chargesDB.readCharges()
    const orders=await ordersDB.readOrders()
    const payments= await paymentsDB.readPayments()
    exportToExcel(charges,clients,payments,orders)

}



function exportToExcel(charges:charge[], clients:client[], payments:payment[],orders:charge[]) {
    const workbook = XLSX.utils.book_new();
    const chargesFormatted = charges.map(charge => ({
        ...charge,
        products: JSON.stringify(charge.products)
    }));
    const ordersFormatted = orders.map(charge => ({
        ...charge,
        products: JSON.stringify(charge.products)
    }));
    // Convertir cada array a una hoja de trabajo de Excel
    const chargesSheet = XLSX.utils.json_to_sheet(chargesFormatted);
    const clientsSheet = XLSX.utils.json_to_sheet(clients);
    const paymentsSheet = XLSX.utils.json_to_sheet(payments);
    const ordersSheet = XLSX.utils.json_to_sheet(ordersFormatted);

    // Agregar las hojas de trabajo al libro de Excel
    XLSX.utils.book_append_sheet(workbook, chargesSheet, 'Cargos');
    XLSX.utils.book_append_sheet(workbook, clientsSheet, 'Clientes');
    XLSX.utils.book_append_sheet(workbook, paymentsSheet, 'Pagos');
    XLSX.utils.book_append_sheet(workbook, ordersSheet, 'Pedidos');

    // Generar archivo Excel en formato binario
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Crear un blob del archivo
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, 'data.xlsx');
}

export default createExcelAllData