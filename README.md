## Frontend

- **Angular 19+**: Framework utilizado para el desarrollo del frontend.
- **Angular Material**: Biblioteca de componentes para el diseño de la interfaz.
- **SCSS**: Para estilos avanzados y responsivos.

## Sistema de Reservas

- Componente principal para la gestión de reservas con un calendario interactivo.
- Formulario de reserva que muestra horarios disponibles según la fecha seleccionada.

## Autenticación

- Redirección al inicio de sesión si el usuario no está autenticado.
- Botón de inicio de sesión en el header si está habilitado.

## Interfaz Dinámica y Responsiva

- Uso de Angular Material para diseños responsivos.
- Layout adaptable para dispositivos móviles y escritorio.

# Instrucciones

## Clonar el repositorio:

```bash
git clone <repositorio>
cd Xolit.Frontend
```

## Instalar dependencias:

```bash
npm install
```

## Configurar URLs de APIs

Editar las configuraciones de las APIs en `src/environments/environment.ts`.

## Ejecutar el proyecto:

```bash
ng serve
```

# Uso

1. Navegar a la página principal.
2. Iniciar sesión con credenciales válidas.
3. Seleccionar una fecha y un espacio en el calendario.
4. Reservar un horario disponible.
