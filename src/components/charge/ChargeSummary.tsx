import formatDate from '../../scripts/formatDate'
import type AmoutInfo from '../../interfaces/utilities/AmoutInfo';
import { MdExpandMore } from "react-icons/md";
import { useEffect, useState } from 'react';

interface ChargeAmout {
    AmoutInfo: AmoutInfo
}


function ChargeSummary({ AmoutInfo }: ChargeAmout) {
    const [more, setMore] = useState<string>("")
    const [count, setCout] = useState<number>(0)
    const changeMore = () => {
        console.log("TRY")
        if (more == "") {
            setMore("show")
        } else {
            setMore("")
        }
    }
    let StringProduct: string = ""
    useEffect(() => {
        let num:number=0
        if (AmoutInfo.charge != undefined) {
            AmoutInfo.charge.products.forEach((iteam)=>{
                num=num+iteam.quantity
            })
            setCout(num)
        }

    })
    if (AmoutInfo.charge != undefined) {
        AmoutInfo.charge.products.forEach((a) => {
            StringProduct = StringProduct + ", " + a.name + "(" + a.quantity + ")"
        })
        return (
            <div className='IteamSummary ChargeIteam'>
                <div className='resume' onClick={changeMore}>
                    <div> {AmoutInfo.charge.createat.getDate() + "/" + (AmoutInfo.charge.createat.getMonth()+1) + "/" + AmoutInfo.charge.createat.getFullYear()}</div>
                    <div>${(AmoutInfo.previus).toFixed(2)}</div>
                    <div className='Today'>+ ${AmoutInfo.charge.finalprice}</div>
                    <div className='simpleFlex'>= ${(AmoutInfo.previus + AmoutInfo.charge.finalprice).toFixed(2)} <MdExpandMore className='MoreData'></MdExpandMore></div>
                </div>
                <div className={'moredata ' + more} >
                    <h4 className='simpleFlex'>Cargo por la Cantidad: ${AmoutInfo.charge.finalprice}</h4>
                    <div className='simpleFlex'>{formatDate(AmoutInfo.charge.createat)}</div>
                    <h4 className='simpleFlex'>Total Productos: {count}; Productos Distintos: {AmoutInfo.charge.products.length}</h4>
                    <div className='productsShow'>
                        {AmoutInfo.charge.products.map((item) => (<div>{item.quantity}pz;{item.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='IteamSummary ChargeIteam'>
            ChectData
        </div>
    )
}
export default ChargeSummary;