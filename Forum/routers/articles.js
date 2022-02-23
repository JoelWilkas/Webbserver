const express = require('express')
const axios = require('axios')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))




router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.get('/:id', async (req, res) => {
    const article = await axios.get('http://localhost:3000/posts')
    const result = article.data.filter((data) => {
        return data.id == req.params.id
    })
    if(result.length == 0) res.redirect('/')
    
    
    res.render('articles/show', {article: result[0]})
})

router.post('/remove', (req, res) => {
    res.redirect('/')
    try{
        axios.delete(`http://localhost:3000/posts/${req.body.id}`)
    }catch(e){
        console.log(e)
    }
})
router.post('/', (req, res) => {
    const article = {

        timestamp: new Date().toLocaleDateString(),
        author: "User",
        title: req.body.title,
        description: req.body.description
    }

    axios({
        method: 'post',
        url: 'http://localhost:3000/posts',
        data: article
      }).then((result) => {
        try{
            res.redirect(`/articles/${result.data.id}`)
        }catch(e){
            console.log(e)
        }
      })

    
})

module.exports = router