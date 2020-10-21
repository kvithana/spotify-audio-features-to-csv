## Spotify Audio Features To CSV

Some helpful scripts to get audio analysis data from Spotify from given playlists into a CSV format for data analysis. 

## About

Given a list of playlist URIs or URLs in a `.txt` file, this program will get the tracks associated with that playlist (currently up to 100), and call the [Spotify Audio Features](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/) endpoint to get insightful information about the tracks.

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
    ├───artists
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
- `/artists`: folder with an individual csv for each playlist, containing data about each artist (can be multiple for each track).
- `/tracks`: folder with an individual csv for each playlist, containing data about each track.

## `playlists.csv`

Has consolidated information about each playlist.

Primary Key:

- `playlist_uri`: Spotify URI for the playlist. Also the title of corresponding CSV files.

Other Attributes:

- `title`: Title of the playlist
- `description`: Description of the playlist
- `url`: URL of the playlist

After cleaning & consolidation:

- `year`: Year of the chart
- `chart`: `H100`, `ARIA` or `OTHER`

## `features/...`

Has audio features for each track returned from the [Spotify Audio Features](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/) endpoint.

*Primary Keys:*
- `playlist_uri`: Spotify URI for the playlist
- `uri`: Spotify URI of the track

*Other Attributes:*

The following features are saved in the CSV. Read the description and distribution for each attribute from the above Spotify API documentation.

- `duration_ms`
- `key`
- `mode`
- `time_signature`
- `acousticness`
- `danceability`
- `energy`
- `instrumentalness`
- `liveness`
- `loudness`
- `speechiness`
- `valence`
- `tempo`

## `tracks/...`

Idenitifying information about each track, as returned from the [Spotify Get Tracks](https://developer.spotify.com/documentation/web-api/reference/artists/get-several-tracks/) endpoint.

*Note: Tracks can have multiple artists. The CSV has been formatted to have an entry for each listed artist of the track.*

*Primary Keys:*

- `playlist_uri`: Spotify URI for the playlist
- `uri`: Spotify URI of the track
- `artist`: name of a featuring artist
- `artist_uri`: Spotify URI of the artist

*Other Attributes:*

The following features are saved in the CSV. Read the description and distribution for each attribute from the above Spotify API documentation.

- `album`: name of the album
- `album_uri`: Spotify URI for the album
- `disc_number`
- `duration_ms`
- `name`
- `popularity`
- `explicit`
- `uri`
- `link`: renamed from `href`


## `artists/...`

Idenitifying information about each artist, as returned from the [Spotify Get Artists](https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-artists/) endpoint.

*Note: Genres for each artist are comma separated and should be expanded*

*Primary Keys:*

- `uri`: Spotify URI of the artist

*Other Attributes:*

The following features are saved in the CSV. Read the description and distribution for each attribute from the above Spotify API documentation.

- `name`: name of the artist
- `followers`: Number of followers
- `popularity`
- `uri`
- `genres`: comma separated string of genres
- `link`: renamed from `href`


## Usage

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

After installing packages you can use this command to then begin importing:

```bash
npm run import <filename>.txt
```