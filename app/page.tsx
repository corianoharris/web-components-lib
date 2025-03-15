"use client"

import { useEffect, useState } from "react"

// Import our components (in a real app, these would be imported from the package)
import "../components/navbar/navbar"
import "../components/button/button"
import "../components/card/card"
import "../components/modal/modal"
import "../components/tooltip/tooltip"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [theme, setTheme] = useState("light")

  // Handle custom events from web components
  useEffect(() => {
    const handleButtonClick = (e: Event) => {
      console.log("Button clicked:", e)
    }

    document.addEventListener("ui-click", handleButtonClick)

    return () => {
      document.removeEventListener("ui-click", handleButtonClick)
    }
  }, [])

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Web Components Storybook</h1>

      {/* Navbar Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Navbar Component</h2>
        <div className="border rounded-lg overflow-hidden mb-4">
          <ui-navbar logo="/placeholder.svg?height=30&width=30" theme={theme}>
            <span slot="brand">Acme Inc</span>
            <div slot="links">
              <a href="#" className="px-3 py-2">
                Home
              </a>
              <a href="#" className="px-3 py-2">
                Features
              </a>
              <a href="#" className="px-3 py-2">
                Pricing
              </a>
              <a href="#" className="px-3 py-2">
                About
              </a>
            </div>
            <div slot="right">
              <button className="px-3 py-1 bg-blue-500 text-white rounded">Sign In</button>
            </div>
          </ui-navbar>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle Theme
          </button>
        </div>
      </section>

      {/* Button Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Button Component</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <ui-button variant="primary">Primary Button</ui-button>
          <ui-button variant="secondary">Secondary Button</ui-button>
          <ui-button variant="danger">Danger Button</ui-button>
          <ui-button variant="outline">Outline Button</ui-button>
          <ui-button variant="ghost">Ghost Button</ui-button>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <ui-button size="small">Small Button</ui-button>
          <ui-button size="medium">Medium Button</ui-button>
          <ui-button size="large">Large Button</ui-button>
        </div>
        <div className="flex flex-wrap gap-4">
          <ui-button disabled>Disabled Button</ui-button>
          <ui-button loading>Loading Button</ui-button>
        </div>
      </section>

      {/* Card Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Card Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ui-card>
            <h3 slot="header" className="text-lg font-medium">
              Default Card
            </h3>
            <p>This is a default card component with header and footer slots.</p>
            <div slot="footer" className="flex justify-end">
              <ui-button size="small">Action</ui-button>
            </div>
          </ui-card>

          <ui-card variant="outlined" hover>
            <h3 slot="header" className="text-lg font-medium">
              Outlined Card
            </h3>
            <p>This is an outlined card with hover effect enabled.</p>
            <div slot="footer" className="flex justify-end">
              <ui-button size="small" variant="outline">
                Action
              </ui-button>
            </div>
          </ui-card>

          <ui-card variant="elevated">
            <h3 slot="header" className="text-lg font-medium">
              Elevated Card
            </h3>
            <p>This is an elevated card with more pronounced shadow.</p>
            <div slot="footer" className="flex justify-end">
              <ui-button size="small" variant="secondary">
                Action
              </ui-button>
            </div>
          </ui-card>
        </div>
      </section>

      {/* Modal Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Modal Component</h2>
        <div className="flex flex-wrap gap-4">
          <ui-button onClick={() => setModalOpen(true)}>Open Modal</ui-button>
        </div>

        <ui-modal open={modalOpen ? "true" : null} size="medium">
          <h3 slot="header">Modal Title</h3>
          <div>
            <p className="mb-4">This is a modal dialog component with customizable size and content.</p>
            <p>You can close it by clicking the X button, clicking outside, or pressing ESC.</p>
          </div>
          <div slot="footer">
            <ui-button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </ui-button>
            <ui-button onClick={() => setModalOpen(false)}>Confirm</ui-button>
          </div>
        </ui-modal>
      </section>

      {/* Tooltip Component */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tooltip Component</h2>
        <div className="flex flex-wrap gap-8 mb-4">
          <ui-tooltip position="top" arrow-position="center">
            <ui-button>Tooltip Top</ui-button>
            <span slot="content">This tooltip appears on top</span>
          </ui-tooltip>

          <ui-tooltip position="bottom" arrow-position="start">
            <ui-button>Tooltip Bottom</ui-button>
            <span slot="content">This tooltip appears at the bottom with the arrow at the start</span>
          </ui-tooltip>

          <ui-tooltip position="left" arrow-position="end">
            <ui-button>Tooltip Left</ui-button>
            <span slot="content">This tooltip appears on the left with the arrow at the end</span>
          </ui-tooltip>

          <ui-tooltip position="right" delay="500">
            <ui-button>Tooltip Right (Delayed)</ui-button>
            <span slot="content">This tooltip appears on the right with a 500ms delay</span>
          </ui-tooltip>
        </div>
      </section>

      {/* Framework Integration Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Framework Integration Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-medium mb-3">React Integration</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {`// React Component
import { useRef, useEffect } from 'react';
import 'web-components-lib';

function MyComponent() {
  const modalRef = useRef(null);
  
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.setAttribute('open', '');
    }
  };
  
  useEffect(() => {
    const handleClose = () => {
      console.log('Modal closed');
    };
    
    const modal = modalRef.current;
    modal?.addEventListener('ui-close', handleClose);
    
    return () => {
      modal?.removeEventListener('ui-close', handleClose);
    };
  }, []);
  
  return (
    <div>
      <ui-button onClick={openModal}>Open Modal</ui-button>
      <ui-modal ref={modalRef}>
        <h3 slot="header">React Modal</h3>
        <p>Modal content</p>
      </ui-modal>
    </div>
  );
}`}
            </pre>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-medium mb-3">Vue Integration</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {`<!-- Vue Component -->
<template>
  <div>
    <ui-button @ui-click="openModal">Open Modal</ui-button>
    <ui-modal ref="modal">
      <h3 slot="header">Vue Modal</h3>
      <p>Modal content</p>
      <template #footer>
        <ui-button @ui-click="closeModal">Close</ui-button>
      </template>
    </ui-modal>
  </div>
</template>

<script>
import 'web-components-lib';

export default {
  methods: {
    openModal() {
      this.$refs.modal.setAttribute('open', '');
    },
    closeModal() {
      this.$refs.modal.removeAttribute('open');
    }
  },
  mounted() {
    this.$refs.modal.addEventListener('ui-close', () => {
      console.log('Modal closed');
    });
  }
}
</script>`}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-medium mb-3">Angular Integration</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {`// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Import web components
import 'web-components-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for custom elements
})
export class AppModule {}

// app.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <ui-button (ui-click)="openModal()">Open Modal</ui-button>
    <ui-modal #modal>
      <h3 slot="header">Angular Modal</h3>
      <p>Modal content</p>
    </ui-modal>
  \`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef;
  
  ngAfterViewInit() {
    this.modalRef.nativeElement.addEventListener('ui-close', () => {
      console.log('Modal closed');
    });
  }
  
  openModal() {
    this.modalRef.nativeElement.setAttribute('open', '');
  }
}`}
            </pre>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-medium mb-3">Svelte Integration</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {`<!-- App.svelte -->
<script>
  import 'web-components-lib';
  import { onMount } from 'svelte';
  
  let modal;
  
  function openModal() {
    modal.setAttribute('open', '');
  }
  
  onMount(() => {
    modal.addEventListener('ui-close', () => {
      console.log('Modal closed');
    });
  });
</script>

<ui-button on:ui-click={openModal}>Open Modal</ui-button>

<ui-modal bind:this={modal}>
  <h3 slot="header">Svelte Modal</h3>
  <p>Modal content</p>
  <div slot="footer">
    <ui-button on:ui-click={() => modal.removeAttribute('open')}>
      Close
    </ui-button>
  </div>
</ui-modal>`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  )
}

