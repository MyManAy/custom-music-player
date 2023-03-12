import { Box, FormControl, NativeSelect } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";

// const getPlaylistNames = async () => {
//   const hello = api.spotify.getPlaylists.useQuery();
//   const smth = await hello.data?.data.items;
// };

export interface IAppProps {
  onChange: (id: string) => void;
}

export default function BasicSelect({ onChange }: IAppProps) {
  // const [playlists] = createResource(getPlaylistNames);
  const [playlist, setPlaylist] = useState("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPlaylist(value);
    onChange(playlist);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "200px" }}>
        <NativeSelect onChange={handleChange}>
          {/* <For each={playlists()}>
            {(item) => <option value={item.id}>{item.name}</option>}
          </For> */}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
