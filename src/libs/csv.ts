import { createObjectCsvWriter } from 'csv-writer'
import { audioFeaturesHeaders, tracksHeaders, playlistsHeaders } from '../consts/csv-headers'
import { ObjectCsvWriterParams } from 'csv-writer/src/lib/csv-writer-factory'

/**
 * Write data from the get audio features endpoint to a csv.
 * @param data Spotify audio features data
 * @param options CSV writer options
 */
export const writeAudioFeaturesToCsv = (
    data: SpotifyApi.AudioFeaturesObject[],
    playlist: string,
    options: ObjectCsvWriterParams,
): Promise<void> => {
    const writer = createObjectCsvWriter({
        ...options,
        header: audioFeaturesHeaders,
    })

    const formattedData = data.map((track) => ({
        ...track,
        playlist_uri: playlist,
    }))
    return writer.writeRecords(formattedData)
}

/**
 * Write track data from the playlist endpoint to a csv.
 * @param data Spotify playlist track data
 * @param options CSV writer options
 */
export const writePlaylistTracksToCsv = (
    data: SpotifyApi.PlaylistTrackObject[],
    playlist: string,
    options: ObjectCsvWriterParams,
): Promise<void> => {
    const writer = createObjectCsvWriter({
        ...options,
        header: tracksHeaders,
    })

    const formattedData = data
        .map(({ track }) =>
            track.artists.map((a) => ({
                ...track,
                album: track.album.name,
                album_uri: track.album.uri,
                artist: a.name,
                artist_uri: a.uri,
                playlist_uri: playlist,
            })),
        )
        .flat()

    return writer.writeRecords(formattedData)
}

/**
 * Write track data from the playlist endpoint to a csv.
 * @param data Spotify playlist track data
 * @param options CSV writer options
 */
export const writePlaylistsToCsv = (
    data: SpotifyApi.SinglePlaylistResponse[],
    options: ObjectCsvWriterParams,
): Promise<void> => {
    const writer = createObjectCsvWriter({
        ...options,
        header: playlistsHeaders,
    })

    return writer.writeRecords(data)
}
