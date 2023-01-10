import { Album } from "./albums";
import { Credentials, generateAuthParams, sanitizeServer } from "./auth";
import { Song, Songs } from "./songs";

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
  episode: Episode
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
    `${sanitizeServer(server)}/rest/getPodcasts?${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  return json["subsonic-response"].podcasts.channel;
}

export async function getPodcast(
  id: string,
  { server, username, password }: Credentials
): Promise<[Podcast, Episode[]]> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(server)}/rest/getPodcasts?id=${id}&${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  const json = await result.json();

  let { episode: episodes, ...podcast } =
    json["subsonic-response"].podcasts.channel[0];

  episodes = episodes.map((episode: Episode) => {
    if (isDownloadedEpisode(episode)) {
      episode.id = episode.streamId;
    }

    return episode;
  });

  return [podcast, episodes];
}

export async function downloadEpisode(
  id: string,
  { server, username, password }: Credentials
): Promise<true> {
  const authParams = generateAuthParams({ username, password });
  const result = await fetch(
    `${sanitizeServer(
      server
    )}/rest/downloadPodcastEpisode?id=${id}&${authParams}`
  );

  if (!result.ok) {
    throw new Error("Network Request Failed");
  }

  return true;
}
