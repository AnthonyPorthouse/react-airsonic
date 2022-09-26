import { createContext } from "react";

import { Songs } from "../api/songs";

const AlbumContext = createContext<Songs>([]);
AlbumContext.displayName = "Album";

export default AlbumContext;
