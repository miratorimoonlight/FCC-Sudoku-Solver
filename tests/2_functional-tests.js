const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('Puzzle Solve (POST /api/solve)', function() {

    test('Solve a puzzle with valid puzzle string', function(done) {
      let expected = '568913724342687519197254386685479231219538467734162895926345178473891652851726943'

      chai.request(server)
        .post('/api/solve')
        .send({
          'puzzle': '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, { solution: expected });
          done();
        })
    })

    test('Solve a puzzle with missing puzzle string', function(done) {
      let expected = { error: 'Required field missing' }

      chai.request(server)
        .post('/api/solve')
        .send({})
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Solve a puzzle with invalid characters', function(done) {
      let expected = { error: 'Invalid characters in puzzle' }

      chai.request(server)
        .post('/api/solve')
        .send({
          'puzzle': 'A..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Solve a puzzle with incorrect length', function(done) {
      let expected = { error: 'Expected puzzle to be 81 characters long' }

      chai.request(server)
        .post('/api/solve')
        .send({
          'puzzle': '.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Solve a puzzle that cannot be solved', function(done) {
      let expected = { error: 'Puzzle cannot be solved' };

      chai.request(server)
        .post('/api/solve')
        .send({
          'puzzle': '55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

  })

  suite('Test on Check (POST /api/check)', function() {

    test('Check a puzzle placement with all fields', function(done) {
      let expected = { "valid": true, "conflict": [] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: '7'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with single placement conflict', function(done) {
      let expected = { "valid": false, "conflict": ["column"] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: '6'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with multiple placement conflicts', function(done) {
      let expected = { "valid": false, "conflict": ["row", "region"] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: '9'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with all placement conflicts', function(done) {
      let expected = { "valid": false, "conflict": ["row", "column", "region"] };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: '5'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with missing required fields', function(done) {
      let expected = { "error": "Required field(s) missing" };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with invalid characters', function(done) {
      let expected = { error: 'Invalid value' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: 'a'
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with incorrect length', function(done) {
      let expected = { error: 'Expected puzzle to be 81 characters long' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: 9
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with invalid placement coordinate', function(done) {
      let expected = { error: 'Invalid coordinate' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'x1',
          value: 9
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

    test('Check a puzzle placement with invalid placement value', function(done) {
      let expected = { error: 'Invalid value' };

      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'a1',
          value: 12
        })
        .end(function(err, res) {
          assert.deepEqual(res.body, expected);
          done();
        })
    })

  })
});

