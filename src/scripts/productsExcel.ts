import { loadingExcel } from "./loadingExcel"
import { v4 as uuidv4 } from 'uuid';
import type { productsExcelData,productExcelItem } from '../interfaces/excel/productexcelitem'


async function ReadProductsFromExcel(e: React.ChangeEvent<HTMLInputElement>): Promise<productsExcelData> {
    try {
        let productsExcel: productsExcelData = {
            products: [],
            productsincomplete:0,
            issuename: 0,
            issuekey: 0,
            issueprice: 0,
            issuestock: 0,
            issuetype: 0,
        }
        const products: string[][] = await loadingExcel(e);
        for (let i = 1; i < products.length; i++) {
            if (products[i][1] == undefined) {
                continue
            }
            const product = checkProduct(products[i])
            productsExcel.products.push(product)
            if (product.issue.length>=1){
                productsExcel.productsincomplete++
            }
        }
        return productsExcel
    } catch (error) {
        throw error;
    }
}
function checkProduct(product: string[]): productExcelItem {
    let productExcel: productExcelItem = {
        product: {
            productuuid:uuidv4(),
            key: product[0],
            name: product[1],
            price: parseFloat(product[2]),
            page: product[3],
            type: product[4],
            catalog: "",
            stock: parseFloat(product[5]),
            cloud:0
        },
        issue: [],
    }
    if (productExcel.product.key == "" || productExcel.product.key == undefined) {
        productExcel.issue.push("key")
        productExcel.product.key = "Null"
    }

    if (productExcel.product.page == "" || productExcel.product.page == undefined) {
        productExcel.issue.push("page")
        productExcel.product.page = "Null"
    }
    if (productExcel.product.type == "" || productExcel.product.type == undefined) {
        productExcel.issue.push("type")
        productExcel.product.type = "Null"
    }
    if (productExcel.product.price < 1 || productExcel.product.price == undefined||isNaN(productExcel.product.price)) {
        productExcel.issue.push("price")
        productExcel.product.price = 25
    }
    if (productExcel.product.stock < 1 || productExcel.product.stock == undefined||isNaN(productExcel.product.stock)) {
        productExcel.issue.push("stock")
        productExcel.product.stock = 1
    }


    return productExcel
}
export { ReadProductsFromExcel };

