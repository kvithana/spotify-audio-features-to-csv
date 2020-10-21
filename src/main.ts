import Spotify from './libs/spotify'
import fs from 'fs'
import { playlistUriNormaliser } from './util/playlist-uri-normaliser'
import { writeAudioFeaturesToCsv, writePlaylistTracksToCsv, writePlaylistsToCsv, writeArtistsToCsv } from './libs/csv'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const s = new Spotify()

const main = async () => {
    // initialise Spotify client
    await s.initialise()

    // check if file path provided
    const filepath = process.argv[2]
    if (!filepath) {
        throw Error('no file path provided.')
    }
    // extract playlist URIs
    const file = fs.readFileSync(filepath, 'utf-8')
    const records = file
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map(playlistUriNormaliser)

    // create directories
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data')
        fs.mkdirSync('./data/features')
        fs.mkdirSync('./data/tracks')
        fs.mkdirSync('./data/artists')
    }

    // get data
    for (const playlistURI of records) {
        try {
            const playlist = await s.getPlaylist(playlistURI)
            const tracks = await s.getPlaylistTracks(playlistURI)
            const artists = await s.getArtists(
                tracks
                    .map((t) => t.track.artists.map((a) => a.id))
                    .flat()
                    .filter(Boolean),
            )
            const features = await s.getAudioFeatures(tracks.map((t) => t.track.id))
            writeAudioFeaturesToCsv(features, playlist.uri, { path: `./data/features/${playlistURI}.csv`, header: [] })
            writePlaylistTracksToCsv(tracks, playlist.uri, { path: `./data/tracks/${playlistURI}.csv`, header: [] })
            writeArtistsToCsv(artists, playlist.uri, { path: `./data/artists/${playlistURI}.csv`, header: [] })
            writePlaylistsToCsv([playlist], { path: `./data/playlists.csv`, header: [], append: true })
            console.log('completed playlist import: ', playlist.name)
        } catch (e) {
            console.error('error with getting data for playlist:', playlistURI, e)
        }
    }
}

main()
