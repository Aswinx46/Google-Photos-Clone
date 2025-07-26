import dotenv from 'dotenv'
dotenv.config()
import express, { Express, urlencoded, } from 'express'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
import morgan from 'morgan'
import rateLimiter from 'express-rate-limit'
import helmet from "helmet";
import { ConnectMongo } from './framework/database/dbConnection/dbConnection'
import { UserRoute } from './framework/routes/user/userRoute'
import redisService from './framework/services/redisService'

export class App {
    private app: Express
    private mongoose: ConnectMongo
    constructor() {
        this.mongoose = new ConnectMongo()
        this.app = express()
        this.setUpMiddleware()
        this.setUpSafetyFeature()
        this.setUserRoute()
        this.redisConnect()
    }
    private setUpMiddleware() {
        this.app.use(cors({
            origin: process.env.ORIGIN,
            credentials: true
        }))
        this.app.use(cookie_parser())
        this.app.use(express.json())
        this.app.use(urlencoded({ extended: true }))
        this.app.use(morgan('dev'))
    }
    private setUpSafetyFeature() {
        const limiter = rateLimiter({
            windowMs: 5 * 60 * 100,
            max: 100,
            message: "Too much Request From this IP"
        })
        this.app.use(limiter)
        this.app.use(helmet())
    }
    private setUserRoute() {
        this.app.use('/api/v1/users', new UserRoute().userRoute)
    }
    private async redisConnect(){
        await redisService.connect()
    }
    public async listen() {
        await this.mongoose.connectMongo()
        this.app.listen(process.env.PORT || 3000, () => console.log('Server Running'))
    }
}

const app = new App()
app.listen()