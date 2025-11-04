# Plataforma Educativa - Panel de Docente

Este es el código fuente para el panel de administración de un curso universitario.

## ¿Cómo publicar la página gratis con GitHub?

Puedes publicar este sitio en internet de forma gratuita usando **GitHub Pages**.

### Requisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (se instala con Node.js)
- Un repositorio de GitHub para alojar tu código.

### Pasos para Publicar

1.  **Sube tu código a GitHub:**
    Si aún no lo has hecho, crea un repositorio en GitHub y sube el código del proyecto.

2.  **Instalar Dependencias:**
    Abre una terminal en la carpeta del proyecto y ejecuta el siguiente comando para descargar React y las herramientas necesarias.

    ```bash
    npm install
    ```

3.  **Configurar la URL en `package.json`:**
    Abre el archivo `package.json` y edita la línea que dice `"homepage"`. Reemplaza los valores `<...>` con tu nombre de usuario de GitHub y el nombre de tu repositorio.

    ```json
    "homepage": "https://<TU_USUARIO_DE_GITHUB>.github.io/<EL_NOMBRE_DE_TU_REPOSITORIO>",
    ```
    Este paso es **crucial** para que la página funcione correctamente.

4.  **Desplegar la Aplicación:**
    Ejecuta el siguiente comando en tu terminal.

    ```bash
    npm run deploy
    ```

    Este comando primero compilará tu aplicación en la carpeta `build` y luego la subirá a una rama especial (`gh-pages`) en tu repositorio de GitHub.

5.  **Activar GitHub Pages en tu Repositorio:**
    a. Ve a tu repositorio en GitHub.com.
    b. Haz clic en **"Settings"** (Configuración).
    c. En el menú de la izquierda, ve a **"Pages"**.
    d. En la sección "Source", asegúrate de que esté seleccionada la rama **`gh-pages`** y la carpeta **`/(root)`**.
    e. Guarda los cambios.

¡Y eso es todo! Después de uno o dos minutos, tu sitio estará disponible en la URL que configuraste en el archivo `package.json`.