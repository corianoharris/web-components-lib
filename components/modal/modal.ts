interface SizeStyle {
  width: string
  height?: string
  margin?: string
  borderRadius?: string
}

export class ModalComponent extends HTMLElement {
  private closeButton: HTMLButtonElement | null = null
  private backdrop: HTMLDivElement | null = null
  private dialog: HTMLDivElement | null = null

  // Store bound methods to properly remove event listeners
  private boundHandleClose: (event?: Event) => void
  private boundHandleBackdropClick: (event: MouseEvent) => void
  private boundHandleKeyDown: (event: KeyboardEvent) => void

  constructor() {
    super()
    this.attachShadow({ mode: "open" })

    // Bind methods once to ensure we can properly remove event listeners
    this.boundHandleClose = this.handleClose.bind(this)
    this.boundHandleBackdropClick = this.handleBackdropClick.bind(this)
    this.boundHandleKeyDown = this.handleKeyDown.bind(this)
  }

  static get observedAttributes() {
    return ["open", "size"]
  }

  connectedCallback() {
    console.log("Modal connected", this.hasAttribute("open"))
    this.render()
    this.setupEventListeners()

    // Ensure initial state is correct
    if (this.hasAttribute("open")) {
      this.open()
    } else {
      this.close()
    }
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    console.log(`Attribute changed: ${name}`, oldValue, newValue)
    if (name === "open") {
      if (newValue !== null) {
        this.open()
      } else {
        this.close()
      }
    }
    this.render()
  }

  setupEventListeners() {
    if (this.shadowRoot) {
      // Query elements after rendering
      this.closeButton = this.shadowRoot.querySelector(".modal-close")
      this.backdrop = this.shadowRoot.querySelector(".modal-backdrop")
      this.dialog = this.shadowRoot.querySelector(".modal-dialog")

      if (this.closeButton) {
        console.log("Adding close button listener")
        this.closeButton.addEventListener("click", this.boundHandleClose)
      } else {
        console.error("Close button not found")
      }

      if (this.backdrop) {
        this.backdrop.addEventListener("click", this.boundHandleBackdropClick)
      }

      document.addEventListener("keydown", this.boundHandleKeyDown)
    }
  }

  removeEventListeners() {
    if (this.closeButton) {
      this.closeButton.removeEventListener("click", this.boundHandleClose)
    }
    if (this.backdrop) {
      this.backdrop.removeEventListener("click", this.boundHandleBackdropClick)
    }
    document.removeEventListener("keydown", this.boundHandleKeyDown)
  }

  handleClose(event?: Event) {
    console.log("Modal close clicked")
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.removeAttribute("open")
    this.dispatchEvent(
      new CustomEvent("ui-close", {
        bubbles: true,
        composed: true,
        detail: { source: "modal" },
      }),
    )
  }

  handleBackdropClick(event: MouseEvent) {
    console.log("Backdrop clicked", event.target, this.backdrop)
    if (event.target === this.backdrop) {
      this.handleClose()
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this.hasAttribute("open")) {
      console.log("Escape pressed")
      this.handleClose()
    }
  }

  open() {
    console.log("Opening modal")
    document.body.style.overflow = "hidden"
    if (this.dialog) {
      this.dialog.classList.add("open")
    }
  }

  close() {
    console.log("Closing modal")
    document.body.style.overflow = ""
    if (this.dialog) {
      this.dialog.classList.remove("open")
    }
  }

  render() {
    const open = this.hasAttribute("open")
    const size = this.getAttribute("size") || "medium"

    const sizeStyles: Record<string, SizeStyle> = {
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

    const currentSize = sizeStyles[size] || sizeStyles.medium

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: ${open ? "flex" : "none"};
            align-items: center;
            justify-content: center;
          }
          
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
          }
          
          .modal-dialog {
            position: relative;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-width: 90%;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            width: ${currentSize.width};
            ${currentSize.height ? `height: ${currentSize.height};` : ""}
            ${currentSize.margin ? `margin: ${currentSize.margin};` : ""}
            ${currentSize.borderRadius ? `border-radius: ${currentSize.borderRadius};` : ""}
            overflow: hidden;
            z-index: 1001;
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
              margin: 0;
              border-radius: 0;
            }
          }
        </style>
        
        <div class="modal-backdrop"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <slot name="header">
              <h3 class="modal-title">Modal Title</h3>
            </slot>
            <button class="modal-close" aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
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
      `

      // Re-query elements after rendering
      this.setupEventListeners()
    }
  }
}


  customElements.define("ui-modal", ModalComponent)


