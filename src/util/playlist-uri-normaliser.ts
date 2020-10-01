/**
 * Attempts to extract the URI component from common input types
 * @param str non-normalised playlist uri string
 */
export const playlistUriNormaliser = (str: string): string => {
    if (str.includes('spotify.com')) {
        const matches = str.match(/(?<=playlist\/)((.*)(?=\?)|(.*)(?=$))/g)
        if (!matches.length) {
            throw Error(`could not normalise to playlist URI (thought URL): ${str}`)
        }
        return matches[0]
    }
    if (str.includes('spotify:playlist:')) {
        const matches = str.match(/(?<=spotify:playlist:)(.*)/g)
        if (!matches.length) {
            throw Error(`could not normalise to playlist URI (thought full URI): ${str}`)
        }
        return matches[0]
    }
    return str
}
