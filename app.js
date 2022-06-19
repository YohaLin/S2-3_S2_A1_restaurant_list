const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 搜尋字串清除前後空白：若使用者輸入文字前後有多餘空白，利用trim()來優化文字
// 搜尋條件：輸入店家名稱或是餐廳類別，都會找得到想要的餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().trim().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`this is page created on http://localhost:${port}`)
})