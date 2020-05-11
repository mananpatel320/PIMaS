const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

//Create Schema
const PRSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        materials: {
            type: Array,
            items: {
                    type: Object,
                    materialName: {
                        type: String,
                        required: true,
                        description: "The name of material."
                    },
                    quantity: {
                        type: Number,
                        default: 0,
                        required: true,
                        description: "The qty of material."
                    },
                    materialCode: {
                        type: Number,
                        required: true,
                        description: "4 digit code of material."
                    }
            }
        },
        postedBy: {
            type: ObjectId,
            ref: "users"
        }  
});

module.exports = PR = mongoose.model("pr", PRSchema);