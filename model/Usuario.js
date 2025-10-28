import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UsuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UsuarioSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Usuario", UsuarioSchema);
