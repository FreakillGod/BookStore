const Genre= require('../model/books')

const genreUpdate= async (genre)=>{
    let findGenre= await Genre.find({name:genre});

    if(!findGenre){
        findGenre=await Genre.create({name:genre});
    }

    console.log(...findGenre)
    findGenre.counts=findGenre.counts+1;

    
    
    return {msg:`${genre} is added to database`}
}

module.exports=genreUpdate;