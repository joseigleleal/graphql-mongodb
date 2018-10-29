import express from "express"
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/graphql-test')
  .then(() => console.log('mongo conected'))
  .catch(err => console.log(err))

// mongodb models
import Car from './models/Car'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'

const app = express();

app.set('port', process.env.PORT || 3001)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

//routes
app.use('/graphql', express.json(), graphqlExpress({
  schema,
  context: {
    Car
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))


app.listen(app.get('port'), () => {
  console.log('server puerto 3001')
});
