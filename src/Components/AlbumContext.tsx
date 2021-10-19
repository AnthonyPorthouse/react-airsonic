import { createContext } from "react";
import {Songs} from "../app/features/api";

const AlbumContext = createContext<Songs>([]);

export default AlbumContext;
