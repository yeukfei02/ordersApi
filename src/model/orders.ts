import * as mongoose from 'mongoose';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';

const userTimezone = momenttz.tz.guess();
const currentDateWithTimezone = moment.tz(moment().format(), userTimezone);

const ordersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  origin_latitude: { type: String, required: true },
  origin_longitude: { type: String, required: true },
  destination_latitude: { type: String, required: true },
  destination_longitude: { type: String, required: true },
  distance: { type: String, required: true },
  status: { type: String, required: true },
  created_by: { type: Date, default: currentDateWithTimezone },
  updated_by: { type: Date, default: currentDateWithTimezone },
});

const ordersModel = mongoose.model('Orders', ordersSchema);

export default ordersModel;
