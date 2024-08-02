import axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import { DownloadedEpisode, Episode, Podcast, Podcasts } from "./types.js";

export interface PodcastsResponse {
  "subsonic-response": {
    podcasts: {
      channel: Podcasts;
    };
  };
}
export interface PodcastResponse {
  "subsonic-response": {
    podcasts: {
      channel: [Podcast & { episode: Episode[] }];
    };
  };
}

export async function getPodcasts({
  server,
  username,
  password,
}: Credentials): Promise<Podcasts> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await axios.get<PodcastsResponse>(
    `${serverUrl}/rest/getPodcasts.view`,
    {
      params: {
        ...authParams,
        includeEpisodes: false,
      },
    },
  );

  return result.data["subsonic-response"].podcasts.channel;
}

export async function getPodcast(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Podcast, Episode[]]> {
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  const result = await axios.get<PodcastResponse>(
    `${serverUrl}/rest/getPodcasts.view`,
    {
      params: {
        ...authParams,
        id,
      },
    },
  );

  const { episode: episodes, ...podcast } =
    result.data["subsonic-response"].podcasts.channel[0];

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
  const authParams = generateAuthParamsObject({ username, password });
  const serverUrl = sanitizeServer(server);

  await axios.get(`${serverUrl}/rest/downloadPodcastEpisode.view`, {
    params: {
      ...authParams,
      id,
    },
  });

  return true;
}

export function isDownloadedEpisode(
  episode: Episode,
): episode is DownloadedEpisode {
  return episode.status === "completed";
}
