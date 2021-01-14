require('dotenv').config()

const env = process.env

export default {
  mongodbUri:
    'mongodb+srv://' +
    env.DB_USER +
    ':' +
    env.DB_PW +
    '@trailerdb1.sb7wv.mongodb.net/movies?retryWrites=true&w=majority',
  serverPort: env.PORT
}
