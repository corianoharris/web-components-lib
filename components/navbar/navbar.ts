'use strict'

// The error only happens in the Next.js SSR environment 
// ( ReferenceError: HTMLElement is not defined) 
// The `HTMLElement` class is only available in browser environments, not in 
//Node.js where the server rendering happens

export class NavbarComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["logo", "theme"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const logo = this.getAttribute("logo") || ""
    const theme = this.getAttribute("theme") || "light"

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
            height: 60px;
            background-color: ${theme === "dark" ? "#1a1a1a" : "#ffffff"};
            color: ${theme === "dark" ? "#ffffff" : "#1a1a1a"};
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .navbar-brand {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 1.25rem;
          }
          
          .navbar-brand img {
            height: 30px;
            margin-right: 0.5rem;
          }
          
          .navbar-links {
            display: flex;
            gap: 1.5rem;
          }
          
          .navbar-right {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          @media (max-width: 768px) {
            .navbar-links {
              display: none;
            }
            
            .menu-button {
              display: block;
            }
          }
        </style>
        
        <nav class="navbar">
          <div class="navbar-brand">
            ${logo ? `<img src="${logo}" alt="Logo" />` : ""}
            <slot name="brand">Brand</slot>
          </div>
          
          <div class="navbar-links">
            <slot name="links"></slot>
          </div>
          
          <div class="navbar-right">
            <slot name="right"></slot>
          </div>
        </nav>
      `
    }
  }
}

customElements.define("ui-navbar", NavbarComponent)

