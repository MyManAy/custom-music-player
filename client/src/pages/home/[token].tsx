/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getSpotifyClient } from "~/utils/spotify";
import router, { useRouter } from "next/router";
import SelectPlaylist from "~/components/SelectPlaylist";
import Spinner from "~/components/Spinner";
import type { RootObject as GetPlaylistResponse } from "~/types/getPlaylistResponse";
import Layout from "~/components/Layout";

const redirect = async () => {
  await router.push({ pathname: `/`, query: { authTimedOut: true } });
};

const fetchPlaylistData = async (
  token: string
): Promise<GetPlaylistResponse> => {
  const fetchedClient = getSpotifyClient(token);
  const res = await fetchedClient.get(
    `https://api.spotify.com/v1/me/playlists`
  );
  return res.data as GetPlaylistResponse;
};

const handlePlaylistSelect = async (
  playlistId: string,
  token: string,
  playlistName: string,
  playlistImgSrc: string
) => {
  await router.push({
    pathname: `/playlists/${playlistId}/${playlistName}/${encodeURIComponent(
      playlistImgSrc
    )}/${token}`,
  });
};

const Home = () => {
  const router = useRouter();
  const givenToken = router.query["token"];
  const [playlistData, setPlaylistData] = React.useState(
    null as null | GetPlaylistResponse
  );

  React.useEffect(() => {
    if (router.isReady) {
      (async () => {
        const data = await fetchPlaylistData(givenToken as unknown as string);
        setPlaylistData(data);
      })().catch(() => {
        redirect().catch(() => console.log("uhh"));
      });
    }
  }, [router.isReady]);

  return (
    <Layout>
      <h1 className="text-6xl text-black">Hello World</h1>
      <div></div>
      {playlistData ? (
        <SelectPlaylist
          playlists={playlistData.items}
          onChange={(id, name, imgSrc) => {
            handlePlaylistSelect(
              id,
              givenToken as unknown as string,
              name,
              imgSrc
            ).catch(() => console.log("anotha one"));
          }}
        ></SelectPlaylist>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default Home;
