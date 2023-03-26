SET-UP:
- delete all node_modules folders that exist in the project
- cd client 
- npm install
- npm install axios
- cd ../auth 
- npm install
- cd ../download 
- npm install

- go to https://developer.spotify.com/dashboard and login
- create a new app (name doesn't matter)
- click edit settings and paste "http://localhost:8888/callback" into Redirect URIs
- save and exit 
- there is a client id and client secret on the dashboard keep track of this

- create .env file in the root dir
- populate it with proper info form spotify api as indicated by the .env.example

- go to ".eslintrc.cjs" file in client
- find this:
parserOptions: {
    project: "C:/Visual studio code projects/t3-test/client/tsconfig.json",
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ change this
},
- right click on tsconfig.json in click and select "copy path"
- paste this path into the string in project 

- create folder specifically named "songs" in client/public

- make sure you're in client or cd client & run "npm run build"
- cd ../auth & run "npm start"
- MAKE SURE THAT http://localhost:3000/, http://localhost:8888, http://localhost:9999 ARE ALL RUNNING;
- click on link or navigate to http://localhost:3000/

USE:
- click login and authenticate to spotify
- make any updates to spotify that you want like adding another playlist 
- reload after changes or proceed
- select a playlist

- songs will automatically start downloading as denoted by their spinner icons
- once a song is downloaded the spinner icon will go away
- the song is now downloaded in the client/public/songs folder as it's spotify id
- the song will not be re-downloaded if you open up the same playlist

- if the app is built and then run using "npm start" instead of "npm run dev" on the server
  or if the app is on port 3000 instead of 3001:
    - the songs that are recently downloaded will not be able to be played
    - only after re-building the app will these songs update
    - the reason is next js will use the songs as static assets that are set in stone after build-time
    

FIXES TO ERRORS:
- if running into problems with "npm run build":
  1. go to next.config.mjs in client folder
  2. find the config:
  const config = {
    reactStrictMode: true,
    ...
  }
  3. add the following below the "reactStringMode: true":
   eslint: {
    ignoreDuringBuilds: true,
  },
  4. try re-building

- if you are STILL running into problems with "npm run build":
    1. go to auth/package.json and find this:
    "scripts": {
      "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\" \"npm run download\"",
      "server": "node index.js",
      "client": "cd ../client && npm start", <----------- THIS!!!
      "download": "cd ../download && node index.js"
    },
    2. change "npm start" to "npm run dev"
    3. cd auth & run npm start
    4. click on the link or navigate to http://localhost:3001/


- if running into errors on Action.tsx file:
    1. check that @mui/icons-material is a dependency in client/package.json
    2. npm install @mui/icons-material if it isn't
    3. if there are still errors look at this piece of code:
    import BottomNavigation from "@mui/material/BottomNavigation";
    import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
    import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
    import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
    import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
    import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
    import ShuffleOnRoundedIcon from "@mui/icons-material/ShuffleOnRounded";
    import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
    import RepeatOnRoundedIcon from "@mui/icons-material/RepeatOnRounded";
    4. delete it and replace it with
    import {
    ShuffleOnRounded,
    ShuffleRounded,
    SkipNextRounded,
    SkipPreviousRounded,
    PauseCircleOutlineRounded,
    PlayCircleOutlineRounded,
    RepeatOnRounded,
    RepeatRounded,
    } from "@mui/icons-material";
    5. change all the variable names in the file as necessary


- if the ports that you are using are not the same as in they are not:
  http://localhost:3000/, http://localhost:8888, http://localhost:9999
    - change all the strings/variables in your code to their respective new ports

UNSOLVED PROBLEMS:
- when building a webpack error occurs with "too many open files"
    1. in this case refer to "FIXES TO ERRORS" 2nd fix:
       if you are STILL running into problems with "npm run build"

