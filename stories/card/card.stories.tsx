"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"

const meta = {
  title: "Components/Card",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined", "elevated"],
    },
    hover: { control: "boolean" },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const CardWrapper = (args: any) => {
  useEffect(() => {
    // Ensure the custom elements are defined
    if (!customElements.get("ui-card")) {
      import("../../components/card/card")
    }
    if (!customElements.get("ui-button")) {
      import("../../components/button/button")
    }
  }, [])

  return (

     // @ts-ignore
    <div style={{ width: "300px" }}>
     { /* @ts-ignore */}
      <ui-card variant={args.variant} hover={args.hover ? "true" : null}>
        <h3 slot="header" style={{ margin: 0, fontSize: "1.125rem", fontWeight: 500 }}>
          {args.title || "Card Title"}
        </h3>
        <div style={{ minHeight: "100px" }}>
          {args.children ||
            "This is a card component with header and footer slots. You can customize its appearance using the variant and hover attributes."}
        </div>
        <div slot="footer" style={{ display: "flex", justifyContent: "flex-end" }}>
          { /* @ts-ignore */}
          <ui-button size="small" variant={args.variant === "outlined" ? "outline" : "secondary"}>
            {args.buttonText || "Action"}
            { /* @ts-ignore */}
          </ui-button>
        </div>
        { /* @ts-ignore */}
      </ui-card>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <CardWrapper {...args} />,
  args: {
    variant: "default",
    hover: false,
    title: "Default Card",
  },
}

export const Outlined: Story = {
  render: (args) => <CardWrapper {...args} />,
  args: {
    variant: "outlined",
    hover: false,
    title: "Outlined Card",
  },
}

export const Elevated: Story = {
  render: (args) => <CardWrapper {...args} />,
  args: {
    variant: "elevated",
    hover: false,
    title: "Elevated Card",
  },
}

export const WithHoverEffect: Story = {
  render: (args) => <CardWrapper {...args} />,
  args: {
    variant: "default",
    hover: true,
    title: "Card with Hover",
  },
}

export const WithCustomContent: Story = {
  render: (args) => (
    <CardWrapper {...args}>
      <img
        src="/placeholder.svg?height=150&width=270"
        alt="Placeholder"
        style={{ width: "100%", height: "150px", objectFit: "cover", marginBottom: "12px" }}
      />
      <p style={{ margin: "0 0 8px 0" }}>
        This card contains a custom image and structured content with a clear call to action.
      </p>
      <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#666" }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "4px" }}
        >
          <path
            d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Updated 2 hours ago
      </div>
    </CardWrapper>
  ),
  args: {
    variant: "elevated",
    hover: true,
    title: "Featured Article",
    buttonText: "Read More",
  },
}

