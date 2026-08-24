🥞 Sweet Mini Pancakes - Menú Digital Interactivo

Bienvenido al repositorio oficial del Menú Digital de Sweet Mini Pancakes. Esta aplicación web permite a los clientes visualizar el menú, armar su propia caja de mini pancakes de forma interactiva y enviar su pedido estructurado directamente vía WhatsApp.

🚀 Arquitectura y Tecnologías

Este proyecto está construido con un enfoque Vanilla (Sin frameworks complejos) para garantizar la máxima velocidad de carga al escanear el código QR y una fácil mantenibilidad.

Estructura: HTML5 Semántico.

Estilos: Tailwind CSS (vía CDN para prototipado rápido, escalable a build process mediante Node.js en el futuro).

Interactividad: Vanilla JavaScript (ES6+).

Iconografía: Lucide Icons.

Tipografía: Google Fonts (Fredoka & Plus Jakarta Sans).

🛠️ Escalabilidad y Mantenimiento

El código está diseñado para ser fácilmente escalable.

Gestión de Inventario: Los arrays FRUITS, TOPPINGS y SAUCES actúan como nuestra base de datos estática. Para agregar un nuevo ingrediente, simplemente añádelo al array correspondiente en la sección de estado de index.html.

Lógica de Categorías: La función selectCategory maneja dinámicamente los límites de ingredientes, permitiendo crear nuevas promociones sin reescribir lógica de validación.

💻 Flujo de Trabajo (GitHub Flow)

Para colaborar o añadir nuevas características a este proyecto, sigue esta metodología:

Clona el repositorio: git clone https://github.com/TU_USUARIO/sweet-mini-pancakes.git

Crea una rama para tu función/corrección: git checkout -b feature/nuevo-sabor-salsa

Realiza tus cambios y haz commits semánticos: git commit -m "feat: añade salsa de caramelo al menú"

Sube la rama: git push origin feature/nuevo-sabor-salsa

Abre un Pull Request (PR) hacia la rama main para revisión.

🚀 Despliegue (Deployment)

Este proyecto está listo para ser desplegado en plataformas de alojamiento estático.
Recomendamos encarecidamente GitHub Pages o Vercel:

Despliegue en GitHub Pages:

Ve a la pestaña Settings de tu repositorio en GitHub.

Navega a la sección Pages en la barra lateral izquierda.

En Source, selecciona la rama main y la carpeta / (root).

Haz clic en Save. Tu menú estará en línea en un par de minutos.

Desarrollado con ❤️ para Sweet Mini Pancakes en Guatemala.
