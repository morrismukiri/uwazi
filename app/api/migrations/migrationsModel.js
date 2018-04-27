import mongoose from 'mongoose';
import instanceModel from 'api/odm';

const entitySchema = new mongoose.Schema({
  version: Number,
  type: String,
  name: String,
  description: String
});

const schema = mongoose.model('migrations', entitySchema);
const Model = instanceModel(schema);

export default Model;