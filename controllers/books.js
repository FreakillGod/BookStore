const Books = require("../model/books");
const genre = require("../model/genre");
const Genre = require("../model/genre");

const getAllBooks = async (req, res) => {
    try {
        const bookObject = {};

        const { name, description, author, sort, genre } = req.query;

        if (name) {

            bookObject.name = { $regex: data, $options: "i" };
        }
        if (description) {

            bookObject.description = { $regex: description, $options: "i" };
        }
        if (genre) {
            bookObject.genre = {$regex: genre, $options: "i"};
        }

        if (author) {
            bookObject.author = {$regex: author, $options: "i"};
        }



        let result = Books.find(bookObject);

        if (sort) {
            const sorts = sort.split(",").join(" ");
            result = result.sort(sorts);
        } else {
            result = result.sort("createdAt");
        }

        const books = await result;

        res
            .status(200)
            .json({ msg: "success", books, total: books.length });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};




const getBook = async (req, res) => {
    try {
        const bookObject = {};

        const { id } = req.params;
        const { name, description } = req.query;

        if (id) {
            const book = await Books.findById({ _id: id });
            return res.status(200).json({ msg: "success", book });
        }
        if (name) {
            bookObject.name = { $regex: name, $Option: "i" };
        }
        if (description) {
            bookObject.description = { $regex: description, $options: "i" };
        }
        const book = book.find(bookObject);

        res.status(200).json({ msg: "success", book });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};




const addBook = async (req, res) => {
    try {
        const { name, description, genre, author, price } = req.body;

        if (
            name === "" ||
            description === "" ||
            author === "" ||
            price === "" ||
            genre === ""
        ) {
            return res.send(401).json({ msg: "all data must be provided" });
        }

        const newBook = await Books.create(req.body);

        // if(genre.length>1){
        //     const [firstgenre, secoundGenre]= genre.split(',')
        //     console.log(firstgenre,secoundGenre)

        //     let genreUpdate1=await Genre.findOne({name: firstgenre})

        //     if(genreUpdate1){

        //         if(genreUpdate1.genre!==firstgenre){
        //             const newGenre= await Genre.create({name:firstgenre,counts:1});
        //         }

        //         const count=genreUpdate1.count;

        //         let genreUpdate= await Genre.findOneAndUpdate({name:firstgenre},{counts:count+1},{new:true, runValidators:true})
                
        //     }
        //     let genreUpdate2= await Genre.findOne({name:secoundGenre})
        //     if(genreUpdate2){
        //         const count= genreUpdate2.count;

        //         let genreUpdate= await Genre.findOneAndUpdate({name:secoundGenre},{counts:count+1},{new:true, runValidators:true})
        //     }
            

        // }


        if (newBook) {
            let updatedGenre = await Genre.findOne({ name: genre });

            if (!updatedGenre) {
                updatedGenre = await Genre.create({ name: genre });
                console.log(updatedGenre);
            }
            const number = updatedGenre.counts;

            //updating genre counts
            const counts = await Genre.findOneAndUpdate(
                { name: genre },
                { counts: number + 1 },
                { new: true }
            );
        }

        res.status(200).json({ newBook, message: `${name} is added to ${genre}` });
    } catch (error) {
        console.log(error);
        res.status(505).json({ msg: error });
    }
};




const updateBook = async (req, res) => {
    try {
        const { id: bookId } = req.params;
        const { name, description, genre, author, price } = req.body;

        const findGenre = await Books.findOne({ _id: bookId });

        if (findGenre) {

            const updateBook = await Books.findByIdAndUpdate(

                { _id: bookId },
                {
                    name: name, description: description, genre: genre, author: author, price: price,
                },
                { new: true, runValidators: true }
            );

            if (updateBook) {

                const oldGenre = findGenre.genre;

                if (oldGenre !== genre) {
                    const prevGenre = await Genre.findOne({ name: oldGenre });

                    if (prevGenre) {
                        const oldGenreCounts = prevGenre.counts;
                        const oldDecrementCount = await Genre.findOneAndUpdate(
                            { name: oldGenre },
                            { counts: oldGenreCounts - 1 },
                            { new: true, runValidators: true }
                        );
                    }

                    const newGenre = await Genre.findOne({ name: genre });

                    if (!newGenre) {
                        const updatedGenre = await Genre.create({ name: genre, counts: 1 });
                        console.log(updatedGenre);
                    } else {
                        const oldCount = newGenre.counts;
                        const updateCount = await Genre.findOneAndUpdate({ name: genre }, { counts: oldCount + 1 }, { new: true, runValidators: true })
                    }

                }
                
                return res.status(200).json({
                    msg: "success",
                    updateBook,
                    message: `${name} is updated, genre :${genre}`,
                });
            }

        }
        res.status(401).json({ msg: "cannot update data" });

    } catch (error) {
        res.status(505).json({ msg: error });
    }

};




const deleteBook = async (req, res) => {
    try {
        const { id: bookId } = req.params;

        const deletedBook = await Books.findByIdAndRemove({ _id: bookId });

        const { name, genre } = deletedBook;

        console.log(deletedBook);

        if (deletedBook) {
            let deletedGenre = await Genre.findOne({ name: genre });

            const number = deletedGenre.counts;

            console.log(deletedGenre);

            const idk = await Genre.findOneAndUpdate(
                { name: genre },
                { counts: number - 1 },
                { new: true, runValidators: true }
            );

            return res
                .status(200)
                .json({ msg: "success", message: `${name} is deleted from ${genre}` });
        }

        res.status(401).json({ msg: "cannot delete data" });
    } catch (error) {
        res.status(505).json({ msg: error });
    }
};




//GenreDB
const getAllGenre=async (req,res)=>{
    try {
        
        const data= await Genre.find();

        console.log(data)

        if(data){

            return res.status(200).json({data, count: data.length});

        }
        res.status(401).json({ msg: "cannot find genre"});
        
    } catch (error) {
        res.status(505).json({ msg:'uou' });
    }
}


module.exports = { getBook, getAllBooks, addBook, updateBook, deleteBook , getAllGenre};
