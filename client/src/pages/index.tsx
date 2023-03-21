import { NextPage } from "next";
import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import Login from "~/components/Login";
import { getAccessToken, getSpotifyClient } from "~/utils/spotify";

type BooleanString = "true" | "false" | undefined | "";

const myFunc = async (authTimeOut: BooleanString) => {
  const token = await getAccessToken(window, Boolean(authTimeOut));
  if (token) {
    router.push(`/home/${token}`).catch(() => console.log("didn't work"));
  }
};

const PreLogin = () => {
  const router = useRouter();
  const authTimeOut = router.query["auth_timed_out"] as BooleanString;

  useEffect(() => {
    myFunc(authTimeOut).catch(() => console.log("uh oh"));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Login />
    </main>
  );
};

export default PreLogin;
