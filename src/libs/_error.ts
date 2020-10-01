/**
 * From https://rclayton.silvrback.com/custom-errors-in-node-js
 */
class DomainError extends Error {
    data?: Record<string, unknown>
    constructor(message: string) {
        super(message)
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor)
    }
}

export class SpotifyAnalysisError extends DomainError {
    constructor(message: string, ...rest: any) {
        super(`${message}${rest ? ` ${rest}` : ''}`)
        this.data = { message }
    }
}
