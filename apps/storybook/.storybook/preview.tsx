import * as React from "react";
import type { Preview } from "@storybook/react";
import { AppThemeProvider } from "@org/ui";

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Brand theme",
      defaultValue: "default",
      toolbar: {
        title: "Brand",
        items: ["default", "cozepto", "edprinter"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => (
      <AppThemeProvider brand={ctx.globals.brand}>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </AppThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;
