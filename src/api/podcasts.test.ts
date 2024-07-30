import axios from "axios";

import {
  PodcastResponse,
  PodcastsResponse,
  getPodcast,
  getPodcasts,
} from "./podcasts";
import { Episode, Podcast } from "./types";

const testPodcast: Podcast = {
  id: "p-1",
  url: "",
  title: "",
  description: "",
  coverArt: "",
  originalImageUrl: "",
  status: "",
};

const testEpisode: Episode = {
  id: "s-1",
  status: "skipped",
  title: "",
  description: "",
  publishDate: "",
};

describe(getPodcasts, async () => {
  const axiosGetMock = vi.mocked(axios.get);

  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns podcasts on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          podcasts: {
            channel: [testPodcast],
          },
        },
      } as PodcastsResponse,
    });

    const res = await getPodcasts({
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res).toEqual([testPodcast]);
  });
});

describe(getPodcast, async () => {
  const axiosGetMock = vi.mocked(axios.get);

  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a podcast and its episodes on success", async () => {
    axiosGetMock.mockResolvedValueOnce({
      data: {
        "subsonic-response": {
          podcasts: {
            channel: [
              {
                ...testPodcast,
                episode: [testEpisode],
              },
            ],
          },
        },
      } as PodcastResponse,
    });

    const res = await getPodcast("p-1", {
      server: "https://example.com",
      username: "test",
      password: "test",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res).toEqual([testPodcast, [testEpisode]]);
  });
});
