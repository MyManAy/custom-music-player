import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "~/components/Login";
import Spinner from "~/components/Spinner";
import { getAccessToken } from "~/utils/spotify";

type BooleanString = "true" | "false" | undefined | "";

const myFunc = async (authTimeOut: BooleanString) => {
  const token = await getAccessToken(window, Boolean(authTimeOut));
  if (token) {
    router.push(`/home/${token}`).catch(() => console.log("didn't work"));
  }
};

const PreLogin = () => {
  const router = useRouter();
  const [port, setPort] = useState(null as number | null);
  const authTimeOut = router.query["auth_timed_out"] as BooleanString;

  useEffect(() => {
    myFunc(authTimeOut).catch(() => console.log("uh oh"));
    setPort(Number(window.location.port));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {port ? <Login port={port} /> : <Spinner />}
    </main>
  );
};

export default PreLogin;
