import { ConsutDataOffCloud, UpdateOffCloud } from '../database/advanced/dataOffCloud'
import { postNewData } from '../backend/apiSync'
import getNewJWT from '../backend/getJWT';
import CryptoStorage from '../localstorage/mangerstorage';
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT
let intervalId: NodeJS.Timeout | null = null;

function asyncBack() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    syncFunc()
    if (ENVIRONMENT == "local") {
        intervalId = setInterval(syncFunc, 10000)
    } else {
        intervalId = setInterval(syncFunc, 40000)
    }
}

async function syncFunc() {
    const typeClient=CryptoStorage.consultTypeclient()
    let timeToUp:number
    if(ENVIRONMENT == "local"){
        if (typeClient==""||typeClient=="Quartz"){
            timeToUp=(1000*60)
        }else{
            timeToUp=(1000*30)
        }
    }else{
        if (typeClient==""||typeClient=="Quartz"){
            timeToUp=(1000*60*60*20)
        }else{
            timeToUp=(1000*60*20)
        }
    }
    const BackDate = localStorage.getItem('BackDate')
    let LastDate: Date
    if (BackDate == null || BackDate == "") {
        localStorage.setItem('BackDate', (new Date).toString())
        return
    } else {
        LastDate = new Date(BackDate)
        if (isNaN(LastDate.getTime())) { 
            localStorage.setItem('BackDate', (new Date).toString())
            return
        }
    }
    console.log(LastDate)
    const currentDate = new Date
    const difMS: number = Math.abs(currentDate.getTime() - LastDate.getTime());
    console.log(difMS)
    if (difMS > timeToUp) {
        const status = await InitBackDirect()
        if (status >= 200 && status <= 299) {
        } else {
            console.log(status)
            console.log("Que paso si dio: " + status)
        }
    }
}
async function InitBackDirect(): Promise<number> {
    const currentDate = new Date
    try {
        const LocalData = await ConsutDataOffCloud()
        if (!LocalData.hasContent) {
            console.log("Respaldo no necesario")
            return 200
        }
        let status = await getNewJWT()
        if (status > 300) {
            console.log(status)
            return 500
        }
        status = await postNewData(LocalData.data)
        if (status > 199 && status < 300) {
            UpdateOffCloud(LocalData.data)
            localStorage.setItem('BackDate', currentDate.toString())

        } else if (status >= 400 && status <= 499) {
            localStorage.setItem('Token', "");
        } else {
            console.log("error al enviar la info")
        }
        return status
    } catch (error) {
        console.log(error)
        return 500
    }
}

export { asyncBack, InitBackDirect }

