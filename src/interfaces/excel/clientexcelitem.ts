import type { client } from '../client'

interface clientExcelItem{
    client:client,
    amount:number,
    issue:string[]
}
interface clientsExcelData{
    clients:clientExcelItem[],
    clientsincomplete:number,
    issuelastname: number,
    issueage: number,
    issuecity: number,
    issueneighborhood: number,
    issueaddress: number,
    issuephone: number,
    issuedaywork: number,
    issueCharge:number
}
export type {clientExcelItem,clientsExcelData}
