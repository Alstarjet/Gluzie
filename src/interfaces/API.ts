import type { client } from './client'
import type { payment } from './payment'
import type { charge } from './catalog'

interface DataOffCloud {
    clients: client[]
    payments: payment[]
    charges:charge[]
    orders:charge[]
    deviceid:string
}
interface GetData{
    clients: client[]|null
    payments: payment[]|null
    charges:charge[]|null
    orders:charge[]|null
}
export type { DataOffCloud,GetData }