# src/components/config/index.js

```
const keys = {
  apiKey: "***",
  authDomain: "***",
  databaseURL: "***",
  projectId: "**",
  storageBucket: "***",
  messagingSenderId: "***"
}

export default keys
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