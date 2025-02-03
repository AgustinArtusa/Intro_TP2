# Pagina de Compraventa de Articulos Coleccionables

Este proyecto es una aplicación web que permite la compra y venta de artículos coleccionables. Incluye autenticación de usuarios, gestión de productos y un sistema de transacciones.

## Ejemplos de uso
![Inicio de Sesion](https://github.com/user-attachments/assets/a22be588-6543-426a-a764-9f1bb2bc0a97)

![Articulos](https://github.com/user-attachments/assets/b322f9fd-ce0c-4ff5-bcfc-84bd701016bc)

![Compra](https://github.com/user-attachments/assets/39f7f083-9c2e-4bd6-9633-b542a0d037f0)

## Tecnologias Utilizadas

### Frontend:
- **HTML, CSS, JavaScript**
- **Bulma** para estilos y diseño responsivo
- **Fetch API** para las solicitudes al backend

### Backend:
- **Node.js** con **Express**
- **Prisma** como ORM para base de datos
- **PostgreSQL**
- **Express Session** para la gestión de sesiones

## Instalacion del proyecto

### Clonar repositorio
git clone https://github.com/LeandroAvalosUrbano/Intro_TP2
cd Intro_TP2

### Instalar dependencias del backend
cd Backend
npm install

### Configurar base de datos
npx prisma migrate dev

### Iniciar el backend
npm start

