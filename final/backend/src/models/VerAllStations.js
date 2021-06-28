
// Define VerAllStationsScheme
//   version    : String
//   stations   : [String]

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const VerAllStationsScheme = new Schema({
    version: {
        type: String,
        required: [true, 'Version field is required.']
    },
    stations: {
        type: [String],
        required: [true, 'Stations field is required.']
    }
});
const VerAllStations = mongoose.model('VerAllStations', VerAllStationsScheme);

export default VerAllStations;