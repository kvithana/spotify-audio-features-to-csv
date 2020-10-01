import Spotify from 'spotify-web-api-node'
import { clone } from 'lodash'
import { SpotifyAnalysisError } from './_error'

/**
 * A wrapper around a Spotify API handler to assist in data importing functionality.
 */
class _Spotify {
    s: Spotify
    private _initialised: boolean

    constructor() {
        this.s = new Spotify()
        this.s.setClientId(process.env.SPOTIFY_CLIENT_ID)
        this.s.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET)
        this._initialised = false
    }

    /**
     * Initialise the Spotify library by granting an access token. This method
     * **must be resolved before calling any other methods**.
     */
    public async initialise(): Promise<void> {
        const accessToken = await this.s
            .clientCredentialsGrant()
            .then(({ body }) => {
                this._initialised = true
                return body.access_token
            })
            .catch((err) => {
                throw new SpotifyAnalysisError('error with getting client credentials on initialisation:', err)
            })
        this.s.setAccessToken(accessToken)
    }

    /**
     * Gets Spotify data for any number of tracks (unrestricted from 50 track direct
     * API call limit).
     * @param tracks array of track URIs
     */
    public async getTracks(tracks: string[]): Promise<SpotifyApi.TrackObjectFull[]> {
        this._assertInitialised()
        let trackData: SpotifyApi.TrackObjectFull[] = []
        const remaining = clone(tracks)
        do {
            await this.s
                .getTracks(remaining.splice(0, 50))
                .then(({ body }) => {
                    trackData = trackData.concat(body.tracks)
                })
                .catch((err) => {
                    console.error('error with getting tracks:', err)
                    throw err
                })
        } while (remaining.length)
        return trackData
    }

    /**
     * Gets Spotify data for any number of artists (unrestricted from 50 artists direct
     * API call limit).
     * @param artists array of artist URIs
     */
    public async getArtists(artists: string[]): Promise<SpotifyApi.ArtistObjectFull[]> {
        this._assertInitialised()
        let artistData: SpotifyApi.ArtistObjectFull[] = []
        const remaining = clone(artists)
        do {
            await this.s
                .getArtists(remaining.splice(0, 50))
                .then(({ body }) => {
                    artistData = artistData.concat(body.artists)
                })
                .catch((err) => {
                    console.error('error with getting artists:', err)
                    throw err
                })
        } while (remaining.length)
        return artistData
    }

    /**
     * Get audio feature information for tracks identified by its unique Spotify
     * ID.
     * @param tracks array of track URIs
     */
    public async getAudioFeatures(tracks: string[]): Promise<SpotifyApi.AudioFeaturesObject[]> {
        this._assertInitialised()
        let featuresData: SpotifyApi.AudioFeaturesObject[] = []
        const remaining = clone(tracks)
        do {
            await this.s
                .getAudioFeaturesForTracks(remaining.splice(0, 50))
                .then(({ body }) => {
                    featuresData = featuresData.concat(body.audio_features)
                })
                .catch((err) => {
                    console.error('error with getting features:', err)
                    throw err
                })
        } while (remaining.length)
        return featuresData
    }

    /**
     * Gets playlist data for a given playlist URI.
     * @param playlist playlist URI
     */
    public async getPlaylist(playlist: string): Promise<SpotifyApi.SinglePlaylistResponse> {
        this._assertInitialised()
        return this.s.getPlaylist(playlist).then(({ body }) => body)
    }

    /**
     * Gets playlist tracks for a given playlist URI.
     * @param playlist playlist URI
     */
    public async getPlaylistTracks(playlist: string): Promise<SpotifyApi.PlaylistTrackObject[]> {
        this._assertInitialised()
        return this.s.getPlaylistTracks(playlist).then(({ body }) => body.items)
    }

    /**
     * Ensure initialised has been called and an access token is set
     */
    private _assertInitialised() {
        if (!this._initialised) {
            throw new SpotifyAnalysisError('initialise() method must be called before other methods')
        }
        return true
    }
}

export default _Spotify
