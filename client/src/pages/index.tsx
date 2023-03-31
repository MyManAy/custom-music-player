/* eslint-disable react-hooks/exhaustive-deps */
import router from "next/router";
import { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import Login from "~/components/Login";
import Spinner from "~/components/Spinner";
import { getAccessToken } from "~/utils/spotify";

const authorizeToHome = async () => {
  const token = getAccessToken(window);
  await router.push(`/home/${token as string}`);
};

const PreLogin = () => {
  const [port, setPort] = useState(null as number | null);

  useEffect(() => {
    authorizeToHome().catch(() => console.log("uh oh"));
    setPort(Number(window.location.port));
  }, []);

  return <Layout>{port ? <Login port={port} /> : <Spinner />}</Layout>;
};

export default PreLogin;
