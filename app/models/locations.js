import mongoose, {Schema} from "mongoose"

const locationsSchema = new Schema({
    from : {
        type : String,
        required: true,
        trim: true
    },

    to : {
        type: String,
        required: true,
        trim: true
    },

})

const Locations = mongoose.models.Locations || mongoose.model("Locations", locationsSchema)

export default Locations