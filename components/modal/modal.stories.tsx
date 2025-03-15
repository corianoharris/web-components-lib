"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useEffect, useState } from "react"
import "./modal"
import "../button/button"

const meta = {
  title: "Components/Modal",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", "fullscreen"],
    },
    open: { control: "boolean" },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const ModalDemo = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.open)

  useEffect(() => {
    // Ensure the custom elements are defined
    if (!customElements.get("ui-modal")) {
      import("./modal")
    }
    if (!customElements.get("ui-button")) {
      import("../button/button")
    }

    // Setup event listener for ui-close event
    const handleClose = () => {
      setIsOpen(false)
    }

    document.addEventListener("ui-close", handleClose)
    return () => {
      document.removeEventListener("ui-close", handleClose)
    }
  }, [])

  useEffect(() => {
    setIsOpen(args.open)
  }, [args.open])

  return (
    <div>
      <ui-button onClick={() => setIsOpen(true)}>Open Modal</ui-button>

      <ui-modal open={isOpen ? "true" : null} size={args.size}>
        <h3 slot="header">{args.title || "Modal Title"}</h3>
        <div style={{ minHeight: "100px" }}>
          {args.children || (
            <>
              <p style={{ marginBottom: "16px" }}>
                This is a modal dialog component with customizable size and content.
              </p>
              <p>You can close it by clicking the X button, clicking outside, or pressing ESC.</p>
            </>
          )}
        </div>
        <div slot="footer">
          <ui-button variant="outline" onClick={() => setIsOpen(false)} style={{ marginRight: "8px" }}>
            Cancel
          </ui-button>
          <ui-button onClick={() => setIsOpen(false)}>Confirm</ui-button>
        </div>
      </ui-modal>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    size: "medium",
    open: false,
    title: "Default Modal",
  },
}

export const Small: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    size: "small",
    open: false,
    title: "Small Modal",
  },
}

export const Large: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    size: "large",
    open: false,
    title: "Large Modal",
  },
}

export const Fullscreen: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    size: "fullscreen",
    open: false,
    title: "Fullscreen Modal",
  },
}

export const WithForm: Story = {
  render: (args) => (
    <ModalDemo {...args}>
      <form style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
            required
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
            required
          />
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
      </form>
    </ModalDemo>
  ),
  args: {
    size: "medium",
    open: false,
    title: "Login",
  },
}

export const InitiallyOpen: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    size: "medium",
    open: true,
    title: "Initially Open Modal",
  },
}

