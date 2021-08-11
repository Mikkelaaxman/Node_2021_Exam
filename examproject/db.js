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

exports.create = function () {
    db.createCollection("beverages", {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'name',
                    'year',
                    'type',
                    'price',
                    'country'
                ],
                properties: {
                    name: {
                        bsonType: 'string',
                        pattern: '([ÆØÅæøåA-Za-z0-9s\'-])+',
                        description: 'must be a string and is required'
                    },
                    year: {
                        bsonType: 'int',
                        minimum: 1900,
                        maximum: 3000,
                        description: 'must be an integer in [ 1900, 3000 ] and is required'
                    },
                    type: {
                        'enum': [
                            'Red',
                            'White',
                            'Rose',
                            'Dessert',
                            'Other'
                        ],
                        description: 'can only be one of the enum values and is required'
                    },
                    price: {
                        bsonType: [
                            'double'
                        ],
                        description: 'must be a double if the field exists'
                    },
                    country: {
                        bsonType: 'string',
                        pattern: '[^<>;]',
                        description: 'Must be string'
                    },
                    imageURL: {
                        bsonType: [
                            'string'
                        ],
                        pattern: '[^æøåÆØÅ<>s;]',
                        description: 'Must be string and fit URL Regex pattern if exist'
                    }
                }
            }

        }
    })
}