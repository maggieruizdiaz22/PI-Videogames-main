require('dotenv').config()
const { Router }= require("express");
const { YOUR_API_KEY } = process.env;
const   axios  = require("axios");
const {  Genre } = require("../db");

const generoRouter = Router();


generoRouter.get("/", async (req, res) => {
	let url=`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
	try {
        const api = await axios.get(url)  
		const genres = api.data.results.map(el => el.name) 
        genres.map(g => Genre.findOrCreate({
          
                where:{
                   name: g}
                }))
        
        
        const allGenre = await Genre.findAll();
        res.json(allGenre);
    } catch (error) {
        res.status(400).json(error)
    };
});


module.exports = generoRouter;