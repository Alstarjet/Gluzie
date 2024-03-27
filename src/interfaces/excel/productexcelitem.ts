import type { productInventoryItem } from '../catalog'

interface productExcelItem{
    product:productInventoryItem,
    issue:string[]
}
interface productsExcelData{
    products:productExcelItem[],
    productsincomplete:number,
    issuename: number,
    issuekey: number,
    issueprice: number,
    issuetype: number,
    issuestock: number,
}
export type {productExcelItem,productsExcelData}
