import { Credentials, generateAuthParams, sanitizeServer } from "./auth.js";
import { Song } from "./songs.js";

export type Podcast = {
  id: string;
  url: string;
  title: string;
  description: string;
  coverArt: string;
  originalImageUrl: string;
  status: string;
};

export type Podcasts = Podcast[];

export type SkippedEpisode = {
  id: string;
  status: "skipped";
  title: string;
  description: string;
  publishDate: string;
};

export type DownloadedEpisode = Song & {
  status: "completed";
  publishDate: string;
  streamId: string;
};

export type Episode = SkippedEpisode | DownloadedEpisode;

export function isDownloadedEpisode(
  episode: Episode,
): episode is DownloadedEpisode {
  return episode.status === "completed";
}

export async function getPodcasts({
  server,
  username,
  password,
}: Credentials): Promise<Podcasts> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getPodcasts.view?${authParams}`,
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  return json["subsonic-response"].podcasts.channel;
}

export async function getPodcast(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Podcast, Episode[]]> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getPodcasts.view?id=${id}&${authParams}`,
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  const { episode: episodes, ...podcast } =
    json["subsonic-response"].podcasts.channel[0];

  const mappedEpisodes = episodes.map((episode: Episode) => {
    if (isDownloadedEpisode(episode)) {
      episode.id = episode.streamId;
      episode.isPodcast = true;
    }

    return episode;
  });

  return [podcast, mappedEpisodes];
}

export async function downloadEpisode(
  id: string,
  { server, username, password }: Credentials,
): Promise<true> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(
      server,
    )}/rest/downloadPodcastEpisode.view?id=${id}&${authParams}`,
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  return true;
}
