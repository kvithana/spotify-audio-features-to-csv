/**
 * CSV headers for the get audio features endpoint
 */
export const audioFeaturesHeaders = [
    { id: 'playlist_uri', title: 'playlist_uri' },
    { id: 'duration_ms', title: 'duration_ms' },
    { id: 'key', title: 'key' },
    { id: 'mode', title: 'mode' },
    { id: 'time_signature', title: 'time_signature' },
    { id: 'acousticness', title: 'acousticness' },
    { id: 'danceability', title: 'danceability' },
    { id: 'energy', title: 'energy' },
    { id: 'instrumentalness', title: 'instrumentalness' },
    { id: 'liveness', title: 'liveness' },
    { id: 'loudness', title: 'loudness' },
    { id: 'speechiness', title: 'speechiness' },
    { id: 'valence', title: 'valence' },
    { id: 'tempo', title: 'tempo' },
    { id: 'uri', title: 'uri' },
]

/**
 * CSV headers for tracks
 */
export const tracksHeaders = [
    { id: 'playlist_uri', title: 'playlist_uri' },
    { id: 'album', title: 'album' },
    { id: 'album_uri', title: 'album_uri' },
    { id: 'artist', title: 'artist' },
    { id: 'artist_uri', title: 'artist_uri' },
    { id: 'disc_number', title: 'disc_number' },
    { id: 'duration_ms', title: 'duration_ms' },
    { id: 'name', title: 'name' },
    { id: 'popularity', title: 'popularity' },
    { id: 'explicit', title: 'explicit' },
    { id: 'uri', title: 'uri' },
    { id: 'href', title: 'link' },
]

/**
 * CSV headers for playlists
 */
export const playlistsHeaders = [
    { id: 'uri', title: 'uri' },
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'href', title: 'link' },
]
