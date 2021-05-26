import Rollbar from 'rollbar';
import { isProd } from './isLocalHost';

var rollbarConfig = {
  accessToken: '2483602fb1964e82aa3788a2fce8a531',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: isProd ? 'production' : 'dev',
  },
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
