const Movies = require('../models/Movies');


module.exports.addMovie = async (req, res) => {

	const {title, director, description, year, genre} = req.body;

	try {

		const movieExist = await Movies.findOne({title: title});

		if(movieExist){
			return res.status(409).send({message: "Movie already exist"});
		}

		let newMovie = new Movies({
			userId: req.user.id,
			title: title,
			director: director,
			description: description,
			year: year,
			genre: genre
		})

		const saveMovie = await newMovie.save()
		return res.status(201).send(saveMovie);
	}catch(error){

		return res.status(500).send({message: "Error in saving the Movie", error: error.message});
	}
}

module.exports.getAllMovie = async (req, res) => {

    try {

        const retrieveAllMovies = await Movies.find({});

        if (retrieveAllMovies.length > 0) {

            return res.status(200).send({ movies: retrieveAllMovies });

        } else {

            return res.status(404).send({ message: "No Movies found." });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error retrieving movies", 
        	error: error.message });
    }
};

module.exports.getMovie = async (req, res) => {

    try {

        const retrieveMovie = await Movies.findById(req.params.id);

        if (retrieveMovie) {

            return res.status(200).send(retrieveMovie);

        } else {

            return res.status(404).send({ message: "No Movies found for this user." });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error retrieving movies", 
        	error: error.message });
    }
};

module.exports.updateMovie = async (req, res) => {

		try{

		const {title, director, description, year, genre } = req.body

		const updatedMovie = await Movies.findByIdAndUpdate({_id: req.params.id},
				{title: title, director: director, description: description, year: year, genre: genre},
				{new: true});

		if(!updatedMovie){

			return res.status(404).send({error: "Movie not found"});
			
		}else{

			return res.status(200).send({message: "Movie updated successfully", updatedMovie});
		}

	}catch(error){

		return res.status(500).send({message: "Error in updating the Movie", error: error.message}); 
	}
}

module.exports.deleteMovie = async (req, res) => {

	try {

		const removeMovie = await Movies.findOneAndDelete({_id: req.params.id});

		if(!removeMovie){

			return res.status(404).send({message: "Movie not found or you're not authorized to delete it."})
		}

		return res.status(200).send({ 
            message: "Movie deleted successfully"});

	}catch(error){

		return res.status(500).send({ 
        	message: "Error deleting Movie", error: error.message });
	}
}

module.exports.addComment = async (req, res) => {
    try {
        const newComment = {
            userId: req.user.id,
            comment: req.body.comment
        };

        const updatedMovie = await Movies.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: newComment } },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).send({ message: "Movie not found" });
        }
        return res.status(200).send({
            message: "Comment Added successfully",
            updatedMovie: updatedMovie
        });
            
    } catch (error) {
        return res.status(500).send({ 
            message: "Comment error", 
            error: error.message 
        });
    }
};

module.exports.getComments = async (req, res) => {

	try {

		const movie = await Movies.findById(req.params.id);

		if(!movie){

			return res.status(404).send({message: "Movie not found"})
		}

			return res.status(200).send({comments: movie.comments})
			
	}catch(error){

		return res.status(500).send({ message: "Error", error: error.message });
	}
}