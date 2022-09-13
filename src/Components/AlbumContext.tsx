import { createContext } from "react";
import { Songs } from "../api/songs";

const AlbumContext = createContext<Songs>([]);

export default AlbumContext;
