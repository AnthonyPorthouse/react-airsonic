import { downloadEpisode, isDownloadedEpisode } from "@/api/podcasts.js";
import { Episode } from "@api/types.js";
import { useAuth } from "@hooks/useAuth.js";
import { useEpisodes } from "@hooks/useEpisodes.js";
import { useTrackList } from "@hooks/useTrackList.js";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { Download, Play } from "lucide-react";
import { SyntheticEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Duration from "./Duration.js";

interface EpisodeListItemProps {
  episode: Episode;
}

function EpisodeListItem({ episode }: Readonly<EpisodeListItemProps>) {
  const { t } = useTranslation(["media", "podcasts"]);

  const tracks = useEpisodes();

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
      className={`flex w-full shrink-0 gap-6 md:block md:w-6`}
      title={t("media:playTrack")}
    >
      <Play className={`w-6 shrink-0 fill-black md:w-full`} />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </button>
  );

  const nowPlaying = (
    <div
      className={`flex w-full shrink-0 gap-6 md:block md:w-6`}
      title={`Currently Playing`}
    >
      <Play
        className={`w-6 shrink-0 fill-green-400 text-green-400 md:w-full`}
      />
      <span className={`truncate md:hidden`}>{episode.title}</span>
    </div>
  );

  const downloadButton = (
    <button
      onClick={download}
      className={`flex w-full shrink-0 gap-6 md:block md:w-6`}
      title={t("podcasts:downloadEpisode")}
    >
      <Download className={`w-6 shrink-0 md:w-full`} />
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
        <div className={`hidden grow gap-6 md:flex`}>
          <span className={`w-1/6 truncate`}>{publishDate}</span>
          <span className={`w-0 grow truncate`}>{episode.title}</span>
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
      <div className={`hidden grow gap-6 md:flex`}>
        <span className={`w-1/6 truncate`}>{publishDate}</span>
        <span className={`w-0 grow truncate`}>{episode.title}</span>
        <span className={`text-right`}>&nbsp;</span>
      </div>
    </div>
  );
}

export default EpisodeListItem;
