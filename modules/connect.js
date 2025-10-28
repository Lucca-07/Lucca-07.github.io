import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado ao Mongoose!");
    } catch (error) {
        console.log("❌ Erro ao se conectar ao mongoose: " + error);
    }
}
