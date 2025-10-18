import type { Preview } from "@storybook/react";
import { NextIntlProvider } from "next-intl";
import zhCN from "../src/messages/zh-CN.json";
import { AppProviders } from "../src/providers/app-providers";
import "../src/app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <NextIntlProvider locale="zh-CN" messages={zhCN}>
        <AppProviders>
          <div className="bg-surface p-8">
            <Story />
          </div>
        </AppProviders>
      </NextIntlProvider>
    ),
  ],
};

export default preview;
