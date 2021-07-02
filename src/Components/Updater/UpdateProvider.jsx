import UpdateContext from "./UpdateContext";

function UpdateProvider({ value, children }) {
  return (
    <UpdateContext.Provider value={value} displayName="UpdateContext">
      {children}
    </UpdateContext.Provider>
  );
}

export default UpdateProvider;

export { UpdateProvider };
