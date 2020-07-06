const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/testdb',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false
}).then(()=> console.log('database connection success')).catch(err => console.log(err))