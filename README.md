# Línea base de Angular 17 para proyectos internos de DevsCO

## Las caracter&iacute;sticas principales son

- Soporte de enrutamiento
- Soporte lazy loading
- Interceptor de peticiones http con componente de carga (Loading)
- Interceptor para agregar Token de autorización a las peticiones
- Arquitectura core-shared-feature
- Pipe para uso de TrackBy dentro de los ngFor
- Configuración de pruebas unitarias con Jest
- Manejo centralizado de errores (ErrorHandler)
- Pre-commit hooks con Husky + ESLint + Prettier
- Guards para manejar cambios sin guardar (CanDeactivate)
- Constantes para mensajes de experiencia de usuario
- Constantes para mensajes de error en formularios
- Input con ControlValueAccesor global para formularios
- Manejo de Local Storage asíncrono con ([@ngx-pwa/local-storage](https://github.com/cyrilletuzi/angular-async-local-storage))
- Internacionalización (i18n) con @angular/localize

## Estructura del proyecto

Los archivos de la aplicaci&oacute;n se encuentran en la subcarpeta src.

El proyecto base est&aacute; estructurado en los m&oacute;dulos feature, shared y core. Asegurando una separaci&oacute;n adecuada de las preocupaciones, lo que facilitar&aacute; la escalabilidad a medida que su aplicaci&oacute;n crezca. Lo siguiente describe brevemente cada tipo de m&oacute;dulo.

### M&oacute;dulo core

Deben estar lo transversal y de una sola instancia en la aplicaci&oacute;n. Por ejemplo: NavBar o interceptor.

### M&oacute;dulo feature

Deben estar los componentes que implementan funcionalidades especificas de la aplicaci&oacute;n. Por ejemplo, el componente datos de contacto el cual es el componente que implementa la feature de contacto. Es posible tener compartidos dentro de esta feature.

### M&oacute;dulo shared

Deben estar componentes o utilidades comunes a las diferentes feature. Por ejemplo, un componente de un bot&oacute;n azul que usted desea repetir en varios lugares. Un filtro para ser utilizado en todos los componentes.

## Getting Started

1. Clonar el repositorio
2. Instalar dependencias

```
npm install
```

3. Arrancar el proyecto en ambiente de desarrollo

```
npm start
```

4. Abrir el navegador

```
http://localhost:4200
```

# Build and Test

1. Pruebas unitarias

```
npm run test
```

# i18n

```
ng extract-i18n --output-path src/locale
```
