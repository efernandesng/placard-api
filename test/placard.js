const placard = require('../src/index');
const should = require('should');
const assert = require('assert');
const util = require('util');

describe('Placard', function () {
  this.timeout(5000);

  describe('#fullSportsBook()', function () {
    var resData;

    it('should return a promise with fetched data', function (done) {
      placard.fullSportsBook()
        .then(function () {
          done()
        })
        .catch(function (err) {
          throw err;
        })
    });

    it('should call a callback', function (done) {
      placard.fullSportsBook(function (err, data) {
        if (err) throw err;

        resData = data;
        done()
      })
    });

    it('should have status property', function () {
      assert.equal(true, resData.hasOwnProperty('status'))
    })
  });

  describe('#nextEvents()', function () {
    var resData;

    it('should return a promise with fetched data', function (done) {
      placard.nextEvents()
        .then(function () {
          done()
        })
        .catch(function (err) {
          throw err;
        })
    });

    it('should call a callback', function (done) {
      placard.nextEvents(function (err, data) {
        if (err) throw err;

        resData = data;
        done()
      })
    });

    it('should have status property', function () {
      assert.equal(true, resData.hasOwnProperty('status'))
    })
  });

  describe('#info()', function () {
    var resData;

    it('should return a promise with fetched data', function (done) {
      placard.info()
        .then(function () {
          done()
        })
        .catch(function (err) {
          throw err;
        })
    });

    it('should call a callback', function (done) {
      placard.info(function (err, data) {
        if (err) throw err;

        resData = data;
        done()
      })
    });

    it('should be an array if data !== undefined', function () {
      if (resData) assert.equal(true, util.isArray(resData))
    })
  });

  describe('#faq()', function () {
    var resData;

    it('should return a promise with fetched data', function (done) {
      placard.faq()
        .then(function () {
          done()
        })
        .catch(function (err) {
          throw err;
        })
    });

    it('should call a callback', function (done) {
      placard.faq(function (err, data) {
        if (err) throw err;

        resData = data;
        done()
      })
    });

    it('should be an array', function () {
      assert.equal(true, util.isArray(resData))
    })
  })
});