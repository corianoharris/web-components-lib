export class ModalComponent extends HTMLElement {
  private closeButton: HTMLButtonElement | null = null
  private backdrop: HTMLDivElement | null = null
  private dialog: HTMLDivElement | null = null

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["open", "size"]
  }

  connectedCallback() {
    this.render()
    this.setupEventListeners()
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "open" && oldValue !== newValue) {
      if (newValue === null) {
        this.close()
      } else {
        this.open()
      }
    } else {
      this.render()
    }
  }

  setupEventListeners() {
    if (this.shadowRoot) {
      this.closeButton = this.shadowRoot.querySelector(".modal-close")
      this.backdrop = this.shadowRoot.querySelector(".modal-backdrop")
      this.dialog = this.shadowRoot.querySelector(".modal-dialog")

      if (this.closeButton) {
        this.closeButton.addEventListener("click", this.handleClose.bind(this))
      }

      if (this.backdrop) {
        this.backdrop.addEventListener("click", this.handleBackdropClick.bind(this))
      }

      document.addEventListener("keydown", this.handleKeyDown.bind(this))
    }
  }

  removeEventListeners() {
    if (this.closeButton) {
      this.closeButton.removeEventListener("click", this.handleClose.bind(this))
    }

    if (this.backdrop) {
      this.backdrop.removeEventListener("click", this.handleBackdropClick.bind(this))
    }

    document.removeEventListener("keydown", this.handleKeyDown.bind(this))
  }

  handleClose() {
    this.removeAttribute("open")
    this.dispatchEvent(
      new CustomEvent("ui-close", {
        bubbles: true,
        composed: true,
      }),
    )
  }

  handleBackdropClick(event: MouseEvent) {
    if (event.target === this.backdrop) {
      this.handleClose()
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this.hasAttribute("open")) {
      this.handleClose()
    }
  }

  open() {
    document.body.style.overflow = "hidden"
    if (this.dialog) {
      setTimeout(() => {
        if (this.dialog) this.dialog.classList.add("open")
      }, 10)
    }
  }

  close() {
    document.body.style.overflow = ""
    if (this.dialog) {
      this.dialog.classList.remove("open")
    }
  }

  render() {
    const open = this.hasAttribute("open")
    const size = this.getAttribute("size") || "medium"

    const sizeStyles = {
      small: {
        width: "300px",
      },
      medium: {
        width: "500px",
      },
      large: {
        width: "800px",
      },
      fullscreen: {
        width: "100%",
        height: "100%",
        margin: "0",
        borderRadius: "0",
      },
    }

    const currentSize = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.medium

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: ${open ? "block" : "none"};
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          
          .modal-dialog {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-width: 90%;
            max-height: 90%;
            display: flex;
            flex-direction: column;
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.2s ease, transform 0.2s ease;
            width: ${currentSize.width};
            ${currentSize.height ? `height: ${currentSize.height};` : ""}
            ${currentSize.margin ? `margin: ${currentSize.margin};` : ""}
            ${currentSize.borderRadius ? `border-radius: ${currentSize.borderRadius};` : ""}
          }
          
          .modal-dialog.open {
            opacity: 1;
            transform: scale(1);
          }
          
          .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .modal-title {
            font-weight: 600;
            font-size: 1.25rem;
            margin: 0;
          }
          
          .modal-close {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.25rem;
          }
          
          .modal-close:hover {
            background-color: #f3f4f6;
          }
          
          .modal-body {
            padding: 1rem;
            overflow-y: auto;
            flex: 1;
          }
          
          .modal-footer {
            padding: 1rem;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
          }
          
          @media (max-width: 640px) {
            .modal-dialog {
              width: 100%;
              max-width: 100%;
              max-height: 100%;
              border-radius: 0;
              margin: 0;
            }
          }
        </style>
        
        <div class="modal-backdrop">
          <div class="modal-dialog ${open ? "open" : ""}">
            <div class="modal-header">
              <slot name="header">
                <h3 class="modal-title">Modal Title</h3>
              </slot>
              <button class="modal-close" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      `
    }
  }
}

customElements.define("ui-modal", ModalComponent)

