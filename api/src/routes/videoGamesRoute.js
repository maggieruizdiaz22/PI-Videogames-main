const { Router } = require("express");
const{Videogame, Genre}= require("../db");
const {getGameById,getAllGames,allByName} = require("../controllers/videoGController")
// las rutas no deben modificar los bbd, y los controllers manejan la bdd

const videoGamesRouter=Router();


videoGamesRouter.get("/", async(req,res)=>{
 const{name}=req.query;
 try {
        const find = name ? await  allByName (name) : await getAllGames()
             res.status(200).json(find)
              } catch (error) {
        res.status(400).json({ error: error.message });
      } 
    }
)

videoGamesRouter.get("/:id", async(req,res)=>{
  const {id} = req.params;
   const source = isNaN(id) ? "bdd" : "api";
  
  try {
      const game = await getGameById (id, source);
      res.status(200).json(game);
  } catch (error) {
      res.status(400).send({error:error.message});
  };
})


videoGamesRouter.post("/", async (req, res) => {
    try {
      let {
        name,
        img,
        description,
        released,
        rating,
        genres,
        platforms,
      
     
      } = req.body;
    
      let newGame = await Videogame.create({
        name,
        img,
        description,
        released,
        rating,
        platforms,
       
        
      });
    
      let genreDB = await Genre.findAll({
        where: { name: genres },
      });
    
      await newGame.addGenre(genreDB);
    
      res.status(200).json(newGame);
    } catch (error) {
    
      res.status(400).send({error:error.message})
    }});

    videoGamesRouter.delete('/:id', async (req, res, next) => {
      const { id } = req.params;
      try {
          await Videogame.destroy(
              {
                  where: {
                      id: id
                  }
              }
          );
  
          res.status(200);
      } catch (error) {
          next(error);
      }
  });

  module.exports = videoGamesRouter;