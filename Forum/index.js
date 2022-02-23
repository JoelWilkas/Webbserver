const express = require('express')
const app = express()
const articleRouter = require('./routers/articles')
const axios = require('axios')

const server = require('http').createServer(app)

app.set("view engine", "ejs")

app.use("/articles", articleRouter)



app.get('/', async (req, res) => {

   const articles = await axios.get('http://localhost:3000/posts').then((data) => { return data.data})


    res.render("index", {articles: articles})
})


server.listen(8080, () => {
    console.log("Listening on port 8080")
})