const {MongoClient}=require('mongodb')

let dbConnection
let error
function connectToDb(callback){
    MongoClient.connect('mongodb+srv://anandarajau21:anand1234@cluster0.xcrpxvj.mongodb.net/Expensetracker?retryWrites=true&w=majority').then(function(client)
    {
        dbConnection = client.db()
        callback(error)
    }).catch(function(error)
    {
        callback(error)
    })
   
}
function getDb(){
    return dbConnection
}
module.exports= {connectToDb,getDb}