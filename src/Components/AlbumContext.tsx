import type { Songs } from "@api/types.js";
import { createContext } from "react";

const AlbumContext = createContext<Songs>([]);

export default AlbumContext;
