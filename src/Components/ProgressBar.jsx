function ProgressBar({ length, position }) {
  const progress = (position / length) * 100;

  return (
    <div className={`bg-gray-200 h-4 w-full inline-block`}>
      <div
        className={`h-full bg-green-200`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
