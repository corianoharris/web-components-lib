export class ButtonComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.addEventListener("click", this.handleClick.bind(this))
  }

  static get observedAttributes() {
    return ["variant", "size", "disabled", "loading"]
  }

  connectedCallback() {
    this.render()
    this.addEventListener("click", this.handleClick)
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick)
  }

  attributeChangedCallback() {
    this.render()
  }

  handleClick(event: Event) {
    // Prevent click if disabled or loading
    if (this.hasAttribute("disabled") || this.hasAttribute("loading")) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    // Dispatch a custom event that can be handled by the parent
    this.dispatchEvent(
      new CustomEvent("ui-click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      }),
    )
  }

  render() {
    const variant = this.getAttribute("variant") || "primary"
    const size = this.getAttribute("size") || "medium"
    const disabled = this.hasAttribute("disabled")
    const loading = this.hasAttribute("loading")

    const variantStyles = {
      primary: {
        background: "hsl(222.2, 47.4%, 11.2%)",
        color: "white",
        border: "none",
        hoverBg: "hsl(222.2, 47.4%, 20%)",
      },
      secondary: {
        background: "hsl(210, 40%, 96.1%)",
        color: "hsl(222.2, 47.4%, 11.2%)",
        border: "1px solid hsl(214.3, 31.8%, 91.4%)",
        hoverBg: "hsl(210, 40%, 90%)",
      },
      danger: {
        background: "hsl(0, 84.2%, 60.2%)",
        color: "white",
        border: "none",
        hoverBg: "hsl(0, 84.2%, 50%)",
      },
      outline: {
        background: "transparent",
        color: "hsl(222.2, 47.4%, 11.2%)",
        border: "1px solid hsl(222.2, 47.4%, 11.2%)",
        hoverBg: "hsl(210, 40%, 96.1%)",
      },
      ghost: {
        background: "transparent",
        color: "hsl(222.2, 47.4%, 11.2%)",
        border: "none",
        hoverBg: "hsl(210, 40%, 96.1%)",
      },
    }

    const sizeStyles = {
      small: {
        padding: "0.25rem 0.5rem",
        fontSize: "0.75rem",
        height: "1.75rem",
      },
      medium: {
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        height: "2.25rem",
      },
      large: {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        height: "2.75rem",
      },
    }

    const currentVariant = variantStyles[variant as keyof typeof variantStyles] || variantStyles.primary
    const currentSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
          
          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.375rem;
            font-weight: 500;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            cursor: pointer;
            transition: all 0.2s ease;
            gap: 0.5rem;
            
            background-color: ${currentVariant.background};
            color: ${currentVariant.color};
            border: ${currentVariant.border};
            padding: ${currentSize.padding};
            font-size: ${currentSize.fontSize};
            height: ${currentSize.height};
          }
          
          .button:hover:not(:disabled) {
            background-color: ${currentVariant.hoverBg};
          }
          
          .button:focus {
            outline: 2px solid hsl(215, 20%, 65%);
            outline-offset: 2px;
          }
          
          .button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .spinner {
            animation: spin 1s linear infinite;
            width: 1em;
            height: 1em;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        </style>
        
        <button class="button" ?disabled="${disabled || loading}">
          ${
            loading
              ? `
            <svg class="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="30 30" stroke-dashoffset="0"></circle>
            </svg>
          `
              : ""
          }
          <slot></slot>
        </button>
      `
    }
  }
}

if (!customElements.get("ui-button")) {
  customElements.define("ui-button", ButtonComponent)
}

