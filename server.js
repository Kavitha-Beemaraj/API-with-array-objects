const express= require('express')
const path= require('path')
const app= express()

app.get('/', (req,res) =>{
    console.log('server started on PORT 5000')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/todos', require('./routes/todos'))

app.listen(5000) 