import { Songs } from "@/api/types";
import { createContext } from "react";

export const AlbumContext = createContext<Songs>([]);
