import { Episode } from "@/api/types";
import { useEpisodes } from "@hooks/useEpisodes";
import { renderHook } from "@testing-library/react";

import { PodcastProvider } from "./PodcastProvider";

const testEpisode: Episode = {
  id: "s-1",
  status: "skipped",
  title: "test",
  description: "",
  publishDate: "",
};

describe(PodcastProvider, async () => {
  describe("with no episodes", async () => {
    it("renders an empty list", async () => {
      const { result } = renderHook(() => useEpisodes());
      expect(result.current).toEqual([]);
    });
  });

  describe("with episodes", async () => {
    it("returns the episodes", async () => {
      const { result } = renderHook(() => useEpisodes(), {
        wrapper: ({ children }) => (
          <PodcastProvider episodes={[testEpisode]}>{children}</PodcastProvider>
        ),
      });

      expect(result.current).toEqual([testEpisode]);
    });
  });
});
