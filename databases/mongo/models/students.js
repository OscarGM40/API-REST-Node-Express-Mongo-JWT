const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    firstName:{ type:String, required:true },
    lastName:{ type:String, required:true },
    age:{ type:Number, required:true },
    courses:[{
        type:Schema.Types.ObjectId,
        ref:'courses',
       // autopopulate:false,
    }],
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }

},{
    timestamps:true,
    versionKey:false,
});

//schema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('students',schema);

module.exports = model;