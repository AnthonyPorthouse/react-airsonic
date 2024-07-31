import { Episode } from "@/api/types";
import { render, screen } from "@testing-library/react";

import { PodcastProvider, useEpisodes } from "./PodcastProvider";

function TestComponent() {
  const episodes = useEpisodes();

  return (
    <ul>
      {episodes.map((episode) => (
        <li data-testid={episode.id} key={episode.id}>
          {episode.id} {episode.status} {episode.title}
        </li>
      ))}
    </ul>
  );
}

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
      render(
        <PodcastProvider episodes={[]}>
          <TestComponent />
        </PodcastProvider>,
      );

      const list = await screen.findByRole("list");

      expect(list).toBeEmptyDOMElement();
    });
  });

  describe("with episodes", async () => {
    it("returns the episodes", async () => {
      render(
        <PodcastProvider episodes={[testEpisode]}>
          <TestComponent />
        </PodcastProvider>,
      );

      const list = await screen.findByRole("list");

      expect(list).not.toBeEmptyDOMElement();

      const item = await screen.findByRole("listitem");

      expect(item).toHaveTextContent("s-1 skipped test");
    });
  });
});
