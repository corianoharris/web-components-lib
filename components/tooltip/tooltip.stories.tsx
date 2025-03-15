"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"
import "./tooltip"
import "../button/button"

const meta = {
  title: "Components/Tooltip",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    "arrow-position": {
      control: "select",
      options: ["start", "center", "end"],
    },
    delay: {
      control: "number",
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const TooltipWrapper = (args: any) => {
  useEffect(() => {
    // Ensure the custom elements are defined
    if (!customElements.get("ui-tooltip")) {
      import("./tooltip")
    }
    if (!customElements.get("ui-button")) {
      import("../button/button")
    }
  }, [])

  return (
    <ui-tooltip position={args.position} arrow-position={args["arrow-position"]} delay={args.delay?.toString()}>
      <ui-button variant={args.buttonVariant || "primary"}>{args.buttonText || "Hover Me"}</ui-button>
      <span slot="content">{args.content || "This is a tooltip"}</span>
    </ui-tooltip>
  )
}

export const TopTooltip: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "top",
    "arrow-position": "center",
    buttonText: "Tooltip on Top",
    content: "This tooltip appears on top",
  },
}

export const BottomTooltip: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "bottom",
    "arrow-position": "center",
    buttonText: "Tooltip on Bottom",
    content: "This tooltip appears on the bottom",
  },
}

export const LeftTooltip: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "left",
    "arrow-position": "center",
    buttonText: "Tooltip on Left",
    content: "This tooltip appears on the left",
  },
}

export const RightTooltip: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "right",
    "arrow-position": "center",
    buttonText: "Tooltip on Right",
    content: "This tooltip appears on the right",
  },
}

export const ArrowStart: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "top",
    "arrow-position": "start",
    buttonText: "Arrow at Start",
    content: "This tooltip has the arrow positioned at the start",
  },
}

export const ArrowEnd: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "top",
    "arrow-position": "end",
    buttonText: "Arrow at End",
    content: "This tooltip has the arrow positioned at the end",
  },
}

export const DelayedTooltip: Story = {
  render: (args) => <TooltipWrapper {...args} />,
  args: {
    position: "top",
    "arrow-position": "center",
    delay: 500,
    buttonText: "Delayed Tooltip",
    content: "This tooltip appears after a 500ms delay",
  },
}

export const RichContent: Story = {
  render: (args) => (
    <TooltipWrapper
      {...args}
      content={
        <div style={{ maxWidth: "200px" }}>
          <h4 style={{ margin: "0 0 8px 0", fontWeight: 500 }}>Rich Tooltip</h4>
          <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
            Tooltips can contain rich content, including headings, paragraphs, and even images.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 16V12L9 9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Updated 2 hours ago
          </div>
        </div>
      }
    />
  ),
  args: {
    position: "bottom",
    "arrow-position": "start",
    buttonVariant: "outline",
    buttonText: "Rich Content",
  },
}

