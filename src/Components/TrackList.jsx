import TrackListItem from "./TrackListItem";

function TrackList({ tracks }) {
  return (
    <ul>
      {tracks.map((track) => (
        <li key={track.id}>
          <TrackListItem track={track} />
        </li>
      ))}
    </ul>
  );
}

export default TrackList;
