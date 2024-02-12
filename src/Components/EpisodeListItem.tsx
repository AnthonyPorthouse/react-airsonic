import { ArrowDownTrayIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { SyntheticEvent, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../Providers/AuthProvider.js";
import { useTrackList } from "../Providers/TrackListProvider.js";
import {
  Episode,
  downloadEpisode,
  isDownloadedEpisode,
} from "../api/podcasts.js";
import Duration from "./Duration.js";
import PodcastContext from "./PodcastContext.js";

interface EpisodeListItemProps {
  episode: Episode;
}

function EpisodeListItem({ episode }: Readonly<EpisodeListItemProps>) {
  const { t } = useTranslation(["media", "podcasts"]);

  const tracks = useContext(PodcastContext);

  const auth = useAuth();

  const { getCurrentTrack, setTrackList } = useTrackList();

  const { refetch } = useQuery({
    queryKey: ["downloadPodcast", episode.id, auth.credentials],
    queryFn: () => downloadEpisode(episode.id, auth.credentials),
    enabled: false,
  });

  const play = (e: SyntheticEvent) => {
    e.preventDefault();

    const episodes = tracks.filter(isDownloadedEpisode);

    const startingIndex = episodes.findIndex((e) => e.id === episode.id);
    setTrackList(episodes.slice(startingIndex));
  };

  const download = (e: SyntheticEvent) => {
    e.preventDefault();
    refetch();
  };

  const playButton = (
    <button
      onClick={play}
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={t("media:playTrack")}
    >
      <PlayIcon className={`flex-shrink-0 w-6 md:w-full`} />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </button>
  );

  const nowPlaying = (
    <div
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={`Currently Playing`}
    >
      <PlayIcon className={`flex-shrink-0 w-6 md:w-full text-sunrise`} />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </div>
  );

  const downloadButton = (
    <button
      onClick={download}
      className={`flex gap-6 md:block w-full md:w-6 flex-shrink-0`}
      title={t("podcasts:downloadEpisode")}
    >
      <ArrowDownTrayIcon className={`flex-shrink-0 w-6 md:w-full`} />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </button>
  );

  const publishDate = useMemo(() => {
    return format(parseISO(episode.publishDate), "do LLLL yyyy");
  }, [episode]);

  if (isDownloadedEpisode(episode)) {
    return (
      <div className={`flex gap-6 overflow-hidden`}>
        {getCurrentTrack()?.id === episode.id ? nowPlaying : playButton}
        <div className={`flex-grow gap-6 hidden md:flex`}>
          <span className={`w-1/6 truncate`}>{publishDate}</span>
          <span className={`flex-grow w-0 truncate`}>{episode.title}</span>
          <span className={`text-right flex gap-2`}>
            <Duration
              time={Number(localStorage.getItem(`podcast_${episode.id}`) ?? 0)}
            />
            <span>/</span>
            <Duration time={episode.duration} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-6 overflow-hidden`}>
      {downloadButton}
      <div className={`flex-grow gap-6 hidden md:flex`}>
        <span className={`w-1/6 truncate`}>{publishDate}</span>
        <span className={`flex-grow w-0 truncate`}>{episode.title}</span>
        <span className={`text-right`}>&nbsp;</span>
      </div>
    </div>
  );
}

export default EpisodeListItem;
