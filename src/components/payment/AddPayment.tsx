import  { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { paymentsDB } from "../../database/paymentsDBController";
import type { client } from '../../interfaces/client'
import type { payment } from '../../interfaces/payment'


interface ClientComponents {
    DataClient:client,
  }

function AddPayment({DataClient}:ClientComponents) {
    const [payment, setPayment] = useState<payment>({
        clientuuid: DataClient.uuid,
        clientname: DataClient.name+" "+DataClient.lastname,
        uuid: uuidv4(),
        amount: 0,
        method: 'Efectivo',
        concept: '',
        createat: new Date(),
        updateat:new Date(),
        cloud:0,
        status:"active"
    });
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name=="amount"){
            var valueF=parseFloat(value)
            setPayment((prevState) => ({ ...prevState, [name]: valueF }));
        }else{
            setPayment((prevState) => ({ ...prevState, [name]: value }));

        }
    };
    const handleNewPayment = () => {
        let newPayment=payment
        if (newPayment.amount < 1|| isNaN(newPayment.amount)) {
            alert("Necesitas Agregar una cantida");
            return
        }
        if (newPayment.concept == "") {
            newPayment.concept="Pago de deuda"
        }
        paymentsDB.addPayment(payment)
        setPayment({
            clientuuid: DataClient.uuid,
            clientname: DataClient.name+" "+DataClient.lastname,
            uuid: uuidv4(),
            amount: 0,
            method: 'Efectivo',
            concept: '',
            createat: new Date(),
            updateat:new Date(),
            cloud:0,
            status:"active"
        })
      };
    return (
        <div key={DataClient.uuid} className='viewFull'>
            
                <h2>Nuevo Pago</h2>
                
                    <label>
                        <p>Pago $:</p>
                        <input type="number" name="amount" value={payment.amount} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        <p>Metodo:</p>
                        <select name="method" value={payment.method} onChange={handleChange}>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        <p>Concepto:</p>
                        <input type="text" name="concept" value={payment.concept} onChange={handleChange} />
                    </label>
                    <br />
                    <button className="saveButton" onClick={handleNewPayment}>Guardar Pago</button>
                
            
        </div>
    )
}
export default AddPayment;