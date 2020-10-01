## Spotify Audio Analysis To CSV

Some helpful scripts to get audio analysis data from Spotify from given playlists into a CSV format for data analysis. 

### About

Given a list of playlist URIs or URLs in a `.txt` file, this program will get the tracks associated with that playlist (currently up to 100), and call the [Spotify Audio Features](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/) get get insightful information about the tracks.

This data will be outputted in csv format into the following structure:
```
└───data
    │   playlists.csv
    │
    ├───features
    │       0hIiy3ihpzsIX9Dd6RVtWw.csv
    │       0kgHtoYJSMS3pMMciC3Us4.csv
    │       ...
    │
    └───tracks
            0hIiy3ihpzsIX9Dd6RVtWw.csv
            0kgHtoYJSMS3pMMciC3Us4.csv
            ...
```

- `playlists.csv` : a lookup of the playlist URI and the playlist name and description
- `/features`: folder with an individual csv for each playlist, containing the audio features data.
- `/tracks`: folder with an individual csv for each playlist, containing data about each track.
  
### Usage

Ensure that you have created an app in the [Spotify Developer Dashboard](https://developer.spotify.com/) and entered your `CLIENT_ID` and `CLIENT_SECRET` into the `.env.template` file and renamed it to `.env`.

We are using the Client Credentials Grant flow which doesn't require a user-generated access token. You can read more about the Spotify authorisation flows [here](https://developer.spotify.com/documentation/general/guides/authorization-guide/).

Create a text file with a newline separated list of playlist URIs or playlist URLs.
```
https://open.spotify.com/playlist/6YKI2VYSO9iZtyaLb3ZUsG?si=9owB1TBYQ8u2sLu2dO6XYQ
https://open.spotify.com/playlist/2P4qsHuiq8iTOKkHk0N5td?si=nnnCloKbT4C6-IchPtqMtg
https://open.spotify.com/playlist/527BlW4koD42o92YquTbWn?si=lg7hPkfcRM6-IcW1HGMXFg
https://open.spotify.com/playlist/5GukqTmf4N5gDtwmkiidHQ?si=prg7_5DsSwyPFmlydhHNjQ
https://open.spotify.com/playlist/3GxlQrYDedjZBHZMDEj7ow?si=mNujcAmdQP6UuTFt74RXtg
```

You can use this command to then begin importing:

```
npm run import <filename>.txt
```