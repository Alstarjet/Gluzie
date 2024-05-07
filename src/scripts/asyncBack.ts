import { ConsutDataOffCloud, UpdateOffCloud } from '../database/advanced/dataOffCloud'
import { postNewData } from '../backend/apiSync'
function asyncBack() {
    syncFunc()
    setInterval(syncFunc, 40000)
}

async function syncFunc() {
    
    let BackDate = localStorage.getItem('BackDate')
    let LastDate: Date
    if (BackDate == null || BackDate == "") {
        console.log("hora no detectada")
        localStorage.setItem('BackDate', (new Date).toString())
        return
    } else {
        LastDate = new Date(BackDate)
    }
    const currentDate = new Date
    const difMS: number = Math.abs(currentDate.getTime() - LastDate.getTime());
    console.log("diferencia de tiempo" + difMS)
    if (difMS > 3600000) {
        console.log("hora de sincronizar")
        try {
            const LocalData = await ConsutDataOffCloud()
            if (!LocalData.hasContent) {
                console.log("no hay datos para respaldar")
                return
            }
            const status = await postNewData(LocalData.data)
            if (status > 199 && status < 300) {
                UpdateOffCloud(LocalData.data)
                localStorage.setItem('BackDate', currentDate.toString())
            }else if(status >= 400 && status<=499){
                alert("Para mantener el respaldo automatico inicia secion nuevamente")
                localStorage.setItem('Token', "");
            }else{
                console.log("error al enviar la info")
            }

        } catch (error) {

        }
    }
}
export default asyncBack

