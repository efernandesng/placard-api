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
                .then(()=> {
                    done()
                })
                .catch((err)=> {
                    throw err;
                })
        });

        it('should call a callback', function (done) {
            placard.fullSportsBook((err, data)=> {
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
                .then(()=> {
                    done()
                })
                .catch((err)=> {
                    throw err;
                })
        });

        it('should call a callback', function (done) {
            placard.nextEvents((err, data)=> {
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
                .then(()=> {
                    done()
                })
                .catch((err)=> {
                    throw err;
                })
        });

        it('should call a callback', function (done) {
            placard.info((err, data)=> {
                if (err) throw err;

                resData = data;
                done()
            })
        });

        it('should be an array', function () {
            assert.equal(true, util.isArray(resData))
        })
    });

    describe('#faq()', function () {
        var resData;

        it('should return a promise with fetched data', function (done) {
            placard.faq()
                .then(()=> {
                    done()
                })
                .catch((err)=> {
                    throw err;
                })
        });

        it('should call a callback', function (done) {
            placard.faq((err, data)=> {
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