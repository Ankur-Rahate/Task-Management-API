import { config as conf } from "dotenv";
conf()
const _config = {
  port: process.env.PORT,
  connectionstring: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwtSecret:process.env.JWTSECRETE
}



export const config = Object.freeze(_config)