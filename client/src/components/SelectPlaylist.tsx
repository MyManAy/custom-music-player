import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import type {
  RootObject as GetPlaylistResponse,
  Item,
} from "~/types/getPlaylistResponse";

export interface IAppProps {
  onChange: (
    id: Item["id"],
    name: Item["name"],
    imgSrc: Item["images"][0]["url"]
  ) => void;
  playlists: GetPlaylistResponse["items"];
}

export default function BasicSelect({ onChange, playlists }: IAppProps) {
  type PlaylistIdAndName =
    `${Item["id"]}\0${Item["name"]}\0${Item["images"][0]["url"]}`;
  const [playlistIdAndName, setPlaylistIdAndName] = useState(
    null as PlaylistIdAndName | null
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as PlaylistIdAndName;
    setPlaylistIdAndName(value);
    onChange(
      ...(value.split("\0") as [id: string, name: string, imgSrc: string])
    );
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Playlist</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={playlistIdAndName ?? undefined}
        onChange={handleChange}
        label="Playlist"
      >
        {playlists.map((item, index) => (
          <MenuItem
            key={index}
            value={`${item.id}\0${item.name}\0${
              item.images[0]?.url ?? "no-image"
            }`}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
