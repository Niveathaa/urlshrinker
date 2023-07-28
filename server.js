const express =require('express');
const mongoose=require('mongoose');
const shorturl=require('./models/shorturl')
const app=express();
mongoose.connect('mongodb://127.0.0.1:27017/urlshortener',{
useNewUrlParser:true,useUnifiedTopology:true
})
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))


/*By enabling the express.urlencoded() middleware, the server can automatically parse the incoming data and make it accessible in the req.body object for easy access and processing in route handlers.
Both extended: true and extended: false have their
 use cases depending on the complexity of the data you expect to handle in your application. Generally, if you don't 
 need to deal with nested objects or arrays in your URL-encoded data, using the default extended: false is sufficient and simpler. 
 If you need more complex data structures, you can set extended: true.*/

 app.get('/',async(req,res)=>{
    const shorturls=await shorturl.find()
    res.render('index',{shorturls:shorturls});   //The find() method is used to retrieve all documents from the shorturl(model) collection.

})
app.post('/shorturls',async(req,res)=>{
    

    await shorturl.create({full:req.body.fullurl})
    res.redirect('/');
 
 })
 app.get('/:shorturl',async(req,res)=>{
    const ShortUrl = await shorturl.findOne({short:req.params.shorturl})
    if(ShortUrl == null)
    return res.sendStatus(404)
    ShortUrl.clicks++;
    ShortUrl.save();
    res.redirect(ShortUrl.full);

})
app.listen(process.env.PORT||3000)



















