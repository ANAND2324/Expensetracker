const express = require('express')
const {connectToDb,getDb} = require('./db.connection.cjs')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const app = express()

app.use(bodyParser.json())
let db
connectToDb(function(error){
if(error){
console.log('could  not estabalish connection...')
console.log(error)
}
else{
    const port = process.env.PORT || 8000
    app.listen(port)
    db = getDb()
    console.log(`Listening to port 8000 ${port}...`)
}
}
)

app.post('/add-entry',function(request,response){
    db.collection('ExpenseData').insertOne(request.body).then(function(){

    response.status(201).json({
        "status":"entry added sucessfully"
    })
}).catch(function(){
    response.status(500).json({
        "sataus": "entry not added"
    })
})
})
app.get('/get-entries', function(request, response) {
    // Declaring an empty array
    const entries = []
    db.collection('ExpenseData')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(404).json({
            "status" : "Could not fetch documents"
        })
    })
})
app.delete('/delete-entry',function(request,response){
    if(ObjectId.isValid(request.query.id)){
        db.collection('ExpenseData').deleteOne({
            _id: new ObjectId (request.query.id)
        }).then(function(){
            response.status(200).json({
                "status" : "entry added sucessfully deleted"
            })

        }).catch(function(){
            response.status(500).jsson({
                "status" : " entry not deleted"
            })
        })
    }else{
        response.status(500).json({
            "status":"object Id not valid"
        })
    }
})
    
    app.patch('/update-entry/:id',function(request,response){
        if(ObjectId.isValid(request.params.id)){
            db.collection('ExpenseData').updateOne(
                {_id : new ObjectId(request.params.id)},
                {$set:request.body}
            ).then(function(){
                response.status(200).json({
                    "status" : "entry updated sucessfully"
                })
            }).catch(function(){
                response.status(500).json({

                    "status" : "entry  not updated sucessfully"
                })
            })
        }else{
            response.status(500).json({
               "status" : "object not valid"
            })
        }
    })