import axios from "axios";
import type { AxiosResponse } from "axios";

const expressPort = 8888;
const baseAuthUrl = `http://localhost:${expressPort}`;

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

const handler =
  <T>(func: (arg0: Window) => T) =>
  (pageWindow: unknown) => {
    const _pageWindow = pageWindow as Window;
    return func(_pageWindow);
  };

// Map to retrieve localStorage values
const GET_LOCALSTORAGE_VALUES = handler((pageWindow) => ({
  accessToken: pageWindow.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: pageWindow.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: pageWindow.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: pageWindow.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}));
/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
export const getAccessToken = (
  pageWindow: Window
): string | false | null | undefined => {
  const LOCALSTORAGE_VALUES = GET_LOCALSTORAGE_VALUES(pageWindow);
  const queryString = pageWindow.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");
  // if (authTimedOut) {
  //   logout(pageWindow);
  //   return await getAccessToken(pageWindow, false);
  // }

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired(pageWindow) ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    logout(window);
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      pageWindow.localStorage.setItem(
        property,
        queryParams[property] as unknown as string
      );
    }
    // Set timestamp
    pageWindow.localStorage.setItem(
      LOCALSTORAGE_KEYS.timestamp,
      Date.now().toString()
    );
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // We should never get here!
  return false;
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
export const hasTokenExpired = handler((pageWindow: Window) => {
  const LOCALSTORAGE_VALUES = GET_LOCALSTORAGE_VALUES(pageWindow);
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
});

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
export const refreshToken = handler(async (pageWindow: Window) => {
  const LOCALSTORAGE_VALUES = GET_LOCALSTORAGE_VALUES(pageWindow);
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout(pageWindow);
    }

    const axiosData: AxiosResponse = await axios.get(
      `${baseAuthUrl}/refresh_token?refresh_token=${
        LOCALSTORAGE_VALUES.refreshToken as string
      }`
    );

    interface Data {
      access_token: string;
    }

    const data = axiosData.data as Data;

    // Update localStorage values
    pageWindow.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    pageWindow.localStorage.setItem(
      LOCALSTORAGE_KEYS.timestamp,
      Date.now() as unknown as string
    );

    // Reload the page for localStorage updates to be reflected
    pageWindow.location.reload();
  } catch (e) {
    console.error(e);
  }
});

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = handler((pageWindow: Window) => {
  // Clear all localStorage items
  type Property = keyof typeof LOCALSTORAGE_KEYS;

  for (const property in LOCALSTORAGE_KEYS) {
    pageWindow.localStorage.removeItem(LOCALSTORAGE_KEYS[property as Property]);
  }
  // Navigate to homepage
  pageWindow.location = pageWindow.location.origin as unknown as Location;
});

const setAxios = (accessToken: string) => {
  axios.defaults.baseURL = "https://api.spotify.com/v1";
  axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  axios.defaults.headers["Content-Type"] = "application/json";
};

const getAxios = (accessToken: string) => {
  setAxios(accessToken);
  return axios;
};

export const getSpotifyClient = getAxios;

export const getPlaylistTracks = (playlistId: string, offset: number) =>
  axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}`
  );

export const getPlaylists = () =>
  axios.get(`https://api.spotify.com/v1/me/playlists`);
