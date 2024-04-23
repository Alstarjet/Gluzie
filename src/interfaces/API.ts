import type { client } from './client'
import type { payment } from './payment'
import type { charge } from './catalog'
import type { productInventoryItem } from './catalog'

interface DataOffCloud {
    clients: client[]
    payments: payment[]
    charges:charge[]
    products:productInventoryItem[]
    orders:charge[]
    deviceid:string
}
interface GetData{
    clients: client[]|null
    payments: payment[]|null
    charges:charge[]|null
    products:productInventoryItem[]|null
    orders:charge[]|null
}
export type { DataOffCloud,GetData }