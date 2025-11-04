# Plataforma Educativa - Panel de Docente

Este es el código fuente para el panel de administración de un curso universitario.

## ¿Cómo publicar la página en tu propio dominio (ej. `yeici.com.mx`)?

Puedes publicar este sitio en internet de forma gratuita usando el servicio **Netlify**, que es el estándar de la industria para este tipo de proyectos y se integra perfectamente con GitHub.

### Requisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (se instala con Node.js)
- Un repositorio de GitHub con el código de tu proyecto.
- Un dominio personalizado (como `yeici.com.mx`) ya comprado.

### Pasos para Publicar

1.  **Sube tu código a GitHub:**
    Asegúrate de que la última versión de tu código esté en tu repositorio de GitHub.

2.  **Instalar Dependencias:**
    Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando para descargar React y las herramientas necesarias.

    ```bash
    npm install
    ```

3.  **Crea y Configura tu Cuenta en Netlify:**
    a. Ve a [Netlify.com](https://www.netlify.com/) y regístrate gratis (se recomienda usar tu cuenta de GitHub).
    b. En tu panel, haz clic en **"Add new site" -> "Import an existing project"**.
    c. Elige **"Deploy with GitHub"** y selecciona el repositorio de tu proyecto.

4.  **Configura los Ajustes de Compilación:**
    Netlify te pedirá que confirmes cómo se construye tu sitio. Los ajustes por defecto deberían ser correctos:
    - **Build command:** `npm run build`
    - **Publish directory:** `build`
    
    Haz clic en **"Deploy site"**. Netlify compilará tu proyecto y lo publicará en una URL temporal.

5.  **Conecta tu Dominio Personal:**
    a. Dentro de la configuración de tu sitio en Netlify, ve a la sección **"Domain settings"**.
    b. Haz clic en **"Add a domain"** e introduce tu dominio (ej. `yeici.com.mx`).
    c. Netlify te proporcionará una lista de **"Nameservers"** (servidores de nombres). Se ven como `dns1.p01.nsone.net`.

6.  **Actualiza los Nameservers en tu Proveedor de Dominio:**
    a. Ve a la página web donde compraste tu dominio (GoDaddy, Akky, Neubox, etc.).
    b. Busca la configuración de **DNS** o **"Nameservers"** para tu dominio.
    c. Reemplaza los nameservers existentes con los que te dio Netlify.
    
¡Y eso es todo! Los cambios de DNS pueden tardar unas horas en propagarse. Una vez que lo hagan, tu sitio estará en vivo en tu dominio personal, con un certificado de seguridad `https://` automático.

A partir de ahora, cada vez que subas cambios a GitHub (`git push`), Netlify automáticamente reconstruirá y actualizará tu sitio web.