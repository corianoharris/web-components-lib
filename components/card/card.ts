export class CardComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["variant", "hover"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const variant = this.getAttribute("variant") || "default"
    const hover = this.hasAttribute("hover")

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .card {
            border-radius: 0.5rem;
            background-color: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            overflow: hidden;
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            cursor: pointer;
          }
          
          .card:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          }
          
          .card.hover:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
            transform: translateY(-5px);
          }
          
          .card-header {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .card-content {
            padding: 1rem;
          }
          
          .card-footer {
            padding: 1rem;
            border-top: 1px solid #e2e8f0;
          }
          
          /* Variants */
          .card.outlined {
            box-shadow: none;
            border: 1px solid #e2e8f0;
          }
          
          .card.elevated {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
        </style>
        
        <div class="card ${variant} ${hover ? "hover" : ""}">
          <div class="card-header">
            <slot name="header"></slot>
          </div>
          <div class="card-content">
            <slot></slot>
          </div>
          <div class="card-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      `
    }
  }
}

customElements.define("ui-card", CardComponent)

