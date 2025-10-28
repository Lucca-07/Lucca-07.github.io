import mongoose from "mongoose";

const FilmeSchema = mongoose.Schema({
    titulo: String,
    sinopse: String,
});

export default mongoose.model("Filme", FilmeSchema);
