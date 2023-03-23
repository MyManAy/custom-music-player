import { Root as PlaylistTracksResponse } from "~/server/api/types/getPlaylistTracksResponse";
import { getSpotifyClient } from "./spotify";
import { Song } from "~/components/BasicTable";

export const fetchPlaylistData = async (
  playlistId: string,
  token: string
): Promise<PlaylistTracksResponse> => {
  console.log(token);
  console.log(playlistId);
  const fetchedClient = getSpotifyClient(token);
  let total = Infinity;
  let queried = 0;
  let items = [] as PlaylistTracksResponse["items"];
  let data = {} as PlaylistTracksResponse;
  while (total > queried) {
    const res = await fetchedClient.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${queried}`
    );
    data = res.data as PlaylistTracksResponse;
    total = data.total;
    queried += data.items.length;
    items = items.concat(data.items);
  }
  return { ...data, items: items } as PlaylistTracksResponse;
};

export const convertDataToSongsFormat = (
  data: PlaylistTracksResponse,
  savedIds: string[]
): Song[] => {
  // songsAvailableToDownload.current = true;
  return data.items
    .filter(
      (item) =>
        !item.is_local &&
        item.track &&
        item.track.type === "track" &&
        item.track.id
    )
    .map((item) => {
      const track = item.track;
      return {
        cover: track.album.images[0]
          ? new URL(track.album.images[0].url)
          : null,
        title: track.name,
        artist: track.artists[0]?.name ?? "unknown",
        album: track.album.name,
        dateAdded: new Date(item.added_at),
        length_ms: track.duration_ms,
        mp3Loaded: savedIds.includes(track.id),
        id: track.id,
      };
    });
};

export const downloadSongs = (
  songs: Song[],
  savedIds: string[],
  songSetter: React.Dispatch<React.SetStateAction<Song[] | null>>
) => {
  const recentlyDownloaded = [] as string[];
  return songs.map((song) => async () => {
    if (savedIds.includes(song.id)) return;
    console.log("fetching: " + song.id);
    try {
      await fetch(`http://localhost:9999/${song.id}`);
    } catch {
      console.log("oops again");
    } finally {
      console.log(songs);
      songSetter(
        songs.map((currentSong) =>
          currentSong.id === song.id
            ? { ...song, mp3Loaded: true }
            : recentlyDownloaded.includes(currentSong.id)
            ? { ...currentSong, mp3Loaded: true }
            : currentSong
        )
      );
      recentlyDownloaded.push(song.id);
    }
  });
};
