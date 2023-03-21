import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import {
  RootObject as GetPlaylistResponse,
  Item,
} from "~/server/api/types/getPlaylistResponse";
export interface IAppProps {
  onChange: (id: Item["id"], name: Item["name"]) => void;
  playlists: GetPlaylistResponse["items"];
}

export default function BasicSelect({ onChange, playlists }: IAppProps) {
  type PlaylistIdAndName = `${Item["id"]}:${Item["name"]}`;
  const [playlistIdAndName, setPlaylistIdAndName] = useState(
    null as PlaylistIdAndName | null
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as PlaylistIdAndName;
    setPlaylistIdAndName(value);
    onChange(...(value.split(":") as [id: string, name: string]));
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
          <MenuItem key={index} value={`${item.id}:${item.name}`}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
