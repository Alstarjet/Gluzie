import formatDate from '../../scripts/formatDate'
import type AmoutInfo from '../../interfaces/utilities/AmoutInfo';
import { MdExpandMore } from "react-icons/md";
import { useState } from 'react';

interface PaymentAmout {
    AmoutInfo: AmoutInfo
}

function PaymentSummary({ AmoutInfo }: PaymentAmout) {
    const [more,setMore]=useState<string>("")
    const changeMore=()=>{
        console.log("TRY")
        if (more==""){
            setMore("show")
        }else{
            setMore("")
        }
    }
    if (AmoutInfo.payment != undefined) {
        return (
            <div className='IteamSummary PaymentIteam'>
                <div className='resume' onClick={changeMore}>
                    <div> {AmoutInfo.payment.createat.getDate() + "/" + (AmoutInfo.payment.createat.getMonth()+1) + "/" + AmoutInfo.payment.createat.getFullYear()}</div>
                    <div>${(AmoutInfo.previus).toFixed(2)}</div>
                    <div className='Today'>-   ${AmoutInfo.payment.amount}</div>
                    <div className='simpleFlex'>= ${(AmoutInfo.previus-AmoutInfo.payment.amount).toFixed(2)} <MdExpandMore className={'MoreData'+more}></MdExpandMore></div>
                </div>
                <div className={'moredata '+more}>
                    <h4>Pago por la Cantidad: ${AmoutInfo.payment?.amount}</h4>
                    <div>{formatDate(AmoutInfo.payment?.createat)}</div>
                    <h4>Metodo:{AmoutInfo.payment.method}</h4>
                    <div>Concepto:{AmoutInfo.payment.concept}</div>
                </div>
            </div>
        )
    }

}
export default PaymentSummary;