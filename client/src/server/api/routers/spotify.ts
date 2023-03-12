import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { getPlaylists, spotifyClient } from "~/utils/spotify";

import { AxiosResponse } from "axios";

import getPlaylistResponseZod from "../types/_getPlaylistResponse";

// interface InternalAxiosResponse<SpotifyAPIResponse> {
//   data: SpotifyAPIResponse;
// }

type Res<T> = Promise<AxiosResponse<T>>;

export const spotifyRouter = createTRPCRouter({
  getPlaylists: publicProcedure
    .output(z.object({ data: getPlaylistResponseZod }))
    .query(() => {
      return spotifyClient.get(`https://api.spotify.com/v1/me/playlists`);
    }),
});
