# Plataforma Educativa - Panel de Docente

Este es el código fuente para el panel de administración de un curso universitario.

## ¿Cómo publicar la página en un subdirectorio (ej. `yeici.com.mx/alumnos`)?

El proceso consiste en "compilar" el proyecto y luego subir la carpeta resultante a tu servidor de cPanel.

### Requisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (se instala con Node.js)
- Acceso a tu cPanel.

### Pasos para Publicar

1.  **Instalar Dependencias (Solo la primera vez):**
    Abre una terminal en esta carpeta y ejecuta:
    ```bash
    npm install
    ```

2.  **Compilar el Proyecto:**
    En la misma terminal, ejecuta el siguiente comando. Esto creará una carpeta `build` completa y lista para publicar.
    ```bash
    npm run build
    ```

3.  **Subir los Archivos a cPanel:**
    a. Inicia sesión en tu cPanel y abre el **"Administrador de Archivos"** (`File Manager`).
    b. Navega a la carpeta raíz de tu dominio, que usualmente es **`public_html`**.
    c. Dentro de `public_html`, crea una **Nueva Carpeta** y llámala `alumnos`.
    d. Abre esta nueva carpeta `alumnos`.
    e. Sube el **contenido** de la carpeta `build` que generaste en el paso anterior a esta carpeta `alumnos`.

4.  **Configurar el `.htaccess` DENTRO de `/alumnos` (¡Paso Crucial!):**
    a. Dentro de tu carpeta `alumnos` en cPanel, crea un nuevo archivo llamado `.htaccess`.
    b. Edita este archivo y pega el siguiente contenido. Nota que `RewriteBase` apunta a `/alumnos/`.
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

6.  **¡Listo!**
    Visita `https://yeici.com.mx/alumnos`. La página debería cargar y funcionar correctamente.