const MongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
}

exports.connect = function (url, done) {
    if (state.db) return done()

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}

exports.get = function (dbName) {
    return state.db.db(dbName)
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}