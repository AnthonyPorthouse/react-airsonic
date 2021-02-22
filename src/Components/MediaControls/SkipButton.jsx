import { ReactComponent as FastForward } from "../../images/fast-forward.svg";
import { getNextTrack } from "../../features/playlistSlice";
import { useDispatch } from "react-redux";

function SkipButton() {
  const dispatch = useDispatch();
  /**
   * @type audio {Audio}
   */

  const skipTrack = (e) => {
    e.preventDefault();
    dispatch(getNextTrack());
  };

  return (
    <button
      onClick={skipTrack}
      className={`inline-block w-12`}
      title={`Next Track`}
    >
      <FastForward className={`w-full`} />
    </button>
  );
}

export default SkipButton;
