# ThemeHero - Real-time Theme & Design Token Builder

Sistema profesional para crear, personalizar y exportar sistemas de diseño con actualización en tiempo real. La herramienta más completa del mundo para crear themes visuales y exportarlos a múltiples ecosistemas.

**🆓 100% Gratuito y Sin Restricciones** - ThemeHero es completamente gratuito. Sin límites de presets, sin restricciones de exportación, sin paywalls. Creado con amor para la comunidad.

## 🚀 Características

- **Live Preview en Tiempo Real**: Los cambios se aplican instantáneamente en toda la interfaz (landing + builder)
- **Persistencia Automática**: Los tokens se guardan automáticamente en localStorage
- **Gestión de Múltiples Themes**: Crea, duplica, renombra y gestiona múltiples presets de themes
- **Exportación a 13+ Formatos**: Exporta a JSON, CSS, SCSS, Tailwind, Bootstrap, JSS, CSS-in-JS, Material UI, Chakra UI, React Native, Figma Tokens, Google Fonts y TypeScript
- **Exportación Múltiple**: Selecciona varios formatos y descarga un ZIP con todos
- **Compartir por URL**: Comparte themes codificados en la URL
- **Diseño Premium**: UI moderna con glassmorphism inspirada en Linear, Vercel, Framer y Stripe
- **Componentes Reactivos**: Todos los componentes se adaptan automáticamente a los cambios

## 🛠️ Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + CSS Variables
- **Zustand** (State Management)
- **Framer Motion** (Animaciones)
- **Google Fonts** (Inter, JetBrains Mono)

## 📦 Instalación

```bash
yarn install
```

## 🏃 Desarrollo

```bash
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
themeHero/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page
│   └── builder/
│       └── page.tsx        # Theme Builder
├── components/
│   ├── landing/           # Componentes de la landing
│   ├── panel/             # Editores del panel izquierdo
│   ├── preview/           # Área de preview
│   └── ui/                # Componentes UI base
├── store/
│   └── themeStore.ts      # Store de Zustand
├── lib/
│   ├── tokensToCss.ts     # Exportador CSS
│   ├── tokensToJson.ts    # Exportador JSON
│   ├── tokensToTs.ts      # Exportador TypeScript
│   └── useThemeSync.ts    # Hook de sincronización
└── styles/
    └── globals.css        # Estilos globales
```

## 🎨 Uso

1. **Landing Page**: Visita la página principal para ver el showcase de componentes con el theme activo aplicado
2. **Theme Builder**: Haz clic en "Launch Theme Builder" para acceder al editor completo
3. **Gestionar Themes**: En la pestaña "Themes" puedes:
   - Crear nuevos themes desde el actual
   - Duplicar themes existentes
   - Renombrar themes (edición inline)
   - Eliminar themes
   - Cambiar entre themes activos
   - Compartir themes por URL
4. **Editar Tokens**: Usa las pestañas del panel izquierdo para editar:
   - Colors (con color picker)
   - Typography
   - Spacing
   - Radius
   - Shadows
   - Motion
5. **Exportar**: Ve a la pestaña "Export" para:
   - Exportar formatos individuales (13+ formatos disponibles)
   - Seleccionar múltiples formatos y descargar un ZIP
   - Copiar al portapapeles cualquier formato
6. **Reset**: Usa el botón "Reset a Default" para volver a los valores por defecto

## 📦 Formatos de Exportación

- **JSON Tokens** - Para Style Dictionary / Design tokens
- **CSS Variables** - Variables CSS estándar
- **SCSS Variables** - Variables SCSS
- **Tailwind Config** - Configuración completa de Tailwind
- **Bootstrap Theme** - Override de tema Bootstrap
- **JSS (React)** - Objeto JS para React inline styling
- **CSS-in-JS** - Para styled-components / Emotion
- **Material UI** - Theme completo de Material UI
- **Chakra UI** - Theme completo de Chakra UI
- **React Native** - StyleSheet adaptado para React Native
- **Figma Tokens** - JSON compatible con Figma
- **Google Fonts** - Import CSS + Next.js font object
- **TypeScript** - Tipos TypeScript exportables

## 🚢 Deploy

El proyecto está listo para deploy en Vercel:

```bash
yarn build
```

## 💙 Colaboración

ThemeHero es una herramienta gratuita y abierta. Si te sirve y querés colaborar para mantenerla online, podés hacerlo de forma opcional a través de Mercado Pago usando el botón de colaboración en la aplicación.

## 📝 Licencia

MIT

