const express = require('express');
const port = 3000;
const app = express();
const mongose = require('mongodb');
const mongoose = require('mongoose')
app.set('view engine','ejs');
const methodover = require('method-override');
app.use(methodover('_method'))
app.use(express.urlencoded({extended:true}));//with the help of this we can read body encoded text in html




mongoose.connect('mongodb+srv://abhisheksharma32344:RNA0wwyg1WHzfoOw@cluster0.dtavct7.mongodb.net/?retryWrites=true&w=majority')
.then((result) => {
    console.log(`Database connected Successfully`);
    
}).catch((err) => {
    console.log(`This is ${err.message}`);
});

const quotes = new mongoose.Schema({
    name:{
        type:'string',
        // required:true,
    },
    quote:{
        type:'string',
        // required:true,
    }
}
);

const Quotes = mongoose.model('Quotes',quotes);


app.get('/',async (req,res)=>{
    let quote = await Quotes.find({});
   
    res.render('home.ejs',{quote});
})

app.get('/newquote',(req,res)=>{
    res.render('newquote.ejs');
})


app.post('/',async (req,res)=>{
    let {name,quote} = req.body;
    await Quotes.create({name,quote});
    res.redirect('/');
})

app.listen(port,()=>{
    console.log(`Connected to Serever Successfully ${port}`);
})

// app.delete('/show/:id',async (req,res)=>{
//     let { id }= req.params;
//     await Quote.findByIdAndDelete(id);
//     res.redirect('/');
// })

app.get('/detail/:id',async (req,res)=>{
    let {id}=req.params;
    let quote = await Quotes.findById(id);
    res.render('detail',{quote})
})


app.delete('/:id',async (req,res)=>{
    let { id }= req.params;
    await Quotes.findByIdAndDelete(id);
    res.redirect('/');
})