const authRouter = require('./auth.route')
const userRouter = require('./user.route')


function route(app) {

    app.use('/', authRouter)
    app.use('/', userRouter)

}

module.exports = route
