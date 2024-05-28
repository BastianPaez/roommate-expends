import express from 'express';
import roommatesRouter from './routes/roommates.route.js'
const app = express();



app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));


app.use('/', roommatesRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})