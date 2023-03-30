/* eslint-disable react-hooks/exhaustive-deps */
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Spinner from "~/components/Spinner";
import { getAccessToken } from "~/utils/spotify";

type BooleanString = "true" | "false" | undefined | "";

const myFunc = async (authTimedOut: BooleanString) => {
  const token = await getAccessToken(window, Boolean(authTimedOut));
  console.log(token);
  if (token) {
    router.push(`/home/${token}`).catch(() => console.log("didn't work"));
  }
};

const PreLogin = () => {
  const router = useRouter();
  const [port, setPort] = useState(null as number | null);
  const authTimedOut = router.query["authTimedOut"] as BooleanString;

  useEffect(() => {
    myFunc(authTimedOut).catch(() => console.log("uh oh"));
    setPort(Number(window.location.port));
  }, []);

  return <Layout>{port ? <Login port={port} /> : <Spinner />}</Layout>;
};

export default PreLogin;
