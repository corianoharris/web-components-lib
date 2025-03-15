Thought for 2 seconds```markdown project="Web Components Library" file="README.md"
...
```

web-components/
├── components/
│   ├── button/
│   │   ├── button.ts             # Button component implementation
│   │   └── button.stories.tsx    # Storybook documentation
│   ├── card/
│   │   ├── card.ts               # Card component implementation
│   │   └── card.stories.tsx      # Storybook documentation
│   ├── modal/
│   │   ├── modal.ts              # Modal component implementation
│   │   └── modal.stories.tsx     # Storybook documentation
│   ├── navbar/
│   │   ├── navbar.ts             # Navbar component implementation
│   │   └── navbar.stories.tsx    # Storybook documentation
│   └── tooltip/
│       ├── tooltip.ts            # Tooltip component implementation
│       └── tooltip.stories.tsx   # Storybook documentation
├── types/
│   └── custom-elements.d.ts      # TypeScript definitions for components
├── index.ts                      # Main export file
├── package.json                  # Package configuration
└── tsconfig.json                 # TypeScript configuration

```plaintext

### Components Included

1. **Navbar**: A responsive navigation bar with branding, links, and right-aligned content
2. **Button**: Versatile button with multiple variants, sizes, and states
3. **Card**: Flexible content container with header, body, and footer slots
4. **Modal**: Accessible dialog with customizable size and positioning
5. **Tooltip**: Configurable tooltip with different positions and arrow placement

### Key Features

- **Shadow DOM Encapsulation**: Styles won't leak in or out
- **Custom Events**: Framework-agnostic event handling
- **Responsive Design**: All components work on mobile and desktop
- **Accessibility**: Built with a11y best practices
- **TypeScript Support**: Full type definitions included

## 🛠️ Functionality

### Component API Pattern

All components follow a consistent API pattern:

1. **Attributes**: Configure components via HTML attributes
   ```html
   <ui-button variant="primary" size="large" disabled>Click Me</ui-button>
```

2. **Slots**: Insert content using named and default slots

```html
<ui-card>
  <h3 slot="header">Card Title</h3>
  <p>Card content goes here</p>
  <div slot="footer">Footer actions</div>
</ui-card>
```


3. **Events**: Listen for custom events with the `ui-` prefix

```javascript
document.querySelector('ui-button').addEventListener('ui-click', handleClick);
```




### Component Customization

Components can be customized via:

- **Attributes**: For basic configuration
- **CSS Custom Properties**: For styling (coming soon)
- **Slots**: For content structure
- **Extending Classes**: For advanced customization


## 🚦 How to Run

### Installation

```shellscript
# NPM
npm install web-components-lib

# Yarn
yarn add web-components-lib

# PNPM
pnpm add web-components-lib
```

### Usage

#### Import All Components

```javascript
// Import all components
import 'web-components-lib';
```

#### Import Individual Components

```javascript
// Import only what you need
import 'web-components-lib/button';
import 'web-components-lib/modal';
```

### Development

```shellscript
# Clone the repository
git clone https://github.com/your-username/web-components-lib.git
cd web-components-lib

# Install dependencies
npm install

# Run Storybook for development
npm run storybook

# Build the library
npm run build

# Run tests
npm test
```

## 🔌 Framework Integration

### React

```javascriptreact
import { useRef, useEffect } from 'react';
import 'web-components-lib';

function App() {
  const modalRef = useRef(null);
  
  const openModal = () => {
    modalRef.current.setAttribute('open', 'true');
  };
  
  useEffect(() => {
    const handleClose = () => console.log('Modal closed');
    modalRef.current?.addEventListener('ui-close', handleClose);
    return () => modalRef.current?.removeEventListener('ui-close', handleClose);
  }, []);
  
  return (
    <div>
      <ui-button onClick={openModal}>Open Modal</ui-button>
      <ui-modal ref={modalRef}>
        <h2 slot="header">React Modal</h2>
        <p>This modal works in React!</p>
      </ui-modal>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <ui-button @ui-click="openModal">Open Modal</ui-button>
    <ui-modal ref="modal">
      <h2 slot="header">Vue Modal</h2>
      <p>This modal works in Vue!</p>
    </ui-modal>
  </div>
</template>

<script>
import 'web-components-lib';

export default {
  methods: {
    openModal() {
      this.$refs.modal.setAttribute('open', 'true');
    }
  },
  mounted() {
    this.$refs.modal.addEventListener('ui-close', () => {
      console.log('Modal closed');
    });
  }
}
</script>
```

### Angular

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'web-components-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for custom elements
})
export class AppModule {}

// app.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ui-button (ui-click)="openModal()">Open Modal</ui-button>
    <ui-modal #modal>
      <h2 slot="header">Angular Modal</h2>
      <p>This modal works in Angular!</p>
    </ui-modal>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef;
  
  ngAfterViewInit() {
    this.modalRef.nativeElement.addEventListener('ui-close', () => {
      console.log('Modal closed');
    });
  }
  
  openModal() {
    this.modalRef.nativeElement.setAttribute('open', 'true');
  }
}
```

### Svelte

```svelte
<script>
  import 'web-components-lib';
  import { onMount } from 'svelte';
  
  let modal;
  
  function openModal() {
    modal.setAttribute('open', 'true');
  }
  
  onMount(() => {
    modal.addEventListener('ui-close', () => {
      console.log('Modal closed');
    });
  });
</script>

<ui-button on:ui-click={openModal}>Open Modal</ui-button>

<ui-modal bind:this={modal}>
  <h2 slot="header">Svelte Modal</h2>
  <p>This modal works in Svelte!</p>
</ui-modal>
```

## 📚 Documentation

For full documentation, run Storybook:

```shellscript
npm run storybook
```

This will start a local Storybook server where you can explore all components, their variants, and usage examples.

## 🌐 Browser Compatibility

This library is compatible with all modern browsers that support Web Components:

| Browser | Minimum Version
|-----|-----
| Chrome | 67+
| Firefox | 63+
| Safari | 10.1+
| Edge | 79+


For older browsers, you may need to include polyfills:

```javascript
// Import polyfills before importing the components
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import 'web-components-lib';
```

## 🔍 Troubleshooting

### Common Issues

#### Components Not Rendering

If components aren't rendering, check:

1. Browser compatibility
2. Import paths are correct
3. Components are properly registered


#### TypeScript Errors

If you're seeing TypeScript errors:

1. Make sure you've included the type definitions:

```typescript
// In your tsconfig.json
{
  "compilerOptions": {
    "types": ["web-components-lib/types"]
  }
}
```


2. Or add a declaration file to your project:

```typescript
// custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'ui-button': any;
    'ui-modal': any;
    // Add other components as needed
  }
}
```




#### Server-Side Rendering

Web Components run in the browser, so for SSR:

1. Use dynamic imports in frameworks like Next.js:

```javascript
useEffect(() => {
  import('web-components-lib');
}, []);
```


2. Or use a client-only wrapper component


## ⚡ Performance Considerations

### Bundle Size

To minimize bundle size:

- Import only the components you need
- Consider using a bundler with tree-shaking
- Lazy-load components that aren't needed on initial page load


### Rendering Performance

For optimal performance:

- Avoid creating too many instances of complex components like modals
- Use the `disconnectedCallback` lifecycle method to clean up resources
- Consider using `requestAnimationFrame` for animations


## 🛣️ Roadmap

Future plans for this library include:

- Theme customization via CSS custom properties
- Additional components (Dropdown, Tabs, Accordion)
- Form components with validation
- Animation utilities
- Server-side rendering support improvements
- Improved accessibility features
- React Native / mobile framework adapters


## ❓ FAQ

### Can I use this with jQuery?

Yes! Web Components work with any JavaScript library, including jQuery:

```javascript
$('ui-button').on('ui-click', function() {
  // Handle click
});
```

### How do I style components?

Currently, styling is handled via attributes. CSS custom properties for theming are coming soon.

### Can I extend components?

Yes, you can extend any component:

```javascript
import { ButtonComponent } from 'web-components-lib/button';

class CustomButton extends ButtonComponent {
  // Add custom functionality
}

customElements.define('custom-button', CustomButton);
```

### Are these components accessible?

Yes, all components are built with accessibility in mind, including keyboard navigation, ARIA attributes, and focus management.

## 🙏 Acknowledgments

- This library was inspired by design systems like Material Web Components and Shoelace
- Thanks to the Web Components community for standards and best practices
- Built with TypeScript and Storybook


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
