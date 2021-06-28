
// Define DistrictScheme
//   version   : String
//   districts : [String]

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const DistrictSchema = new Schema({
    version: {
        type: String,
        required: [true, 'Version field is required.']
    },
    districts: {
        type: [String],
        required: [true, 'Districts field is required.']
    }
});
const District = mongoose.model('District', DistrictSchema);

export default District;