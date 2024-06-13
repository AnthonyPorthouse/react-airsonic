import { Songs } from "@api/songs.js";
import { createContext } from "react";

const AlbumContext = createContext<Songs>([]);

export default AlbumContext;
