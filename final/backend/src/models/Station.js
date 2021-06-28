
// Define StationScheme
//   districtVer : String
//   stations    : [String]

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const StationSchema = new Schema({
    districtVer: {
        type: String,
        required: [true, 'DistrictVer field is required.']
    },
    stations: {
        type: [String],
        required: [true, 'Stations field is required.']
    }
});
const Station = mongoose.model('Station', StationSchema);

export default Station;