var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

const {
	Client
} = require('pg');
const path = require('path');
// const indexPath = path.join(__dirname, './proj/index.html');
// const publicPath = express.static(path.join(__dirname, './proj/dist'));

const client = new Client({
	connectionString: 'postgres://xvombpfekrvljy:369ff155099b7d4f4d7f6e5d9863197046bd027e312ea1ac111274d3da3bf249@ec2-54-243-63-13.compute-1.amazonaws.com:5432/d4j91het3r0a76',

	//connectionString: 'postgres://qyenmbnuoiazit:59852056736018dbede87080618482edee37389131aa801d711b7f05587ada3f@ec2-54-83-58-222.compute-1.amazonaws.com:5432/d4gp1ntkteqbl8',
	ssl: true
});

client.connect();


app.set('port', (process.env.PORT || 4000));
app.use(express.static(path.join(__dirname, 'proj')));
app.get('/.*', function (req, res) {
	res.sendFile(path.join(__dirname, '/proj', 'index.html'));
});


app.post('/update', function (req, res) {
	console.log(req.body);
	res.send({ operation_name: req.body.operation_name })
});

app.post('/aggregate', function (request, response) {
	let cid = reqest.body.cid;

});
app.post('/login', function (req, response) {
	console.log(req.body);
	let pw_number = parseInt(req.body.pw);
	let identity;
	client.query("SELECT mid FROM manager WHERE mid =" + pw_number, (err, res) => {
		if (res.rows.length > 0) {
			//console.log('enter');
			identity = "manager"
			response.send({ identity: identity, login: true });
		} else {
			client.query("SELECT cid FROM coach WHERE cid =" + pw_number, (err, res) => {
				if (res.rows.length > 0) {
					identity = "coach"
					response.send({ identity: identity, login: true });
				} else {
					client.query("SELECT pid FROM player WHERE pid =" + pw_number, (err, res) => {
						if (res.rows.length > 0) {
							identity = "player"
							response.send({ identity: identity, login: true });
						} else {
							response.send({ identity: '', login: false });
						}
					});

				}
			});
		}
	});

});

app.post('/seecoachutilities', function (req, response) {
	let cid = parseInt(req.body.cid);
	// let filter = req.body.filter;
	//let filter = ['cost', 'approved', 'cid']
	let filter = '';
	if (req.body.filter.length === 0) {
		filter = '*';
	} else {
		filter = req.body.filter.join(',');
	}
	client.query("SELECT " + filter + " FROM utilities U, utilitiescoach UC WHERE U.uid = UC.uid and UC.cid = " + cid, (err, res) => {
		if (err) {
			console.log(err);
			response.send({ info: 'cannot find coach utilities', result: null });
		} else {
			console.log(res.rows);
			response.send({ result: res, info: 'data sent' });
		}
	});

});

app.post('/seeplayerutilities', function (req, response) {
	let pid = parseInt(req.body.pid);
	let filter = '';
	if (req.body.filter.length === 0) {
		filter = '*';
	} else {
		filter = req.body.filter.join(',');
	}
	client.query("SELECT " + filter + " FROM utilitiesplayer WHERE pid = " + pid, (err, res) => {
		if (err) {
			console.log(err);
			response.send({ info: 'cannot find player utilities', result: null });
		} else {
			console.log(res.rows);
			response.send({ result: res, info: 'data sent' });
		}
	});
});


app.post('/averagecost', function (req, response) {
	let mid = parseInt(req.body.mid);
	console.log(JSON.stringify(req.body));
	client.query("SELECT AVG(U.cost) FROM utilities U, utilitiesmanager UM WHERE U.uid = UM.uid AND UM.mid =" + mid, (err, res) => {
		if (err) {
			console.log(err);
			response.send({ result: null, info: 'find Avg cost unsuccessful' });
		} else {
			console.log('result avg send');
			response.send({ result: res });
		}
	})
});

app.post('/mostexpensive', function (req, response) {
	console.log(JSON.stringify(req.body));
	console.log('enter')
	let mid = parseInt(req.body.mid);
	client.query("SELECT MAX(U.cost) FROM utilities U, utilitiesmanager UM WHERE U.uid = UM.uid AND UM.mid =" + mid, (err, res) => {
		if (err) {
			console.log(err);
			response.send({ result: null, info: 'find Max util unsuccessful' });
		} else {
			console.log('result send');
			response.send({ result: res });
		}
	}
	)
});
app.post('/cheapest', function (req, response) {
	let mid = parseInt(req.body.mid);
	client.query("SELECT MIN(U.cost) FROM utilities U, utilitiesmanager UM WHERE U.uid = UM.uid AND UM.mid =" + mid, (err, res) => {
		if (err) {
			console.log(err);
			response.send({ result: null, info: 'find Min util unsuccessful' });
		} else {
			console.log('result send');
			response.send({ result: res });
		}
	}
	)
});

app.post('/assignedutility', function (request, response) {
	client.query("SELECT * FROM Utilities U WHERE NOT EXISTS ((SELECT M.mid FROM Manager M) EXCEPT (SELECT UM.mid FROM UtilitiesManager UM WHERE U.uid = UM.uid))", (err, res) => {
		if (err) {
			console.log(err);
			response.send({ result: null, info: 'find Min util unsuccessful' });
		} else {
			console.log('result send');
			response.send({ result: res });
		}
	});
})
app.post('/averagebudget', function (request, response) {
	let mid = request.body.mid;
	client.query("SELECT AVG(B.totalamount) FROM budget B, budgetmanager BM WHERE BM.bid = B.bid AND BM.mid =" + mid, (err, res) => {
		if (err) {
			console.log(err);
			response.send({ result: null, info: 'find Avg budget unsuccessful' });
		} else {
			console.log('result send');
			response.send({ result: res });
		}
	}
	)
});
app.post('/explainutilities', function (request, response) {
	let name = request.body.name;
	let res = null;
	let filter = 'MAX';
	if (request.body.radio === 'Min') {
		filter = 'MIN';
	}
	client.query("SELECT " + name + ", AVG(cost) FROM utilities GROUP BY " + name + "", (err, resp) => {
		if (err) {
			//console.log(err);
			response.send({ result: null, info: 'cannot group' });
		} else {
			res = resp;
			client.query("SELECT " + filter + "(avg) FROM (SELECT " + name + ", AVG(cost) FROM utilities GROUP BY " + name + ") T", (error, respo) => {
				if (error) {
					console.log(error);
					response.send({ result: null, info: 'cannot find max/min after grouping' });
				} else {
					let str = '';
					if (filter === 'MAX') {
						str = 'the max after grouping is ' + Math.round(respo.rows[0].max);
					} else if (filter === 'MIN') {
						str = 'the min after grouping is ' + Math.round(respo.rows[0].min);
					}
					// console.log('result send');
					// console.log(JSON.stringify(respo))
					response.send({ result: res, info: str });
				}
			})
		}
	}
	)
});
app.post('/updatecost', function (request, response) {
	console.log(JSON.stringify(request.body));
	let cost = parseInt(request.body.cost);
	let uid = parseInt(request.body.uid);
	client.query("UPDATE utilities SET cost = " + cost + " WHERE uid =" + uid, (err, res) => {
		if (err) {
			console.log('update unsuccessful');
			response.send({ result: null, info: 'update unsuccessful' });
		} else {
			client.query("SELECT * FROM utilities" + " WHERE uid =" + uid, (err, res) => {
				console.log('update successful');
				response.send({ result: res, info: 'update successful' });
			})
		}
	});
});
// app.post('/seeutilities', function (request, response) {
// 	let uid = parseInt(request.body.uid);
// 	client.query("SELECT * FROM utilities" + " WHERE uid =" + uid, (err, res) => {
// 		console.log('update successful');
// 		response.send({ result: res, info: 'update successful' });
// 	})
// });


app.post('/deletecoach', function (req, response) {
	let cid = parseInt(req.body.cid);
	client.query("DELETE FROM teammember WHERE id =" + cid, (err, res) => {
		if (typeof res === 'undefined') {
			console.log('enter undefined')
			response.send({ info: 'cannot delete coach check if the id is valid',result:{rows:[]} });
		} else {
			client.query("SELECT * FROM teammember INNER JOIN coach ON teammember.id = coach.cid", (err, resp) => {
				if (resp.rowCount === 0) {
					console.log('enter delete')
					response.send({ info: 'cannot join table', result:{rows:[]} });
				}
				else {
					console.log('result send');
					response.send({ info: 'successfully deleted coach and show joined teammember and coach table', result:resp });
				}
			});
		}

		// if (res.rowCount === 0) {
		// 	response.send({ result: 'cannot delete coach' });
		// }
		// else {
		// 	console.log('result send');
		// 	response.send({ result: 'successfully deleted coach' });
		// }
	})
});
app.post('/insertutil', function (req, response) {
	console.log(JSON.stringify(req.body));
	let uid = parseInt(req.body.uid);
	let cost = parseInt(req.body.cost);
	let name = req.body.name;
	let description = req.body.description;
	client.query("INSERT INTO utilities (uid,name,description,cost,approved) VALUES (" + uid + "," + "'" + name + "'" + "," + "'" + description + "'" + "," + cost + ",false)", (err, res) => {
		if (typeof res === 'undefined') {
			response.send({ info: 'cannot insert new utility check if the id is unique' });
		}
		else {
			console.log('insert m1');
			client.query("INSERT INTO utilitiesmanager (mid,uid) VALUES (1," + uid + ")", (err, res) => {
				if (typeof res === 'undefined') {
					response.send({ info: 'cannot insert manager' });
				} else {
					console.log('insert m2');
					client.query("INSERT INTO utilitiesmanager (mid,uid) VALUES (2," + uid + ")", (err, res) => {
						if (typeof res === 'undefined') {
							response.send({ info: 'cannot insert manager' });
						} else {
							console.log('success')
							response.send({ info: 'successfully insert utility and assigned it to all managers' });
						}
					});
				}
			})
		};
	});
	// client.query("INSERT INTO utilities (uid,name,description,cost,approved) VALUES ("+uid+","+"'"+name+"'"+","+"'"+description+"'"+","+cost+",false)", (err, res) => {
	// 	console.log(err, res);
	// });
	// client.query("DELETE FROM teammember WHERE id =" + cid, (err, res) => {
	// 	if (res.rowCount === 0) {
	// 		response.send({ result: 'cannot delete coach' });
	// 	}
	// 	else {
	// 		console.log('result send');
	// 		response.send({ result: 'successfully deleted coach' });
	// 	}
	// })
});
app.post('/deleteutility', function (req, response) {
	let uid = req.body.uid;
	client.query("DELETE FROM utilities WHERE uid =" + uid, (err, res) => {
		if (err) {
			console.log(err);
		}
		else {
			console.log('result send');
			response.send({ result: res });
		}
	})
});

app.post('/findnewcoach', function (req, response) {
	console.log(JSON.stringify(req.body));
	let pid = parseInt(req.body.pid);
	let cid = parseInt(req.body.cid);
	client.query("UPDATE player SET cid = " + cid + " WHERE pid = " + pid + " AND cid IS NULL", (err, res) => {
		console.log(JSON.stringify(res));
		if (typeof res === 'undefined') {
			response.send({ str: '', info: 'invalid coach id' });
		} else if (res.rowCount === 0) {
			response.send({ str: '', info: 'cannot find new coach maybe you have an assigned coach' });
		} else {
			client.query('SELECT ' + '*' + ' from player WHERE pid =' + pid + '', (err, resp) => {
				if (err) {
					response.send({ str: '', info: 'pid not valid' });
				}
				else {
					console.log('result send');
					response.send({ str: 's', result: resp, info: 'successfully assigned new coach' });
				}
			});

		}
	})
});

app.post('/searchplayer', function (req, response) {
	console.log(JSON.stringify(req.body))
	let filter = req.body.filter;
	if (filter.length === 0) {
		filter = '*';
	} else {
		filter = filter.join(',');
		console.log(JSON.stringify(filter));
	}
	client.query('SELECT ' + filter + ' from player', (err, res) => {
		// console.log(res.command)
		//console.log(res.command);
		response.send({ result: res });
	});
});
app.post('/approve', function (request, response) {
	let uid = parseInt(req.body.uid);
	client.query(
		"SELECT bid FROM utilitiesbudget WHERE uid=" + uid,
		(err, res) => {
			if (err) {
				console.log(err);
			} else {
				bid = res.rows[0].bid
				//set utility to true
				client.query(
					"UPDATE utilities SET approved = true WHERE approved=false AND uid=" + uid + "RETURNING cost",
					(err, res) => {
						if (err) {
							console.log(err);
						} else {
							cost = res.rows[0].cost;
							client.query(
								"UPDATE budget SET totalamount = totalamount -" + cost + " WHERE bid=" + bid,
								(err, res) => {
									if (err) {
										console.log(err);
									} else {
										console.log('Successfully charged ' + cost + ' from bid ' + bid + ' in budget table')
										console.log(res)
									}
								}
							);
						}
					}
				);
			}
		}
	);
});
app.post('/budgetutilitycost', function (request, response) {
	console.log('enter');
	console.log(JSON.stringify(request.body));
	let amount = parseInt(request.body.budget);
	client.query("SELECT * FROM utilitiesbudget INNER JOIN utilities ON utilitiesbudget.uid = utilities.uid WHERE utilities.cost > " + amount, (err, res) => {
		if (res.rowCount === 0) {
			response.send({ info: 'cannot find the budget with the cost', result: res });
		}
		else {
			console.log('result send');
			response.send({ result: res, info: 'data sent' });
		}
	})
});


app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});
