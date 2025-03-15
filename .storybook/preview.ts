import type { Preview } from "@storybook/react"
import "../app/globals.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: "Small mobile",
          styles: {
            width: "320px",
            height: "568px",
          },
        },
        mobile2: {
          name: "Large mobile",
          styles: {
            width: "414px",
            height: "896px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        laptop: {
          name: "Laptop",
          styles: {
            width: "1366px",
            height: "768px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1920px",
            height: "1080px",
          },
        },
      },
    },
  },
}

export default preview

