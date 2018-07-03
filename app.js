const express = require('express')
const MyMongoClient = require('mongodb');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('x-powered-by', false);

app.get('/secret', (request, response) =>{
    MyMongoClient.connect('mongodb://localhost:27017/MongoLabOne', function(err,client){
        if(err) throw err;
        const db =client.db('MongoLabOne');
        db.collection('homework7').find({}, function(err, data){
            if(err)throw err;
    
            data.next()
                .then(value=>{
                    console.log(value)
                    var decipher = require('crypto').createDecipher('aes256','asaadsaad')
                    var dec = decipher.update(value.message,'hex','utf8');
                    dec += decipher.final('utf8');
                    response.send(dec);
                })
                .catch(err => console.log(err))
            client.close();
        
        })
    })
});

app.listen(5000, ()=>{console.log("Server is starting at port 5000!!!!")})
