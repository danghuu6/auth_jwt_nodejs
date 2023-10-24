const authRouter = require('./auth.route')


function route(app) {

    app.use('/', authRouter)

}

module.exports = route
