import type { StorybookConfig } from "@storybook/experimental-nextjs-vite"

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {
      nextConfigPath: "false", // Disable Next.js config
      builder: {
        viteConfigPath: "vitest.config.ts",
      },
    },
  },
  docs: {
    defaultName: "Web Components Library",
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    // Customize Vite config here
    return {
      ...config,
      define: {
        ...config.define,
        // Ensure global is defined for web components
        global: "window",
      },
      resolve: {
        ...config.resolve,
        // Add any aliases if needed
        alias: {
          ...config.resolve?.alias,
          "@": "/",
        },
      },
      // Disable SSR for web components
      ssr: {
        noExternal: ["web-components-lib"],
      },
    }
  },
}

export default config

