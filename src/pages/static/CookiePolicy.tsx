import React from 'react';

const CookiePolicy: React.FC = () => {
    return (
        <div className='ClearForm'>

            <h1>Política de Cookies</h1>
            <p>Última actualización: 17 de Mayo del 2024</p>
            <p>
                En Gluzie (en adelante, "nosotros" o "nuestro"), utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico de nuestro sitio y personalizar la publicidad que mostramos. Esta política de cookies explica qué son las cookies, cómo las usamos y cómo puedes gestionar tus preferencias.
            </p>
            <h2>¿Qué son las cookies?</h2>
            <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tableta, smartphone, etc.) cuando visitas un sitio web. Permiten que el sitio web reconozca tu dispositivo y recuerde cierta información sobre tu visita, como tus preferencias y acciones previas.
            </p>
            <h2>Tipos de cookies que utilizamos</h2>
            <h3>1. Cookies necesarias</h3>
            <p>
                Estas cookies son esenciales para que el sitio web funcione correctamente. No almacenan ninguna información de identificación personal y generalmente se configuran en respuesta a acciones realizadas por ti, como iniciar sesión o rellenar formularios.
            </p>
            <p><strong>Ejemplo:</strong> Cookie de sesión para mantenerte conectado durante tu visita.</p>
            <h3>2. Cookies de preferencias</h3>
            <p>
                Permiten que el sitio web recuerde información que cambia la forma en que el sitio se comporta o se ve, como tu idioma preferido o la región en la que te encuentras.
            </p>
            <p><strong>Ejemplo:</strong> Almacenamiento local de tu nombre de usuario.</p>
            <h3>3. Cookies de estadísticas</h3>
            <p>
                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando y reportando información de forma anónima.
            </p>
            <p><strong>Ejemplo:</strong> Google Analytics.</p>
            <h3>4. Cookies de marketing</h3>
            <p>
                Se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.
            </p>
            <p><strong>Ejemplo:</strong> Google AdSense.</p>
            <h2>Cookies específicas que usamos</h2>
            <p>
                <strong>refresh_token</strong>: Esta cookie es proporcionada por nuestro servicio de respaldo de datos y se utiliza para mantener tu sesión iniciada. Tiene una duración de 30 días.
            </p>
            <p><strong>Duración:</strong> 30 días</p>
            <p><strong>Proveedor:</strong> Gluzie</p>
            <h2>Cookies específicas de terceros</h2>
            <p>
                <strong>Google AdSense</strong>: Utilizamos Google AdSense para mostrar publicidad en nuestro sitio web. Google AdSense puede utilizar cookies para mostrar anuncios más relevantes para ti. Para obtener más información sobre cómo Google utiliza tus datos, puedes visitar la <a href="https://policies.google.com/privacy">Política de Privacidad de Google</a>.
            </p>
            <h2>Gestión de cookies</h2>
            <p>
                Puedes controlar y/o eliminar cookies como desees. Puedes eliminar todas las cookies que ya están en tu ordenador y configurar la mayoría de los navegadores para que impidan su instalación. Sin embargo, si lo haces, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
            </p>
            <p>
                <strong>Gestionar las cookies en tu navegador</strong>:
            </p>
            <ul>
                <li><a href="https://support.google.com/chrome/answer/95647?hl=es">Enlace a la página de configuración de cookies de Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-">Enlace a la página de configuración de cookies de Firefox</a></li>
                <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies">Enlace a la página de configuración de cookies de Internet Explorer</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac">Enlace a la página de configuración de cookies de Safari</a></li>
            </ul>
            <h2>Contacto</h2>
            <p>
                Si tienes alguna pregunta o necesitas soporte, puedes contactarnos en <a href="mailto:soporte.gluzie@gmail.com">soporte.gluzie@gmail.com</a>.
            </p>
        </div>
    );
};

export default CookiePolicy;
