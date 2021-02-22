import TrackListItem from "./TrackListItem";
import AlbumContext from "./AlbumContext";

function TrackList({ tracks }) {
  return (
    <AlbumContext.Provider value={tracks}>
      <section className={`flex-auto self-start w-full`}>
        <h1 className={`text-xl`}>Tracks</h1>
        <ul className={`divide-y divide-gray-200 border border-grey-200`}>
          {tracks.map((track, i) => (
            <li
              className={`py-2 px-4 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
              key={track.id}
            >
              <TrackListItem track={track} />
            </li>
          ))}
        </ul>
      </section>
    </AlbumContext.Provider>
  );
}

export default TrackList;
