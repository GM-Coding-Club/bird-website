# src/components/config/index.js

```
export const firebaseConfig = {
  apiKey: "AIzaSyCEMfVSr0IXesy5_1um_G_n4Say1y2bcmE",
  authDomain: "featheredfriends-1e2dd.firebaseapp.com",
  databaseURL: "https://featheredfriends-1e2dd.firebaseio.com",
  projectId: "featheredfriends-1e2dd",
  storageBucket: "featheredfriends-1e2dd.appspot.com",
  messagingSenderId: "621529239721"
};

export const clarifAiPublic = "";
export const clarifAiPrivate = "";
export const clarifAiModelId = "";
```

# ex database

```
{
  "species" : {
    "-L88Njmhz2zC2-b6xAho" : {
      "name" : "test",
      "spottingCount" : 1,
      "spottings" : {
        "-L88Njmky-Z_uDh4u-xe" : "-L6xI7vVUTRvECo7Meu1"
      }
    }
  },
  "spottings" : {
    "-L6xI7vVUTRvECo7Meu1" : {
      "confirmed" : true,
      "image" : "https://firebasestorage.googleapis.com/v0/b/featheredfriends-1e2dd.appspot.com/o/images%2F1520373106.16.jpg?alt=media",
      "species" : "New",
      "time" : "1520373106.16"
    },
    "-L6xIG_wFpGg82d-T6Yi" : {
      "confirmed" : false,
      "image" : "https://firebasestorage.googleapis.com/v0/b/featheredfriends-1e2dd.appspot.com/o/images%2F1520373141.35.jpg?alt=media",
      "time" : "1520373141.35"
    }
  }
}

```