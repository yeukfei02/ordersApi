import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const ordersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  originLatitude: { type: String, required: true },
  originLongitude: { type: String, required: true },
  destinationLatitude: { type: String, required: true },
  destinationLongitude: { type: String, required: true },
  distance: { type: String, required: true },
  status: { type: String, required: true },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const ordersModel = mongoose.model('Orders', ordersSchema);

export default ordersModel;
