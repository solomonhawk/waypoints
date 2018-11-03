const dotenv = require('dotenv')
const path = require('path')

let noEnvConfig = dotenv.config({
  path: path.resolve(__dirname, '..', '.env')
}).error

if (noEnvConfig) {
  console.warn('')
  console.warn(
    'No .env file was found. Please copy the environment configuration file using:'
  )
  console.warn('')
  console.warn('    cp .env.example .env')
  console.warn('')
  console.warn("We'll use .env.example for now")

  dotenv.config({
    path: path.resolve(__dirname, '..', '.env.example')
  })
}
