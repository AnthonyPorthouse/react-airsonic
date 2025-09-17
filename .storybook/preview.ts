import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";

import "../src/index.css";

initialize();

const preview: Preview = {
  loaders: [mswLoader],

  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
