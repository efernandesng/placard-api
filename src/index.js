import Promise from 'bluebird';
import moment from 'moment';
import request from 'superagent';
import * as pkg from '../package.json';

const userAgent = `${pkg.name}/${pkg.version}`;
const apiKey = '552CF226909890A044483CECF8196792';
const channel = '1';

const makeRequest = (options) => new Promise((resolve, reject)=> {
  request
    .get(`https://www.jogossantacasa.pt/${options.endpoint}`)
    .query({apiKey, channel, ...options.query})
    .set('If-Modified-Since', moment().format('ddd, D MMM YYYY HH:mm:ss [GMT]Z'))
    .set('User-Agent', userAgent)
    .end((err, {body: {header, body}})=> {
      if (err) return reject(err);

      const {responseSuccess, errorCode, errorMessage} = header;

      if (responseSuccess === false) {
        return reject(new Error(`${errorCode} - ${errorMessage}`))
      }

      resolve(body.data);
    })
});

const endpoints = [
  {
    name: 'fullSportsBook',
    endpoint: '/WebServices/SBRetailWS/FullSportsBook'
  }, {
    name: 'nextEvents',
    endpoint: '/WebServices/SBRetailWS/NextEvents'
  }, {
    name: 'info',
    endpoint: '/WebServices/ContentWS/Contents/',
    query: {categoryCode: 'ADRETAILINFOS'}
  }, {
    name: 'faq',
    endpoint: '/WebServices/ContentWS/Contents/',
    query: {categoryCode: 'ADRETAILFAQSAPP'}
  }];

const placard = endpoints.reduce((prev, curr)=> {
  const {endpoint, query} = curr;
  prev[curr.name] = (cb)=> makeRequest({endpoint, query}).nodeify(cb);
  return prev;
}, {});

module.exports = placard;
