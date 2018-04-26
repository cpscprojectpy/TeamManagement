// const { Client } = require('pg');

// const client = new Client({
//   connectionString: 'postgres://qyenmbnuoiazit:59852056736018dbede87080618482edee37389131aa801d711b7f05587ada3f@ec2-54-83-58-222.compute-1.amazonaws.com:5432/d4gp1ntkteqbl8',
//   ssl: true
// });

// client.connect();

// client.query('SELECT * from test_table', (err, res) => {
//   console.log(err,res)
//   client.end();
// });

//console.log('start');
let info = 'dec'
let classname = ((info) => {
  let str = 'new ' + info;
  return function (){
    console.log('print log:: ' + str + arguments[0]);
  }
});

let func = classname('decorator');
func()
// let dec = ((info)  => {
//   let str = info + 'updated'
//   call = call(info)
// });

// dec('decorator');