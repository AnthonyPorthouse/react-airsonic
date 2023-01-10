import { ArrowDownTrayIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { SyntheticEvent, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../api/auth";
import { Episode, downloadEpisode, isDownloadedEpisode } from "../api/podcasts";
import { useTrackList } from "../hooks";
import Duration from "./Duration";
import PodcastContext from "./PodcastContext";

interface EpisodeListItemProps {
  episode: Episode;
}

function EpisodeListItem({ episode }: EpisodeListItemProps) {
  const { t } = useTranslation(["media", "podcasts"]);

  const tracks = useContext(PodcastContext);

  const auth = useAuth();

  const { getCurrentTrack, setTrackList } = useTrackList();

  const { refetch } = useQuery(
    ["downloadPodcast", episode.id],
    () => downloadEpisode(episode.id, auth.credentials),
    { enabled: false }
  );

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
      <PlayIcon className={`flex-shrink-0 w-6 md:w-full text-green-400`} />
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
          <span className={`text-right`}>
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
