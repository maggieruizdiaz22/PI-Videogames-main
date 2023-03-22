require('dotenv').config()
const   axios  = require("axios");
const { Videogame, Genre } = require("../db");
const { YOUR_API_KEY } = process.env;
const{ cleanArray2,cleanArray,genreMap } = require("./Tools")


 

const getGameById = async (id,source) => {
  let url=`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`;
try {
  if(source === "api"){
      const response = await axios.get(url);
      const gameList = response.data;
      let videgameApi = cleanArray2(gameList);
      return videgameApi;
  } else {
    const gameId=  await Videogame.findAll({
      where: { id },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const videogamesBDD = genreMap(gameId);

    return videogamesBDD;
  }
} catch (error) {
  throw new Error("No hay juegos con ese id");
}
};


const allByName = async (name) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`)
    const gameList = response.data.results
    if(gameList.length<1){
      throw new Error("Not Found")
    }
    let videogameApi = cleanArray(gameList)
    
    const fifteen = videogameApi.slice(0,15)
    return fifteen
  } catch (error) {
    throw new Error("Not Found")
  }
}

const getApiAll = async () =>{
    const firstHundred = [];
    for (let i = 1; i <= 5; i++) {
        let api = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`)
        api.data.results.map(e => {
            firstHundred.push({ 
                id : e.id, 
                name: e.name,
                description: e.description_raw,
                released: e.released,
                rating: e.rating,
                img: e.background_image,
                genres: e.genres.map(e => e.name),
                platform: e.platforms?.map((e) => e.platform.name)
            })
        })
    }
    return firstHundred;
};

const getInfoDb = async () => {
  try {
    const allGames = await Videogame.findAll({  
           include: [{
               model: Genre, 
               atributes: ['name'], 
               through: { 
                   attributes: [] 
                  }
           }]
       })
       const mapeo = genreMap(allGames);
       return mapeo;
   
       
    } catch(error) {
        res.status(400).send(error)
    }
}

  const getAllGames = async () => {
    // para unir las dos solicitudes, guardo en una variable la ejecucion de mis funciones
    const apiData = await getApiAll ();
    const dbData = await getInfoDb ();
   
    // ahora uno mis dos constantes contenedoras de funciones
    const infoCompleta = dbData.concat(apiData)
    return infoCompleta
  }


module.exports =  {getAllGames,getGameById,allByName};