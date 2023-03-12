const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const clientId = "bf48614d72f24549881ec3aca5ac064c";
const clientSecret = "6064b32d56a24b39a74fe36e9a4a5866";

const app = express();
const port = 8888;
const solidPort = 3000;

const redirectUri = `http://localhost:${port}/callback`;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "playlist-read-private";

  const queryParams = querystring.stringify({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:${solidPort}/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// // private methods
// const getToken = async () => {
//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//     },
//     body: "grant_type=client_credentials",
//   });

//   const data = await result.json();
//   return data.access_token;
// };

// const getPlaylist = async (playlistId) => {
//   const token = await getToken();
//   const result = await fetch(
//     `https://api.spotify.com/v1/playlists/${playlistId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "Content-Type: application/json",
//         Authorization: "Bearer " + token,
//       },
//     }
//   );
//   const data = await result.json();
//   console.log(data);
// };

// const getTrack = async (trackId) => {
//   const token = await getToken();
//   const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "Content-Type: application/json",
//       Authorization: "Bearer " + token,
//     },
//   });
//   const data = await result.json();
//   console.log(data);
// };

// getTrack("7h2nmmoWDi2UpfYKLKWLYB");
