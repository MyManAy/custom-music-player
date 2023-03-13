import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { getSpotifyClient } from "~/utils/spotify";

import { AxiosStatic } from "axios";

import getPlaylistResponseZod from "../types/_getPlaylistResponse";
import windowZod from "../types/_test";

export const spotifyRouter = createTRPCRouter({
  getPlaylists: publicProcedure
    .input(z.object({ window: windowZod }))
    .output(z.object({ data: getPlaylistResponseZod }))
    .query(({ input }) => {
      return getSpotifyClient(input.window).get(
        `https://api.spotify.com/v1/me/playlists`
      );
    }),
});

// CHANGE THIS TO REQ-RES REGULAR OLD NEXT JS THINGY
