const pageNotFound=(req,res)=>{
    res.status(404).send('<h1> 404 Oops! page not found</h1>')
}

module.exports=pageNotFound