export class TooltipComponent extends HTMLElement {
  private tooltip: HTMLDivElement | null = null
  private content: HTMLSlotElement | null = null
  private target: HTMLElement | null = null
  private showTimeout: number | null = null
  private hideTimeout: number | null = null

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["position", "delay", "arrow-position"]
  }

  connectedCallback() {
    this.render()
    this.setupEventListeners()
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  attributeChangedCallback() {
    this.render()
  }

  setupEventListeners() {
    if (this.shadowRoot) {
      this.tooltip = this.shadowRoot.querySelector(".tooltip")
      this.content = this.shadowRoot.querySelector("slot:not([name])")

      if (this.content) {
        this.content.addEventListener("slotchange", this.handleSlotChange.bind(this))
      }

      // Initial setup
      this.handleSlotChange()
    }
  }

  removeEventListeners() {
    if (this.content) {
      this.content.removeEventListener("slotchange", this.handleSlotChange.bind(this))
    }

    if (this.target) {
      this.target.removeEventListener("mouseenter", this.handleMouseEnter.bind(this))
      this.target.removeEventListener("mouseleave", this.handleMouseLeave.bind(this))
      this.target.removeEventListener("focus", this.handleFocus.bind(this))
      this.target.removeEventListener("blur", this.handleBlur.bind(this))
    }
  }

  handleSlotChange() {
    // Get the first element from the default slot (the target element)
    const assignedNodes = this.content?.assignedNodes({ flatten: true }) || []
    const elements = assignedNodes.filter((node) => node.nodeType === Node.ELEMENT_NODE) as HTMLElement[]

    if (elements.length > 0) {
      this.target = elements[0]

      // Add event listeners to the target
      this.target.addEventListener("mouseenter", this.handleMouseEnter.bind(this))
      this.target.addEventListener("mouseleave", this.handleMouseLeave.bind(this))
      this.target.addEventListener("focus", this.handleFocus.bind(this))
      this.target.addEventListener("blur", this.handleBlur.bind(this))
    }
  }

  handleMouseEnter() {
    this.showTooltip()
  }

  handleMouseLeave() {
    this.hideTooltip()
  }

  handleFocus() {
    this.showTooltip()
  }

  handleBlur() {
    this.hideTooltip()
  }

  showTooltip() {
    const delay = Number.parseInt(this.getAttribute("delay") || "0", 10)

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = null
    }

    this.showTimeout = window.setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.classList.add("visible")
        this.updatePosition()
      }
    }, delay)
  }

  hideTooltip() {
    const delay = Number.parseInt(this.getAttribute("delay") || "0", 10)

    if (this.showTimeout) {
      clearTimeout(this.showTimeout)
      this.showTimeout = null
    }

    this.hideTimeout = window.setTimeout(() => {
      if (this.tooltip) {
        this.tooltip.classList.remove("visible")
      }
    }, delay)
  }

  updatePosition() {
    if (!this.tooltip || !this.target) return

    const position = this.getAttribute("position") || "top"
    const arrowPosition = this.getAttribute("arrow-position") || "center"
    const targetRect = this.target.getBoundingClientRect()
    const tooltipRect = this.tooltip.getBoundingClientRect()

    let top = 0
    let left = 0

    // Calculate position based on the position attribute
    switch (position) {
      case "top":
        top = targetRect.top - tooltipRect.height - 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "bottom":
        top = targetRect.bottom + 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.left - tooltipRect.width - 10
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.right + 10
        break
    }

    // Adjust for arrow position
    const arrow = this.tooltip.querySelector(".tooltip-arrow") as HTMLElement
    if (arrow) {
      if (position === "top" || position === "bottom") {
        switch (arrowPosition) {
          case "start":
            arrow.style.left = "10%"
            break
          case "center":
            arrow.style.left = "50%"
            break
          case "end":
            arrow.style.left = "90%"
            break
        }
      } else {
        switch (arrowPosition) {
          case "start":
            arrow.style.top = "10%"
            break
          case "center":
            arrow.style.top = "50%"
            break
          case "end":
            arrow.style.top = "90%"
            break
        }
      }
    }

    // Apply the position
    this.tooltip.style.top = `${top}px`
    this.tooltip.style.left = `${left}px`
  }

  render() {
    const position = this.getAttribute("position") || "top"

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: contents;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .tooltip {
            position: fixed;
            z-index: 1000;
            background-color: #333;
            color: white;
            padding: 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            max-width: 300px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s, visibility 0.2s;
          }
          
          .tooltip.visible {
            opacity: 1;
            visibility: visible;
          }
          
          .tooltip-arrow {
            position: absolute;
            width: 0;
            height: 0;
            border: 5px solid transparent;
          }
          
          .tooltip[data-position="top"] .tooltip-arrow {
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: #333;
            border-bottom: none;
          }
          
          .tooltip[data-position="bottom"] .tooltip-arrow {
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: #333;
            border-top: none;
          }
          
          .tooltip[data-position="left"] .tooltip-arrow {
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-left-color: #333;
            border-right: none;
          }
          
          .tooltip[data-position="right"] .tooltip-arrow {
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-right-color: #333;
            border-left: none;
          }
        </style>
        
        <slot></slot>
        
        <div class="tooltip" data-position="${position}">
          <div class="tooltip-arrow"></div>
          <slot name="content">Tooltip content</slot>
        </div>
      `
    }
  }
}

customElements.define("ui-tooltip", TooltipComponent)

