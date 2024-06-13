import {
  Episode,
  downloadEpisode,
  isDownloadedEpisode,
} from "@api/podcasts.js";
import { ArrowDownTrayIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@providers/AuthProvider.js";
import { useTrackList } from "@providers/TrackListProvider.js";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { SyntheticEvent, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

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
      className={`flex w-full flex-shrink-0 gap-6 md:block md:w-6`}
      title={t("media:playTrack")}
    >
      <PlayIcon className={`w-6 flex-shrink-0 md:w-full`} />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </button>
  );

  const nowPlaying = (
    <div
      className={`flex w-full flex-shrink-0 gap-6 md:block md:w-6`}
      title={`Currently Playing`}
    >
      <PlayIcon className={`w-6 flex-shrink-0 text-green-400 md:w-full`} />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </div>
  );

  const downloadButton = (
    <button
      onClick={download}
      className={`flex w-full flex-shrink-0 gap-6 md:block md:w-6`}
      title={t("podcasts:downloadEpisode")}
    >
      <ArrowDownTrayIcon className={`w-6 flex-shrink-0 md:w-full`} />
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
        <div className={`hidden flex-grow gap-6 md:flex`}>
          <span className={`w-1/6 truncate`}>{publishDate}</span>
          <span className={`w-0 flex-grow truncate`}>{episode.title}</span>
          <span className={`flex gap-2 text-right`}>
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
      <div className={`hidden flex-grow gap-6 md:flex`}>
        <span className={`w-1/6 truncate`}>{publishDate}</span>
        <span className={`w-0 flex-grow truncate`}>{episode.title}</span>
        <span className={`text-right`}>&nbsp;</span>
      </div>
    </div>
  );
}

export default EpisodeListItem;
