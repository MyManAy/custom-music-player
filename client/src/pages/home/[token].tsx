/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getSpotifyClient } from "~/utils/spotify";
import router from "next/router";
import SelectPlaylist from "~/components/SelectPlaylist";
import type { RootObject as GetPlaylistResponse } from "~/types/getPlaylistResponse";
import Layout from "~/components/Layout";
import type { GetServerSidePropsContext } from "next";
import reauthenticate from "~/utils/reauthenticate";

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

const Home = ({
  data,
  token,
}: {
  data: GetPlaylistResponse;
  token: string;
}) => {
  return (
    <Layout>
      <h1 className="text-6xl text-black">Hello World</h1>
      <div></div>
      <SelectPlaylist
        playlists={data.items}
        onChange={(id, name, imgSrc) => {
          handlePlaylistSelect(id, token, name, imgSrc).catch(() =>
            console.log("anotha one")
          );
        }}
      ></SelectPlaylist>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const token = context.params!.token as string;
    const fetchedClient = getSpotifyClient(token);
    const res = await fetchedClient.get(
      `https://api.spotify.com/v1/me/playlists`
    );

    const data = res.data as GetPlaylistResponse;

    return {
      props: {
        data,
        token,
      },
    };
  } catch {
    return reauthenticate;
  }
}

export default Home;
