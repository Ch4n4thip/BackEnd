const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URI

var _db
var _root_db

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('Ject_Jobe')
      _root_db = client
      // console.log("connected to database")
      return callback( err )
    })
  },

  getDb: function() {
    return _db
  },

  getRootDb: function() {
    return _root_db
  },

  async getNextSequence( db, field){
    const result = await db.collection('counters').findOneAndUpdate( { _id: field },{ $inc: { seq: 1 } })
    return result.value.seq
  }
}