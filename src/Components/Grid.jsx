function Grid({ children }) {
  return (
    <ul className={`grid grid-cols-6 gap-6`}>
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}

export default Grid;
