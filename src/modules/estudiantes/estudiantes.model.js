import mongoose from "mongoose";
const estudiantesSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true,
       trim: true,
       minlength: 3,
       maxlength: 150,
    },
    programa_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programas",
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

export default mongoose.model("Estudiantes", estudiantesSchema, "estudiantes");