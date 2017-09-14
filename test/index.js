/* global describe, it */

const should = require('should')
const chpParse = require('../index')
const fs = require('fs')

describe('Using a valid larger chainpoint v3 JSON file', function () {
  it('should return proof equal to original JSON', function (done) {
    fs.readFile('./test/data/chainpoint-proof-v3.chp.json', 'utf-8', function (err, jsonSample) {
      should.not.exist(err)
      should.exist(jsonSample)
      chpParse.parseObject(JSON.parse(jsonSample), function (err, result) {
        result.branches.length.should.equal(1)
        result.branches[0].anchors.length.should.equal(1)
        result.branches[0].branches.length.should.equal(1)
        result.branches[0].branches[0].anchors.length.should.equal(1)
        result.branches[0].branches[0].anchors[0].expected_value.should.equal('6ca04599f53305103a87f087147e7d4b5748e584491e2aea150fffe5b2e75bcb'.match(/.{2}/g).reverse().join(''))
        should.not.exist(result.branches[0].branches[0].branches)
        should.not.exist(err)
        done()
      })
    })
  })
})

describe('Using a valid chainpoint v3 binary Base 64 file', function () {
  it('should return proof equal to original JSON', function (done) {
    let b64Sample = fs.readFileSync('./test/data/chainpoint-proof-v3.chp.b64', 'utf-8')
    should.exist(b64Sample)
    chpParse.parseBinary(b64Sample, function (err, result) {
      result.branches.length.should.equal(1)
      result.branches[0].anchors.length.should.equal(1)
      result.branches[0].branches.length.should.equal(1)
      result.branches[0].branches[0].anchors.length.should.equal(1)
      result.branches[0].branches[0].anchors[0].expected_value.should.equal('6ca04599f53305103a87f087147e7d4b5748e584491e2aea150fffe5b2e75bcb'.match(/.{2}/g).reverse().join(''))
      should.not.exist(result.branches[0].branches[0].branches)
      should.not.exist(err)
      done()
    })
  })
})
