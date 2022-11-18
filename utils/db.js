import mongoose from "mongoose";

const conn = {
    isConnected: false
}

export async function dbConnect () {

    if (conn.isConnected) return;

    const db = mongoose.connect(process.env.MONGODB_URL).then(res=> res)
    if(db){
        conn.isConnected = (await db).connections[0].readyState
    }

    console.log((await db).connection.db.databaseName)
}

mongoose.connection?.on("connected", () => {
    console.log("Mongodb is connected");
})
mongoose.connection?.on("error", (err) => {
    console.log(err);
})
