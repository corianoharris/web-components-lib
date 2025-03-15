"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useEffect, useState, useRef } from "react"

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

const ModalDemo = (args: any) =>
{
  const [isOpen, setIsOpen] = useState(args.open)
  const modalRef = useRef<HTMLElement | null>(null)

  useEffect(() =>
  {
    // Import components
    Promise.all([import("../../components/modal/modal"), import("../../components/button/button")]).catch(console.error)
  }, [])

  // Update isOpen when the control changes
  useEffect(() =>
  {
    console.log("Args open changed:", args.open)
    setIsOpen(args.open)
  }, [args.open])

  // Handle button click to open modal
  const handleButtonClick = () =>
  {
    console.log("Button clicked, opening modal")
    setIsOpen(true)
  }

  // Handle modal close
  const handleModalClose = () =>
  {
    console.log("Modal closing from button click")
    setIsOpen(false)
  }

  useEffect(() =>
  {
    // Listen for ui-close event from the modal
    const handleClose = (e: any) =>
    {
      console.log("ui-close event received", e.detail)
      setIsOpen(false)
    }

    document.addEventListener("ui-close", handleClose)

    return () =>
    {
      document.removeEventListener("ui-close", handleClose)
    }
  }, [])

  // Update modal attribute when isOpen changes
  useEffect(() =>
  {
    console.log("isOpen changed:", isOpen)
    if (modalRef.current)
    {
      if (isOpen)
      {
        modalRef.current.setAttribute("open", "true")
      } else
      {
        modalRef.current.removeAttribute("open")
      }
    }
  }, [isOpen, modalRef])

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      {/* @ts-ignore */}
      {isOpen === false ? <ui-button onClick={handleButtonClick}>Open Modal</ui-button> : null}
      {/* @ts-ignore */}
      <ui-modal
        ref={modalRef}
        size={args.size}
      >
        <h3 slot="header">{args.title || "Default Modal"}</h3>
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
          {/* @ts-ignore */}
          <ui-button variant="outline" onClick={handleModalClose} style={{ marginRight: "8px" }}>
            Cancel
            {/* @ts-ignore */}
          </ui-button>
          {/* @ts-ignore */}
          <ui-button onClick={handleModalClose}>Confirm</ui-button>
        </div>
        {/* @ts-ignore */}
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