"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useEffect } from "react"


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Navbar",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj

// This component wrapper is needed because Storybook doesn't directly support Web Components
const NavbarWrapper = (args: any) => {
  useEffect(() => {
    // Ensure the custom element is defined
    if (!customElements.get("ui-navbar")) {
      import("../../components/navbar/navbar")
    }
  }, [])

  return (
    // @ts-ignore
    <ui-navbar {...args}>
      <span slot="brand">Acme Inc</span>
      <div slot="links">
        <a href="#" className="px-3 py-2">
          Home
        </a>
        <a href="#" className="px-3 py-2">
          Features
        </a>
        <a href="#" className="px-3 py-2">
          Pricing
        </a>
        <a href="#" className="px-3 py-2">
          About
        </a>
      </div>
      <div slot="right">
        <button className="px-3 py-1 bg-blue-500 text-white rounded">Sign In</button>
      </div>
      {/* @ts-ignore */}
    </ui-navbar>
  )
}

export const Default: Story = {
  render: () => <NavbarWrapper logo="/placeholder.svg?height=30&width=30" />,
}

export const DarkTheme: Story = {
  render: () => <NavbarWrapper logo="/placeholder.svg?height=30&width=30" theme="dark" />,
}

export const WithoutLogo: Story = {
  render: () => <NavbarWrapper />,
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <NavbarWrapper logo="/placeholder.svg?height=30&width=30" />,
}

