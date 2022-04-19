const Knex = require('knex');
const config = require('./knexfile').development;
const knex = Knex(config);

module.exports = knex;
