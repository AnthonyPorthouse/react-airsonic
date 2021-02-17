import TrackListItem from "./TrackListItem";

function TrackList({ tracks }) {
  return (
    <ul className={`divide-y divide-gray-200`}>
      {tracks.map((track, i) => (
        <li
          className={`py-2 px-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
          key={track.id}
        >
          <TrackListItem track={track} />
        </li>
      ))}
    </ul>
  );
}

export default TrackList;
