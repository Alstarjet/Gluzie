import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeAdSense from '../../adsense/home';
const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <CallToAction />
            <MainSection />
            <FeaturesSection />
            <HomeAdSense></HomeAdSense>
            <Footer />
        </div>
    );
};


const MainSection: React.FC = () => (
    <section className="main-section">
        <p>Con gestión inteligente, metas al alcance</p>

        <h2>¿Qué es Gluzie?</h2>
        <p>
            Gluzie es una aplicación web integral diseñada para ayudar a los pequeños negocios a gestionar sus procesos de cobranza de manera eficiente. Nuestro objetivo es mejorar el flujo de efectivo, optimizar las operaciones financieras y fortalecer las relaciones con los clientes.
        </p>
    </section>
);

const FeaturesSection: React.FC = () => (
    <section className="features-section">
        <h2>Características Principales</h2>
        <div className="features">
            <Feature
                title="Registro de Clientes"
                description="Lleva un control detallado de tus clientes con nuestra herramienta de registro fácil de usar."
            />
            <Feature
                title="Gestión de Pagos y Cargos"
                description="Administra todos los pagos y cargos de manera eficiente desde una única plataforma."
            />
            <Feature
                title="Visualización y Reportes"
                description="Obtén una visualización clara de tus clientes del día"
            />
        </div>
    </section>
);

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="feature">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);


const CallToAction: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        const storedUser = localStorage.getItem('UserName');
        if (token && storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <section className="call-to-action">
            {user ? (
                <div>
                    <h2>Hola, {user}</h2>
                    <Link to="/clients"><button>Iniciar</button></Link>
                </div>

            ) : (
                <>
                    <h2>Empieza a Simplificar tu Gestión Financiera Hoy</h2>
                    <div>
                        <Link to="/login"><button>Iniciar Sesión</button></Link>
                        <Link to="/register"><button>Regístrate Gratis</button></Link>
                    </div>
                </>
            )}
        </section>
    );
};



const Footer: React.FC = () => (
    <footer className="footer">
        <p> Gluzie</p>
    </footer>
);

export default LandingPage;
