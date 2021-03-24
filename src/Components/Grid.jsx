function Grid({ className, children }) {
  return (
    <ul
      className={`grid ${
        className ? className : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
      }  gap-6`}
    >
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}

export default Grid;
