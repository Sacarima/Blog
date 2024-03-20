  import express from 'express'
  import { test } from '../controllers/user.controller.js'
  

  // Create an express router
  const router = express.Router()

  // Define the route for the API
   router.use('/test', test)

  export default router 