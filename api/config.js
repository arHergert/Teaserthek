require('dotenv').config()

const env = process.env

export default {
  mongodbUri:
    'mongodb+srv://' +
    env.DB_USER +
    ':' +
    env.DB_PW +
    '@' +
    env.DB_COLLECTION +
    '.sb7wv.mongodb.net/movies?retryWrites=true&w=majority'
}
