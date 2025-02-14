import { NotFoundError, notFound } from "@tanstack/react-router";
import axios from "axios";

import {
  Credentials,
  generateAuthParamsObject,
  sanitizeServer,
} from "./auth.js";
import {
  DownloadedEpisode,
  Episode,
  ErrorResponse,
  Podcast,
  Podcasts,
  SuccessResponse,
  isErrorMessage,
} from "./types.js";

export type PodcastsResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        podcasts: {
          channel?: Podcasts;
        };
      };
    })
  | ErrorResponse;
export type PodcastResponse =
  | (SuccessResponse & {
      "subsonic-response": {
        podcasts: {
          channel: [Podcast & { episode: Episode[] }];
        };
      };
    })
  | ErrorResponse;

export async function getPodcasts({
  server,
  username,
  password,
}: Credentials): Promise<Podcasts | NotFoundError> {
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

  if (isErrorMessage(result.data)) {
    return notFound();
  }

  return result.data["subsonic-response"].podcasts?.channel ?? [];
}

export async function getPodcast(
  id: string,
  { server, username, password }: Credentials,
): Promise<[Podcast, Episode[]] | NotFoundError> {
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

  if (
    isErrorMessage(result.data) ||
    Object.entries(result.data["subsonic-response"].podcasts).length === 0
  ) {
    return notFound();
  }

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
