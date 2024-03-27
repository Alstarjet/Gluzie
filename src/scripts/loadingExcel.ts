import * as XLSX from 'xlsx';

function loadingExcel(e:React.ChangeEvent<HTMLInputElement>): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            if (e.target.files){
                const file = e.target.files[0];

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = event.target?.result;
    
                        // Parsea el archivo Excel
                        const workbook = XLSX.read(data, { type: 'binary' });
    
                        // Accede a la primera hoja del libro de trabajo
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
    
                        // Convierte los datos a formato JSON
                        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
                        resolve(excelData); // Resuelve la promesa con los datos de Excel
                    } catch (error) {
                        reject("Error al procesar el archivo Excel: " + error); // Rechaza la promesa si hay un error
                    }
                };
    
                reader.readAsBinaryString(file);
            }else{
                reject("Error al cargar el archivo"); // Rechaza la promesa si hay un error

            }
            
        } catch (error) {
            reject("Error al cargar el archivo: " + error); // Rechaza la promesa si hay un error
        }
    });
}

export { loadingExcel };
