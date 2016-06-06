// Rise Hackathon server side code

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var serve_static = require('serve-static');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var url = require('url');
var setup = require('./setup');
var cors = require('cors');
var async = require('async');
var atob = require('atob');
//// Set Server Parameters ////
var host = setup.SERVER.HOST;
var port = setup.SERVER.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); 
app.use(cookieParser());
app.use(express.static('public'));
// Enable CORS preflight across the board.
app.options('*', cors());
app.use(cors());

var server = http.createServer(app).listen(port, function() {});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.NODE_ENV = 'production';
server.timeout = 240000;																							// Ta-da.
console.log('------------------------------------------ Server Up - ' + host + ':' + port + ' ------------------------------------------');


var part1 = require('./utils/ws_part1');
var ws = require('ws');
var wss = {};
var Ibc1 = require('ibm-blockchain-js');
var ibc = new Ibc1();

// ==================================
// load peers manually or from VCAP, VCAP will overwrite hardcoded list!
// ==================================
//this hard coded list is intentionaly left here, feel free to use it when initially starting out
//please create your own network when you are up and running
var manual ={
  "credentials": {
    "peers": [
      {
        "discovery_host": "1fed952f-f7df-474f-9152-f95250b7c0d2_vp1-discovery.blockchain.ibm.com",
        "discovery_port": 30303,
        "api_host": "1fed952f-f7df-474f-9152-f95250b7c0d2_vp1-api.blockchain.ibm.com",
        "api_port_tls": 443,
        "api_port": 80,
        "type": "peer",
        "network_id": "1fed952f-f7df-474f-9152-f95250b7c0d2",
        "container_id": "f5f5d04428906e3a6b6fcc1425a7d04d14d047b25bc3786cebcfd12d4f590744",
        "id": "1fed952f-f7df-474f-9152-f95250b7c0d2_vp1",
        "api_url": "http://1fed952f-f7df-474f-9152-f95250b7c0d2_vp1-api.blockchain.ibm.com:80"
      },
      {
        "discovery_host": "1fed952f-f7df-474f-9152-f95250b7c0d2_vp2-discovery.blockchain.ibm.com",
        "discovery_port": 30303,
        "api_host": "1fed952f-f7df-474f-9152-f95250b7c0d2_vp2-api.blockchain.ibm.com",
        "api_port_tls": 443,
        "api_port": 80,
        "type": "peer",
        "network_id": "1fed952f-f7df-474f-9152-f95250b7c0d2",
        "container_id": "e73b6069cc055a6a80e13af2d9bb8e7e9807241e2f18c07a4a0d220a2d4f5d15",
        "id": "1fed952f-f7df-474f-9152-f95250b7c0d2_vp2",
        "api_url": "http://1fed952f-f7df-474f-9152-f95250b7c0d2_vp2-api.blockchain.ibm.com:80"
      }
    ],
    "ca": {
      "1fed952f-f7df-474f-9152-f95250b7c0d2_ca": {
        "url": "1fed952f-f7df-474f-9152-f95250b7c0d2_ca-api.blockchain.ibm.com:30303",
        "discovery_host": "1fed952f-f7df-474f-9152-f95250b7c0d2_ca-discovery.blockchain.ibm.com",
        "discovery_port": 30303,
        "api_host": "1fed952f-f7df-474f-9152-f95250b7c0d2_ca-api.blockchain.ibm.com",
        "api_port_tls": 30303,
        "api_port": 80,
        "type": "ca",
        "network_id": "1fed952f-f7df-474f-9152-f95250b7c0d2",
        "container_id": "0c8ddefc7bd0c911feaca4c7daa5224ec2124500decf833909509a7035e8596d"
      }
    },
    "users": [
      {
        "username": "dashboarduser_type0_2120541dc7",
        "secret": "dddee7f0a6",
        "enrollId": "dashboarduser_type0_2120541dc7",
        "enrollSecret": "dddee7f0a6"
      },
      {
        "username": "dashboarduser_type0_7952a93c83",
        "secret": "05cb493e8a",
        "enrollId": "dashboarduser_type0_7952a93c83",
        "enrollSecret": "05cb493e8a"
      },
      {
        "username": "user_type1_9ebb173a80",
        "secret": "77f89c5a80",
        "enrollId": "user_type1_9ebb173a80",
        "enrollSecret": "77f89c5a80"
      },
      {
        "username": "user_type1_7eb5d4c209",
        "secret": "602535089e",
        "enrollId": "user_type1_7eb5d4c209",
        "enrollSecret": "602535089e"
      },
      {
        "username": "user_type1_56ed794e05",
        "secret": "f85d80a10f",
        "enrollId": "user_type1_56ed794e05",
        "enrollSecret": "f85d80a10f"
      },
      {
        "username": "user_type1_73f227c0f0",
        "secret": "9514c8ee3e",
        "enrollId": "user_type1_73f227c0f0",
        "enrollSecret": "9514c8ee3e"
      },
      {
        "username": "user_type1_127ee5a926",
        "secret": "64c65e9f8a",
        "enrollId": "user_type1_127ee5a926",
        "enrollSecret": "64c65e9f8a"
      },
      {
        "username": "user_type2_511331547d",
        "secret": "5fa90b7cd5",
        "enrollId": "user_type2_511331547d",
        "enrollSecret": "5fa90b7cd5"
      },
      {
        "username": "user_type2_8b1abbb46c",
        "secret": "6478ce3d74",
        "enrollId": "user_type2_8b1abbb46c",
        "enrollSecret": "6478ce3d74"
      },
      {
        "username": "user_type2_af162e39fc",
        "secret": "c95c10aa6f",
        "enrollId": "user_type2_af162e39fc",
        "enrollSecret": "c95c10aa6f"
      },
      {
        "username": "user_type2_10f46ad125",
        "secret": "d597040a57",
        "enrollId": "user_type2_10f46ad125",
        "enrollSecret": "d597040a57"
      },
      {
        "username": "user_type2_1d9223806c",
        "secret": "4c7a7236ce",
        "enrollId": "user_type2_1d9223806c",
        "enrollSecret": "4c7a7236ce"
      },
      {
        "username": "user_type4_8523a8ee21",
        "secret": "4fce51081e",
        "enrollId": "user_type4_8523a8ee21",
        "enrollSecret": "4fce51081e"
      },
      {
        "username": "user_type4_61c139a23b",
        "secret": "c5d010a271",
        "enrollId": "user_type4_61c139a23b",
        "enrollSecret": "c5d010a271"
      },
      {
        "username": "user_type4_359090ebf2",
        "secret": "444fdc117e",
        "enrollId": "user_type4_359090ebf2",
        "enrollSecret": "444fdc117e"
      },
      {
        "username": "user_type4_c5c1cca6b3",
        "secret": "7b9d5a4526",
        "enrollId": "user_type4_c5c1cca6b3",
        "enrollSecret": "7b9d5a4526"
      },
      {
        "username": "user_type4_aa9124ba4e",
        "secret": "cdbc76e8f6",
        "enrollId": "user_type4_aa9124ba4e",
        "enrollSecret": "cdbc76e8f6"
      },
      {
        "username": "user_type8_f0f56dffbe",
        "secret": "3e5fa3e959",
        "enrollId": "user_type8_f0f56dffbe",
        "enrollSecret": "3e5fa3e959"
      },
      {
        "username": "user_type8_72858215cd",
        "secret": "74a406f365",
        "enrollId": "user_type8_72858215cd",
        "enrollSecret": "74a406f365"
      },
      {
        "username": "user_type8_b965585859",
        "secret": "ccb94747e3",
        "enrollId": "user_type8_b965585859",
        "enrollSecret": "ccb94747e3"
      },
      {
        "username": "user_type8_d9caa02238",
        "secret": "c4455f0536",
        "enrollId": "user_type8_d9caa02238",
        "enrollSecret": "c4455f0536"
      },
      {
        "username": "user_type8_ec9b26bcc2",
        "secret": "4a82294fcf",
        "enrollId": "user_type8_ec9b26bcc2",
        "enrollSecret": "4a82294fcf"
      }
    ]
  }
};
var peers = manual.credentials.peers;
console.log('loading hardcoded peers');
var users = null;																		//users are only found if security is on
if(manual.credentials.users) users = manual.credentials.users;
console.log('loading hardcoded users');

// ==================================
// configure ibm-blockchain-js sdk
// ==================================
var options = 	{
					network:{
						peers: peers,
						users: users,
						options: {quiet: true, tls:false, maxRetry: 1}
					},
					chaincode:{
						zip_url: 'https://github.com/pawanjay176/marbles-chaincode/archive/master.zip',
						unzip_dir: 'marbles-chaincode-master/ebay',								//subdirectroy name of chaincode after unzipped
						git_url: 'https://github.com/pawanjay176/marbles-chaincode/ebay',		//GO get http url
					
						//hashed cc name from prev deployment
						//deployed_name: '14b711be6f0d00b190ea26ca48c22234d93996b6e625a4b108a7bbbde064edf0179527f30df238d61b66246fe1908005caa5204dd73488269c8999276719ca8b'
					}
				};

var payloads = [];
ibc.load(options, cb_ready);																//parse/load chaincode
var chaincode = null;
function cb_ready(err, cc){																	//response has chaincode functions
	if(err != null){
		console.log('! looks like an error loading the chaincode or network, app will fail\n', err);
		if(!process.error) process.error = {type: 'load', msg: err.details};				//if it already exist, keep the last error
	}
	else{
		chaincode = cc;
    console.log("deployed yo")
		part1.setup(ibc, cc);
		if(!cc.details.deployed_name || cc.details.deployed_name === ''){					//decide if i need to deploy
			cc.deploy('init', ['99'], {save_path: './cc_summaries', delay_ms: 50000}, cb_deployed);

		}
		else{
			console.log('chaincode summary file indicates chaincode has been previously deployed');
			cb_deployed();
		}
	}
}





// ============================================================================================================================
// 												WebSocket Communication Madness
// ============================================================================================================================
function cb_deployed(e, d){
	if(e != null){
		//look at tutorial_part1.md in the trouble shooting section for help
		console.log('! looks like a deploy error, holding off on the starting the socket\n', e);
		if(!process.error) process.error = {type: 'deploy', msg: e.details};
	}
	else{
		console.log('------------------------------------------ Websocket Up ------------------------------------------');
		
		wss = new ws.Server({server: server});												//start the websocket now
		wss.on('connection', function connection(ws) {
			ws.on('message', function incoming(message) {
				console.log('received ws msg:', message);
				try{
					var data = JSON.parse(message);
					part1.process_msg(ws, data);
					// part2.process_msg(ws, data);
				}
				catch(e){
					console.log('ws message error', e);
				}
			});
			
			ws.on('error', function(e){console.log('ws error', e);});
			ws.on('close', function(){console.log('ws closed');});
		});
		
		wss.broadcast = function broadcast(data) {											//send to all connections			
			wss.clients.forEach(function each(client) {
				try{
					data.v = '2';
					client.send(JSON.stringify(data));
				}
				catch(e){
					console.log('error broadcast ws', e);
				}
			});
		};
		
		// ========================================================
		// Monitor the height of the blockchain
		// ========================================================
		ibc.monitor_blockheight(function(chain_stats){										//there is a new block, lets refresh everything that has a state
			if(chain_stats && chain_stats.height){
				console.log('hey new block, lets refresh and broadcast to all');
				ibc.block_stats(chain_stats.height - 1, cb_blockstats);
				wss.broadcast({msg: 'reset'});
				chaincode.query.read(['_marbleindex'], cb_got_index);
				chaincode.query.read(['_opentrades'], cb_got_trades);
        ibc.chain_stats(cb_got_return);
			}
			
			//got the block's stats, lets send the statistics
			function cb_blockstats(e, stats){
				if(e != null) console.log('error:', e);
				else {
					if(chain_stats.height) stats.height = chain_stats.height - 1;
					wss.broadcast({msg: 'chainstats', e: e, chainstats: chain_stats, blockstats: stats});
				}
			}
			
			//got the marble index, lets get each marble
			function cb_got_index(e, index){
				if(e != null) console.log('error:', e);
				else{
					try{
						var json = JSON.parse(index);
						for(var i in json){
							console.log('!', i, json[i]);
							chaincode.query.read([json[i]], cb_got_marble);							//iter over each, read their values
						}
					}
					catch(e){
						console.log('marbles index msg error:', e);
					}
				}
			}
			
			//call back for getting a marble, lets send a message
			function cb_got_marble(e, marble){
				if(e != null) console.log('error:', e);
				else {
					try{
						wss.broadcast({msg: 'marbles', marble: JSON.parse(marble)});
					}
					catch(e){
						console.log('marble msg error', e);
					}
				}
			}
      function cb_got_return(e, stats){
        var bc = stats;
        chain_stats = stats;
        if(stats && stats.height){
          var list = [];
          for(var i = stats.height - 1; i >= payloads.length+1; i--){               //create a list of heights we need
            list.push(i);
          }
          list.reverse();                             //flip it so order is correct in UI
          console.log(list);
          
          async.eachLimit(list, 1, function(key, cb) {              //iter through each one, and send it
            ibc.block_stats(key, function(e, stats){
              if(e == null){
                stats.height = key;
                console.log("block number",key);
                console.log("payload");
                console.log(atob(stats.transactions[0].payload));
                payloads.push(stats.transactions[0].payload);
                // sendMsg({msg: 'chainstats', e: e, chainstats: chain_stats, blockstats: stats});
              }
              cb(null);
            });
            // callback(payloads);
          }, function () {
            checkUID();
          });
        }

      }
			
			//call back for getting open trades, lets send the trades
			function cb_got_trades(e, trades){
				if(e != null) console.log('error:', e);
				else {
					try{
						trades = JSON.parse(trades);
						if(trades && trades.open_trades){
							wss.broadcast({msg: 'open_trades', open_trades: trades.open_trades});
						}
					}
					catch(e){
						console.log('trade msg error', e);
					}
				}
			}
		});
	}
}


// Routes


function checkUID(id){
  for(var i=0;i<payloads.length;i++){
      var payload = atob(payloads[i]);
      if(payload.substr(payload.length-5)==id){
        return false;
      }
    }
    return true;
}


//change chaincode such that id is added last. Can simply get last 5 characters to check uid
function getHistory(id){
  var res = {"id":id,"history":[]};
  for(var i=0;i<payloads.length;i++)
  {
      var payload = atob(payloads[i]);
      if(payload.substr(payload.length-5)!=id)
        continue;
      var vals = payload.split(',');
      if(vals.length==4) //init_item function
        res.history.push(vals[2])
      else if(vals.length==3)
        res.history.push(vals[1]);

  }
  return res;
}
    // data.id must be 5 characters long!!!!!
app.post('/add',function(req, res){
    var data = req.body;
    console.log("creating new item..");
    // data.id must be 5 characters long!!!!!
    if(data.name && data.id && data.owner && checkUID(data.id)){
      chaincode.invoke.init_item([','+data.name, ','+data.owner, ','+data.id], cb_invoked);
    }
    else{
      console.log("invalid");
      res.json({'status':'invalid'});  
    }
    res.json({'status':200});
})

app.post('/transfer',function(req, res){
  var data = req.body;
  var newOwner = data.newOwner;
  var id = data.id;
  console.log('transferring ownership..');
  if(newOwner && id)
    chaincode.invoke.set_user([','+newOwner+',', id]);
  else
    res.json({'status':'invalid'}); 
  res.json({'status':200});
})

app.post('/getHistory',function(req, res){
  var id = req.body.id;
  // chaincode.query.read(['_itemindex'], cb_got_index);
  var history = getHistory(id);
  res.json(history);
})

function cb_invoked(e, a){
    console.log('response: ', e, a);
  }

  function cb_got_index(e, index){
    if(e != null) console.log('error:', e);
    else{
      try{
        var json = JSON.parse(index);
        var keys = Object.keys(json);
        var concurrency = 1;

        //serialized version
        async.eachLimit(keys, concurrency, function(key, cb) {
          console.log('!', json[key]);
          chaincode.query.read([json[key]], function(e, marble) {
            if(e != null) console.log('error:', e);
            else {
              console.log("JSON.parse(marble)");
              // sendMsg({msg: 'marbles', e: e, marble: JSON.parse(marble)});
              cb(null);
            }
          });
        }, function() {
          console.log("done");
          // sendMsg({msg: 'action', e: e, status: 'finished'});
        });
      }
      catch(e){
        console.log('error:', e);
      }
    }
  }