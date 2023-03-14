const cleanArray2=(gameList)=>{
    let videogameApi=[];
    videogameApi.push({
        id: gameList.id,
        name: gameList.name,
        img: gameList.background_image,
        genres: gameList.genres?.map((e)=>e.name).join(", "),
        description: gameList.description_raw,
        released: gameList.released,
        rating: gameList.rating,
        platforms: gameList.platforms?.map((el)=>el.platform.name).join(", ") 

    })
    return videogameApi
};
const cleanArray=(gameList)=>{
let videogameApi=[];
    gameList.map((e)=>{
        videogameApi.push({
        id: e.id,
        name: e.name,
        img:e.background_image,
        genres: e.genres?.map((e)=>e.name),
        description: e.description_raw,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms?.map((el)=>el.platform.name)

        })
        

    })
       return videogameApi
    }

    
    const genreMap = (gameId) => {
      let videogamesBdd = [];
      gameId.map((element) => {
        videogamesBdd.push({
          id: element.id,
          name: element.name,
          description: element.description,
          img: element.img,
          released: element.released,
          rating: element.rating,
          platforms: element.platforms,
          genres: element.genres?.map((el) => el.name),
          created: element.created,
        });
      });
      return videogamesBdd;
    };

module.exports={cleanArray2,cleanArray,genreMap}