# Plataforma Educativa - Panel de Docente

Este es el código fuente para el panel de administración de un curso universitario. El proyecto está configurado para usar **Vite** como herramienta de compilación.

## ¿Cómo publicar la página en un subdirectorio (ej. `yeici.com.mx/alumnos`)?

El proceso consiste en "compilar" el proyecto con Vite y luego subir la carpeta resultante a tu servidor de cPanel.

### Requisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (se instala con Node.js)
- Acceso a tu cPanel.

### Pasos para Publicar

1.  **Instalar Dependencias (Solo la primera vez):**
    Abre una terminal en la raíz de esta carpeta y ejecuta:
    ```bash
    npm install
    ```

2.  **Compilar el Proyecto con Vite:**
    En la misma terminal, ejecuta el siguiente comando. Esto creará una carpeta `dist` (distribución) completa y optimizada para producción.
    ```bash
    npm run build
    ```

3.  **Subir los Archivos a cPanel:**
    a. Inicia sesión en tu cPanel y abre el **"Administrador de Archivos"** (`File Manager`).
    b. Navega a la carpeta raíz de tu dominio, que usualmente es **`public_html`**.
    c. Dentro de `public_html`, crea una **Nueva Carpeta** y llámala `alumnos`.
    d. Abre esta nueva carpeta `alumnos`.
    e. Sube el **contenido** de la carpeta `dist` (generada en el paso 2) a esta carpeta `alumnos`.

4.  **Configurar el `.htaccess` DENTRO de `/alumnos` (¡Paso Crucial!):**
    a. Dentro de tu carpeta `alumnos` en cPanel, crea un nuevo archivo llamado `.htaccess`. Si no tienes este archivo en tu proyecto, puedes crearlo.
    b. Edita este archivo y pega el siguiente contenido. Esto es necesario para que el enrutamiento de React funcione correctamente.
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /alumnos/
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /alumnos/index.html [L]
    </IfModule>
    ```

5.  **¡Listo!**
    Visita `https://yeici.com.mx/alumnos`. La página debería cargar y funcionar correctamente.
