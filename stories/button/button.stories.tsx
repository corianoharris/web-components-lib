"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"

const meta = {
  title: "Components/Button",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const ButtonWrapper = (args: any) => {
  useEffect(() => {
    // Ensure the custom element is defined
    if (!customElements.get("ui-button")) {
      import("../../components/button/button")
    }

    // Setup event listener for ui-click event
    const handleClick = (e: any) => {
      if (args.onClick) {
        args.onClick(e)
      }
    }

    document.addEventListener("ui-click", handleClick)
    return () => {
      document.removeEventListener("ui-click", handleClick)
    }
  }, [args.onClick])

  return (
    // @ts-ignore
    <ui-button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled ? "true" : null}
      loading={args.loading ? "true" : null}
    >
      {args.children || "Button"}
      {/* @ts-ignore */}
    </ui-button>
  )
}

export const Primary: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "primary",
    size: "medium",
    children: "Primary Button",
  },
}

export const Secondary: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "secondary",
    size: "medium",
    children: "Secondary Button",
  },
}

export const Danger: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "danger",
    size: "medium",
    children: "Danger Button",
  },
}

export const Outline: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "outline",
    size: "medium",
    children: "Outline Button",
  },
}

export const Ghost: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "ghost",
    size: "medium",
    children: "Ghost Button",
  },
}

export const Small: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "primary",
    size: "small",
    children: "Small Button",
  },
}

export const Medium: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "primary",
    size: "medium",
    children: "Medium Button",
  },
}

export const Large: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "primary",
    size: "large",
    children: "Large Button",
  },
}

export const Disabled: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "primary",
    size: "medium",
    disabled: true,
    children: "Disabled Button",
  },
}

export const Loading: Story = {
  render: (args) => <ButtonWrapper {...args} />,
  args: {
    variant: "primary",
    size: "medium",
    loading: true,
    children: "Loading...",
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <ButtonWrapper {...args}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: "8px" }}
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Button with Icon
    </ButtonWrapper>
  ),
  args: {
    variant: "primary",
    size: "medium",
  },
}

