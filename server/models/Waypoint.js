const mongoose = require('mongoose')
const Schema = mongoose.Schema

const waypointSchema = new Schema({
  waypointName: { type: String, required: true },
  links: { type: String },
  coords: { type: Object },
  text: { type: String },
  pointsOfInterest: [{ type: Schema.Types.ObjectId, ref: 'PointOfInterest' }],
  falseRoute: { type: Array }
})

const Waypoint = mongoose.model('Waypoint', waypointSchema)

module.exports = Waypoint
