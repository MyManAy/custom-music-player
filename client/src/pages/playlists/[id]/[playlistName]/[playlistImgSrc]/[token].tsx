/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BasicTable from "~/components/BasicTable";
import { useRouter } from "next/router";
import Spinner from "~/components/Spinner";
import { type SelectedSongDisplay } from "~/components/SongDisplay";
import BottomPlayer from "~/components/BottomPlayer";
import {
  fetchPlaylistData,
  convertDataToSongsFormat,
  getRandomSongId,
} from "~/utils/playlistsFunctions";
import { Howl } from "howler";
import Actions, { type Action } from "~/components/Actions";
import MusicSlider from "~/components/MusicSlider";
import { match, P } from "ts-pattern";
import type { Song } from "~/components/BasicTable";
import Layout from "~/components/Layout";
import Image from "next/image";
import type { GetServerSidePropsContext } from "next";
import type { Root } from "~/types/getPlaylistTracksResponse";
import reauthenticate from "~/utils/reauthenticate";

const baseDownloadUrl = "http://localhost:9999";

interface StaticProps {
  savedIds: string[];
  data: Root;
  playlistImgSrc: string;
  playlistName: string;
}

const Playlist = ({
  savedIds,
  data,
  playlistImgSrc,
  playlistName,
}: StaticProps) => {
  const router = useRouter();
  const [songs, setSongs] = useState(convertDataToSongsFormat(data, savedIds));
  const [howl, setHowl] = useState(null as null | Howl);
  const [currentSongId, setCurrentSongId] = useState(null as null | string);
  const [secsPlayed, setSecsPlayed] = useState(0);
  const [timer, setTimer] = useState(null as null | NodeJS.Timer);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const downloadSongs = (songs: Song[]) => {
    const recentlyDownloaded = [] as string[];
    return songs.map((song) => async () => {
      if (savedIds.includes(song.id)) return;
      try {
        await fetch(`${baseDownloadUrl}/${song.id}`);
      } catch {
        console.log("oops again");
      } finally {
        setSongs(
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

  const nextSongOnEnd = (sound: Howl) => {
    sound.on("end", () => {
      nextSong();
    });
  };

  const startTimerOnPlay = (sound: Howl) => {
    sound.on("play", () => {
      const interval = setInterval(() => {
        setSecsPlayed((secsPlayed) => secsPlayed + 1);
      }, 1000);
      setTimer(interval);
    });
  };

  const pause = () => {
    howl?.pause();
    clearInterval(timer as NodeJS.Timer);
    setTimer(null);
  };

  const playPause = () => {
    if (howl?.playing()) pause();
    else {
      howl?.seek(secsPlayed);
      howl?.play();
    }
  };

  const stopSong = () => {
    Howler.unload();
    if (timer) clearInterval(timer);
    setTimer(null);
    setSecsPlayed(0);
  };

  const nextSong = () => {
    if (isShuffled)
      setCurrentSongId((id) => {
        const randomId = getRandomSongId(songs);
        if (id === randomId) return id.concat(" ");
        return randomId;
      });
    else if (isRepeated)
      setCurrentSongId((id) => (id as unknown as string).concat(" "));
    else makeSongGo("forward");
  };

  const makeSongGo = (action: "forward" | "previous") => {
    const definedSongs = songs.filter((song) => song.mp3Loaded);
    const index = definedSongs.findIndex(
      ({ id }) => id === currentSongId?.trim()
    );
    const shift = action === "forward" ? 1 : -1;
    const songToGoTo = definedSongs[index + shift];
    setCurrentSongId((songToGoTo ?? (definedSongs[0] as Song)).id);
  };

  const handleSongSelect = (id: string) => {
    if (currentSongId?.trim() === id) playPause();
    else setCurrentSongId(id);
  };

  const handleSlide = (secs: number) => {
    setSecsPlayed(secs);
    howl?.seek(secs);
  };

  const handleActionClick = (action: Action) =>
    match<Action, void>(action)
      .with("playPause", () => {
        if (!howl && songs) setCurrentSongId((songs[0] as Song).id);
        playPause();
      })
      .with("repeat", () => {
        if (isShuffled) setIsShuffled(false);
        setIsRepeated((isRepeated) => !isRepeated);
      })
      .with("shuffle", () => {
        if (isRepeated) setIsRepeated(false);
        setIsShuffled((isShuffled) => !isShuffled);
      })
      .with(P.select(), (action) => {
        if (isRepeated || isShuffled) nextSong();
        else makeSongGo(action);
      })
      .exhaustive();

  const findCurrentSong = (id?: string | null) =>
    songs.find((item) => item.id === id);

  const getCurrentSongDisplay = (
    id: string
  ): SelectedSongDisplay | undefined => {
    const song = findCurrentSong(id);
    if (song)
      return {
        imgSrc: song.cover as string | null,
        title: song.title,
        artist: song.artist,
      };
    return undefined;
  };

  const onVolumeChange = (volume: number) => {
    const percentage = volume / 100;
    Howler.volume(percentage);
  };

  useEffect(() => {
    (async () => {
      for (const download of downloadSongs(songs)) {
        try {
          await download();
        } catch {
          console.log("oops");
        }
      }
    })().catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", () => Howler.stop());
    return () => {
      router.events.off("routeChangeStart", () => Howler.stop());
    };
  }, [router]);

  useEffect(() => {
    stopSong();
    const sound = new Howl({
      src: currentSongId ? `/songs/${currentSongId.trim()}.mp3` : `/songs/.mp3`,
    });
    startTimerOnPlay(sound);
    nextSongOnEnd(sound);
    setHowl(sound);
    sound.play();
  }, [currentSongId]);

  useEffect(() => {
    if (howl) nextSongOnEnd(howl);
    return () => {
      howl?.off("end");
    };
  }, [isShuffled, isRepeated]);

  return (
    <Layout
      title={findCurrentSong(currentSongId?.trim())?.title ?? playlistName}
      tailwindPadding="px-4 pt-16 pb-32"
    >
      <div className="flex flex-row items-center justify-center gap-6">
        {playlistImgSrc !== "no-image" ? (
          <Image
            src={playlistImgSrc}
            alt="playlist image not found"
            width={240}
            height={240}
          ></Image>
        ) : (
          <></>
        )}
        <h1 className="text-8xl font-bold tracking-tighter text-black">
          {playlistName}
        </h1>
      </div>

      {songs ? (
        <BasicTable
          songs={songs}
          onRowClick={handleSongSelect}
          currentlyPlayingSongId={currentSongId?.trim() ?? undefined}
        />
      ) : (
        <Spinner />
      )}
      <BottomPlayer
        selectedSongDisplay={
          getCurrentSongDisplay(
            currentSongId?.trim() as string
          ) as SelectedSongDisplay
        }
        onVolumeChange={onVolumeChange}
      >
        <Actions
          onClickAny={handleActionClick}
          isPlaying={howl?.playing()}
          isRepeated={isRepeated}
          isShuffled={isShuffled}
        />
        <MusicSlider
          secs={secsPlayed}
          length={howl?.duration() ?? 0}
          onChange={(secs) => handleSlide(secs)}
        />
      </BottomPlayer>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const token = context.params!.token as string;
    const id = context.params!.id as string;
    const playlistName = context.params!.playlistName as string;
    const playlistImgSrc = context.params!.playlistImgSrc as string;

    const res = await fetch(`${baseDownloadUrl}/getSavedIds`);
    const savedIds = (await res.json()) as unknown as string[];

    const data = await fetchPlaylistData(id, token);

    return {
      props: {
        data,
        savedIds,
        playlistName,
        playlistImgSrc,
      },
    };
  } catch {
    return reauthenticate;
  }
}

export default Playlist;
