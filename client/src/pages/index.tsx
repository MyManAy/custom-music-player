/* eslint-disable react-hooks/exhaustive-deps */
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Spinner from "~/components/Spinner";
import { getAccessToken } from "~/utils/spotify";

type BooleanString = "true" | "false" | undefined | "";

const myFunc = async (authTimedOut: BooleanString, accessToken: string) => {
  const token = await getAccessToken(window, Boolean(authTimedOut));
  if (token)
    router
      .push(`/home/${accessToken !== token ? accessToken : token}`)
      .catch(() => console.log("didn't work"));
};

const PreLogin = () => {
  const router = useRouter();
  const [port, setPort] = useState(null as number | null);
  const authTimedOut = router.query["authTimedOut"] as BooleanString;
  const accessToken = router.query["access_token"] as string;

  useEffect(() => {
    myFunc(authTimedOut, accessToken).catch(() => console.log("uh oh"));
    setPort(Number(window.location.port));
  }, [router.isReady]);

  return <Layout>{port ? <Login port={port} /> : <Spinner />}</Layout>;
};

export default PreLogin;
