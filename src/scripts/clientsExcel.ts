import { loadingExcel } from "./loadingExcel"
import { v4 as uuidv4 } from 'uuid';
import type { clientExcelItem, clientsExcelData } from '../interfaces/excel/clientexcelitem'


async function ReadClientsFromExcel(e: React.ChangeEvent<HTMLInputElement>): Promise<clientsExcelData> {
    try {
        let clientsExcel: clientsExcelData = {
            clients: [],
            clientsincomplete:0,
            issuelastname: 0,
            issueage: 0,
            issuecity: 0,
            issueneighborhood: 0,
            issueaddress: 0,
            issuephone: 0,
            issuedaywork: 0,
            issueCharge: 0
        }
        const clients: string[][] = await loadingExcel(e);
        for (let i = 1; i < clients.length; i++) {
            if (clients[i][0] == undefined) {
                continue
            }
            const client = checkClient(clients[i])
            clientsExcel.clients.push(client)
            if (client.issue.length>=1){
                clientsExcel.clientsincomplete++
            }
        }
        return clientsExcel
    } catch (error) {
        throw error;
    }
}
function checkClient(client: string[]): clientExcelItem {
    let clientExcel: clientExcelItem = {
        client: {
            name: client[0],
            lastname: client[1],
            age: parseInt(client[2]),
            city: client[3],
            neighborhood: client[4],
            address: client[5],
            phone: client[6],
            daywork: client[7],
            clientuuid: uuidv4(),
            cloud: 0,
            createat:new Date(),
            updateat:new Date()
        },
        issue: [],
        amount: parseFloat(client[8])
    }
    console.log(clientExcel.client)
    if (clientExcel.client.lastname == "" || clientExcel.client.lastname == undefined) {
        clientExcel.issue.push("lastname")
        clientExcel.client.lastname = "Null"
    }
    if (clientExcel.client.daywork == "" || clientExcel.client.daywork == undefined) {
        clientExcel.issue.push("daywork")
        clientExcel.client.daywork = "Lunes"
    }
    if (clientExcel.client.neighborhood == "" || clientExcel.client.neighborhood == undefined) {
        clientExcel.issue.push("neighborhood")
        clientExcel.client.neighborhood = "Null"
    }
    if (clientExcel.client.city == "" || clientExcel.client.city == undefined) {
        clientExcel.issue.push("city")
        clientExcel.client.city = "Null"
    }
    if (clientExcel.client.address == "" || clientExcel.client.address == undefined) {
        clientExcel.issue.push("address")
        clientExcel.client.address = "Null"
    }
    if (clientExcel.client.age < 5 || clientExcel.client.age == undefined||isNaN(clientExcel.client.age)) {
        clientExcel.issue.push("age")
        clientExcel.client.age = 25
    }
    if (clientExcel.amount < 1 || clientExcel.amount == undefined) {
        clientExcel.issue.push("amount")
        clientExcel.amount = 0
    }
    if (clientExcel.client.phone.length < 10 || clientExcel.client.phone == undefined) {
        clientExcel.issue.push("age")
        clientExcel.client.phone="Null"
    }

    return clientExcel
}
export { ReadClientsFromExcel };

