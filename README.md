# Plataforma Educativa - Panel de Docente

Este es el código fuente para el panel de administración de un curso universitario.

## ¿Cómo publicar la página en un hosting con cPanel (ej. `yeici.com.mx`)?

El proceso consiste en "compilar" el proyecto en tu computadora para generar los archivos web estáticos, y luego subir esos archivos a tu servidor a través del panel de control de cPanel.

### Requisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (se instala con Node.js)
- Acceso a tu cPanel.

### Pasos para Publicar

1.  **Instalar Dependencias:**
    Si es la primera vez que configuras el proyecto, abre una terminal en esta carpeta y ejecuta:
    ```bash
    npm install
    ```

2.  **Compilar el Proyecto (Crear la Versión Publicable):**
    En la misma terminal, ejecuta el siguiente comando. Esto creará una nueva carpeta llamada `build` que contiene tu sitio web listo para ser publicado.
    ```bash
    npm run build
    ```

3.  **Subir los Archivos a cPanel:**
    a. Inicia sesión en tu cPanel y abre el **"Administrador de Archivos"** (`File Manager`).
    b. Navega a la carpeta raíz de tu dominio, que usualmente es **`public_html`**.
    c. Sube el **contenido** de la carpeta `build` que generaste en el paso anterior a `public_html`. La forma más fácil es comprimir el contenido en un `.zip`, subirlo y luego usar la función "Extraer" de cPanel.

4.  **Configurar el Servidor para React (¡Paso Crucial!):**
    a. Dentro de `public_html`, crea un nuevo archivo llamado `.htaccess`.
    b. Edita este archivo y pega el siguiente contenido. Esto soluciona los errores 404 al recargar sub-páginas.
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>
    ```

5.  **¡Listo!**
    Visita tu dominio. La página debería cargar correctamente.

### ¿Cómo actualizar la página?

Simplemente repite los pasos 2 y 3. Cada vez que hagas cambios en el código:
1.  Ejecuta `npm run build` en tu computadora.
2.  Borra los archivos antiguos de tu `public_html` en cPanel.
3.  Sube el nuevo contenido de tu carpeta `build`.
