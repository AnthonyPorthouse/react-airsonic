import { createContext } from "react";

import { Songs } from "../api/songs.js";

const AlbumContext = createContext<Songs>([]);
AlbumContext.displayName = "Album";

export default AlbumContext;
