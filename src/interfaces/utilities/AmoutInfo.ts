import type { payment } from "../payment"
import type { charge } from "../catalog"
interface AmoutInfo {
    payment: payment | undefined
    charge: charge | undefined
    previus: number
    date: Date
    type: string;
}
export default AmoutInfo