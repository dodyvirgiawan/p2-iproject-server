function errorHandler(err, req, res, next) {
    let code = null
    let message = null

    console.log(err, '<<< whole error')
    console.log(err.name, '<<< error name')

    switch(err.name) {
        case 'SequelizeValidationError':
            code = 400
            message = {message: err.errors.map(error => error.message)}
            break
        case 'SequelizeUniqueConstraintError':
            code = 400
            message = {message: `Email ${req.body.email} is already registered`}
            break
        case 'InvalidToken':
            code = 401
            message = {message: 'Please login first!'}
            break
        case 'JsonWebTokenError':
            code = 401
            message = {message: 'Please login first!'}
            break
        case 'InvalidCredentials':
            code = 401
            message = {message: 'Invalid email or password'}
            break
        case 'PlaylistNotFound':
            code = 404
            message = {message: 'Playlist not found'}
            break
        case 'PlaylistUnauthorized':
            code = 403
            message = {message: 'You are not authorized to make changes for this playlist'}
            break
        case 'PlaylistOrMovieNotFound':
            code = 404
            message = {message: 'Playlist or movie is not found'}
            break
        default:
            code = 500
            message = {message: 'Internal server error'}
    }

    res.status(code).json(message)
}

module.exports = errorHandler