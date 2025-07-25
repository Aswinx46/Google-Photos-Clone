import mongoose from "mongoose"
export class ConnectMongo {
    private databaseUrl: string
    constructor() {
        if (!process.env.MONGODB) {
            throw new Error("No Mongodb url Found")
        } else {
            this.databaseUrl = process.env.MONGODB
        }
    }
    async connectMongo() {
        try {
            await mongoose.connect(this.databaseUrl)
            console.log('Mongodb server connected successfully')
        } catch (error) {
            console.log('error while connecting mongodb server', error)
            process.exit(1)
        }
    }
}