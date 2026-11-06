import mongoose from "mongoose";
const programasSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true,
       trim: true,
       minlength: 3,
       maxlength: 150,
    },
    facultad_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facultades",
        required: true,
    },
    codigo:{
       type: String,
       required: true,
       trim: true,
       minlength: 3,
       maxlength: 150  
    }
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Programas", programasSchema, "programas");