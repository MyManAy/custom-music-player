import { getSpotifyClient } from "./spotify";
import type { Root as PlaylistTracksResponse } from "~/types/getPlaylistTracksResponse";
import type { Song } from "~/components/BasicTable";

export const fetchPlaylistData = async (
  playlistId: string,
  token: string
): Promise<PlaylistTracksResponse> => {
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

export const getRandomSongId = (songs: Song[]): string => {
  const randomSong = songs[
    Math.floor(Math.random() * songs.length)
  ] as unknown as Song;
  if (!randomSong?.mp3Loaded) return getRandomSongId(songs);
  return randomSong.id;
};
