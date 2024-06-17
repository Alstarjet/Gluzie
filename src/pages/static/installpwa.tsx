import React from 'react';
import { useEffect, useState } from "react";
import { MdInstallMobile } from "react-icons/md";
import { useLocation } from 'react-router-dom';

import './installpwa.css'

const Installpwa: React.FC = () => {
    const location = useLocation();
    const [beforeI, setBeforI] = useState<any>("")
    const [classCss, setClassCss] = useState<string>("noDiplay")
    
    useEffect(() => {
        console.log(location.pathname)
        const handler = (e: any) => {
            e.preventDefault();
            setBeforI(e)
            if(location.pathname=='/privacypolicy'||location.pathname=='/termsandconditions'||location.pathname=='/cookiepolicy'){

            }else{
                setClassCss("")
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);
    const installp = () => {
        console.log(beforeI)
        beforeI.prompt()
        setClassCss("noDiplay")
    }

    return (
        <div className={"installPWA " + classCss}>
            <div className='installPWATexIco'>
                <MdInstallMobile className=''/>
                <p>Agrega nuestra aplicación a tu pantalla de inicio para una experiencia más rápida y conveniente.</p>
            </div>
            
            <div>
                <button onClick={()=>{setClassCss("noDiplay")}} className='AhoraNO'>Ahora no</button>
                <button onClick={installp} className='Install'>Instalar</button>
            </div>
        </div>
    );
};

export default Installpwa;
