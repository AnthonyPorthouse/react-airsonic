import { createContext } from "react";

import { Songs } from "../api/songs.js";

const AlbumContext = createContext<Songs>([]);

export default AlbumContext;
