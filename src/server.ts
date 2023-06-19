import mongoose from 'mongoose'
import app from './app'
import config from './config'

import { Server } from 'http'
let server: Server
process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`database connect successfully`)
    server = app.listen(config.port, () => {
      console.log(` app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`fail to connect the error is:${error}`)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled rejection detected,we are closing out server')
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
boostrap()

process.on('SIGTERM', () => {
  console.log('SIGTERM is reciived')
  if (server) {
    server.close()
  }
})
