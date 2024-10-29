import { AuthProvider } from "@/Providers/AuthProvider";
import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, http } from "msw";

import HoverableAlbumArt from "./HoverableAlbumArt";

const meta: Meta<typeof HoverableAlbumArt> = {
  title: "Components/HoverableAlbumArt",
  component: HoverableAlbumArt,

  decorators: [
    (Story) => (
      <AuthProvider defaultServer="https://example.com">
        <div className="w-64">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],

  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        http.get("https://example.com/rest/getCoverArt.view", () => {
          return new HttpResponse(null, {
            status: 307,
            headers: [["Location", "https://placecats.com/300/300"]],
          });
        }),
      ],
    },
  },

  tags: ["autodocs"],

  args: {
    coverArt: "al-123",
    artDescription: "Bon Jovi - One Wild night",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithArtwork: Story = {};

export const NoArtworkFound: Story = {
  args: {
    coverArt: "",
  },
};

export const DifferentDescription: Story = {
  args: {
    coverArt: "",
    artDescription: "Aerosmith - Nine Lives",
  },
};
