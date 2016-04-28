import Promise from 'bluebird';
import moment from 'moment';
import request from 'superagent';
import * as pkg from '../package.json';

const URL = 'www.jogossantacasa.pt';
const USER_AGENT = `${pkg.name}/${pkg.version}`;
const API_KEY = '552CF226909890A044483CECF8196792';
const CHANNEL = '1';

const makeRequest = (options) => new Promise((resolve, reject)=> {
  request
    .get(`https://${URL}/${options.path}`)
    .query({
      apiKey: API_KEY,
      channel: CHANNEL,
      ...options.query
    })
    .set('If-Modified-Since', moment().format('ddd, D MMM YYYY HH:mm:ss [GMT]Z'))
    .set('User-Agent', USER_AGENT)
    .end((err, res)=> {
      if (err) return reject(err);

      const data = res.body,
        header = data.header;

      if (header.responseSuccess === false) {
        return reject(new Error(`${header.errorCode} - ${header.errorMessage}`))
      }

      resolve(data.body.data);
    })
});

const placard = {
  fullSportsBook(cb) {
    return makeRequest({
      path: '/WebServices/SBRetailWS/FullSportsBook'
    }).nodeify(cb)
  },

  nextEvents(cb) {
    return makeRequest({
      path: '/WebServices/SBRetailWS/NextEvents'
    }).nodeify(cb)
  },

  info(cb) {
    return makeRequest({
      path: '/WebServices/ContentWS/Contents/',
      query: {categoryCode: 'ADRETAILINFOS'}
    }).nodeify(cb)
  },

  faq(cb) {
    return makeRequest({
      path: '/WebServices/ContentWS/Contents/',
      query: {categoryCode: 'ADRETAILFAQSAPP'}
    }).nodeify(cb)
  }
};

module.exports = placard;
