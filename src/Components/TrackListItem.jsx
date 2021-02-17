function TrackListItem({ track }) {
  return (
    <div>
      {track.discNumber ? `${track.discNumber} / ` : null}
      {` ${track.track} `} - {track.title}
    </div>
  );
}

export default TrackListItem;
