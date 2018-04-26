const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://qyenmbnuoiazit:59852056736018dbede87080618482edee37389131aa801d711b7f05587ada3f@ec2-54-83-58-222.compute-1.amazonaws.com:5432/d4gp1ntkteqbl8',
  ssl: true
});

client.connect();

client.query('SELECT * from teammember', (err, res) => {
  console.log(res.command)
});

// client.query('SELECT * from manager', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from coach', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from player', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from budget', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from utilities', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from budgetmanager', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from utilitiesmanager', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from utilitiescoach', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from utilitiesplayer', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from utilitiesbudget', (err, res) => {
//   console.log(err,res)
// });

// client.query('SELECT * from utilitieslikes', (err, res) => {
//   console.log(err,res)
// });


// Result {
//   command: 'SELECT',
//   rowCount: 15,
//   oid: null,
//   rows:
//    [ anonymous { id: 1, name: 'manager1', phonenumber: '1111111111' },
//      anonymous { id: 2, name: 'manager2', phonenumber: '2222222222' },
//      anonymous { id: 3, name: 'coach3', phonenumber: '3333333333' },
//      anonymous { id: 4, name: 'coach4', phonenumber: '4444444444' },
//      anonymous { id: 5, name: 'coach5', phonenumber: '5555555555' },
//      anonymous { id: 6, name: 'coach6', phonenumber: '6666666666' },
//      anonymous { id: 7, name: 'player7', phonenumber: '7777777777' },
//      anonymous { id: 8, name: 'player8', phonenumber: '8888888888' },
//      anonymous { id: 9, name: 'player9', phonenumber: '9999999999' },
//      anonymous { id: 10, name: 'player10', phonenumber: '1010101010' },
//      anonymous { id: 11, name: 'player11', phonenumber: '1111111111' },
//      anonymous { id: 12, name: 'player12', phonenumber: '1212121212' },
//      anonymous { id: 13, name: 'player13', phonenumber: '1313131313' },
//      anonymous { id: 14, name: 'player14', phonenumber: '1414141414' },
//      anonymous { id: 6652, name: 'a', phonenumber: 'undefined' } ],
//   fields:
//    [ Field {
//        name: 'id',
//        tableID: 7699797,
//        columnID: 1,
//        dataTypeID: 23,
//        dataTypeSize: 4,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'name',
//        tableID: 7699797,
//        columnID: 2,
//        dataTypeID: 25,
//        dataTypeSize: -1,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'phonenumber',
//        tableID: 7699797,
//        columnID: 3,
//        dataTypeID: 25,
//        dataTypeSize: -1,
//        dataTypeModifier: -1,
//        format: 'text' } ],
//   _parsers:
//    [ [Function: parseInteger],
//      [Function: noParse],
//      [Function: noParse] ],
//   RowCtor: [Function: anonymous],
//   rowAsArray: false,
//   _getTypeParser: [Function: bound ] }