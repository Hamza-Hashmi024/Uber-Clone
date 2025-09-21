const mongoesse = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoesse.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "Name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "Last Name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email Name must be at least 5 characters long"],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: { type: String, required: true, select: false  },

    socketId: { type: String },
   status: {
  type: String,
  enum: ['active', 'inactive'],
  default: 'inactive'
},
    vechicle : { 
        color : {
            type : String,
            required : true,
            minlength : [3 , "Color must be at least 3 characters long"],

        },
        plate :{
            type : String,
            required : true,
            unique : true,
            minlength : [3 , "Plate must be at least 3 characters long"],
        },
        capicity : {
            type : Number,
            required : true,
            min : [1 , "Capacity must be at least 1"]
        },

        vechicleType : {
            type : String,
            enum : ['car' , 'motorcycle' , 'auto'],
            required : true,
            default : 'car'
        }
     },
    location: {
        lat : { type: Number, required: true },
        lng : { type: Number, required: true }
    }

}, { timestamps: true });

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: `24h` });
    return token;
};

captainSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);

}

captainSchema.statics.hashPassword = async function (Password) {
    return await bcrypt.hash(Password, 10);
}
const captainModel = mongoesse.model("Captain", captainSchema);
module.exports = captainModel;


