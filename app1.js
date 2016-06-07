'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var setup = require('./setup');

//// Set Server Parameters ////
var host = setup.SERVER.HOST;
var port = setup.SERVER.PORT;

////////  Pathing and Module Setup  ////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); 


// ============================================================================================================================
//                            Launch Webserver
// ============================================================================================================================
var server = http.createServer(app).listen(port, function() {});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.NODE_ENV = 'production';
server.timeout = 240000;                                              // Ta-da.
console.log('------------------------------------------ Server Up - ' + host + ':' + port + ' ------------------------------------------');
if(process.env.PRODUCTION) console.log('Running using Production settings');
else console.log('Running using Developer settings');

// ============================================================================================================================
//                            Deployment Tracking
// ============================================================================================================================
console.log('- Tracking Deployment');
require('cf-deployment-tracker-client').track();    //reports back to us, this helps us judge interest! feel free to remove it

// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================
// ============================================================================================================================

// ============================================================================================================================
//                            Warning
// ============================================================================================================================

// ============================================================================================================================
//                            Entering
// ============================================================================================================================

// ============================================================================================================================
//                            Test Area
// ============================================================================================================================
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
        "discovery_host": "197dd1de-5fde-4616-88eb-e18e3898e0f0_vp1-discovery.blockchain.ibm.com",
        "discovery_port": 30303,
        "api_host": "197dd1de-5fde-4616-88eb-e18e3898e0f0_vp1-api.blockchain.ibm.com",
        "api_port_tls": 443,
        "api_port": 80,
        "type": "peer",
        "network_id": "197dd1de-5fde-4616-88eb-e18e3898e0f0",
        "container_id": "ff2443f23f337c0f4216958ce9e08870b21b60506d15c65caf434f9a5eb54e70",
        "id": "197dd1de-5fde-4616-88eb-e18e3898e0f0_vp1",
        "api_url": "http://197dd1de-5fde-4616-88eb-e18e3898e0f0_vp1-api.blockchain.ibm.com:80"
      },
      {
        "discovery_host": "197dd1de-5fde-4616-88eb-e18e3898e0f0_vp2-discovery.blockchain.ibm.com",
        "discovery_port": 30303,
        "api_host": "197dd1de-5fde-4616-88eb-e18e3898e0f0_vp2-api.blockchain.ibm.com",
        "api_port_tls": 443,
        "api_port": 80,
        "type": "peer",
        "network_id": "197dd1de-5fde-4616-88eb-e18e3898e0f0",
        "container_id": "a4cd8c9e8c122c3d3865b69b28b3b073a351a34ebe27e50799f0affccd49d67b",
        "id": "197dd1de-5fde-4616-88eb-e18e3898e0f0_vp2",
        "api_url": "http://197dd1de-5fde-4616-88eb-e18e3898e0f0_vp2-api.blockchain.ibm.com:80"
      }
    ],
    "ca": {
      "197dd1de-5fde-4616-88eb-e18e3898e0f0_ca": {
        "url": "197dd1de-5fde-4616-88eb-e18e3898e0f0_ca-api.blockchain.ibm.com:30303",
        "discovery_host": "197dd1de-5fde-4616-88eb-e18e3898e0f0_ca-discovery.blockchain.ibm.com",
        "discovery_port": 30303,
        "api_host": "197dd1de-5fde-4616-88eb-e18e3898e0f0_ca-api.blockchain.ibm.com",
        "api_port_tls": 30303,
        "api_port": 80,
        "type": "ca",
        "network_id": "197dd1de-5fde-4616-88eb-e18e3898e0f0",
        "container_id": "9be66d56694560717e00d10c08d22b76c897f3de0a6c17643610020400c85b53"
      }
    },
    "users": [
      {
        "username": "dashboarduser_type0_f682308c46",
        "secret": "3d13627148",
        "enrollId": "dashboarduser_type0_f682308c46",
        "enrollSecret": "3d13627148"
      },
      {
        "username": "dashboarduser_type0_95cc074092",
        "secret": "7f2f7b5c9c",
        "enrollId": "dashboarduser_type0_95cc074092",
        "enrollSecret": "7f2f7b5c9c"
      },
      {
        "username": "user_type1_76ce8032f3",
        "secret": "9471e051c1",
        "enrollId": "user_type1_76ce8032f3",
        "enrollSecret": "9471e051c1"
      },
      {
        "username": "user_type1_89796c544c",
        "secret": "baff876b46",
        "enrollId": "user_type1_89796c544c",
        "enrollSecret": "baff876b46"
      },
      {
        "username": "user_type1_be0bcead87",
        "secret": "059fcd37d0",
        "enrollId": "user_type1_be0bcead87",
        "enrollSecret": "059fcd37d0"
      },
      {
        "username": "user_type1_2235067772",
        "secret": "70a9de4adf",
        "enrollId": "user_type1_2235067772",
        "enrollSecret": "70a9de4adf"
      },
      {
        "username": "user_type1_ff08ff9cc9",
        "secret": "b64c7ca46f",
        "enrollId": "user_type1_ff08ff9cc9",
        "enrollSecret": "b64c7ca46f"
      },
      {
        "username": "user_type2_b6a02888ac",
        "secret": "41eae10ec1",
        "enrollId": "user_type2_b6a02888ac",
        "enrollSecret": "41eae10ec1"
      },
      {
        "username": "user_type2_b4d35891dc",
        "secret": "e4514002e6",
        "enrollId": "user_type2_b4d35891dc",
        "enrollSecret": "e4514002e6"
      },
      {
        "username": "user_type2_6d100ef051",
        "secret": "102abc6f60",
        "enrollId": "user_type2_6d100ef051",
        "enrollSecret": "102abc6f60"
      },
      {
        "username": "user_type2_d9676d688b",
        "secret": "59ec5d5d42",
        "enrollId": "user_type2_d9676d688b",
        "enrollSecret": "59ec5d5d42"
      },
      {
        "username": "user_type2_7658c9b0a7",
        "secret": "8c66a328ca",
        "enrollId": "user_type2_7658c9b0a7",
        "enrollSecret": "8c66a328ca"
      },
      {
        "username": "user_type4_ab98eafab6",
        "secret": "f0004dc11e",
        "enrollId": "user_type4_ab98eafab6",
        "enrollSecret": "f0004dc11e"
      },
      {
        "username": "user_type4_ef3f208c7b",
        "secret": "9b6dd5e4bd",
        "enrollId": "user_type4_ef3f208c7b",
        "enrollSecret": "9b6dd5e4bd"
      },
      {
        "username": "user_type4_1bef56777d",
        "secret": "7add76f164",
        "enrollId": "user_type4_1bef56777d",
        "enrollSecret": "7add76f164"
      },
      {
        "username": "user_type4_233d653f86",
        "secret": "0e46b72096",
        "enrollId": "user_type4_233d653f86",
        "enrollSecret": "0e46b72096"
      },
      {
        "username": "user_type4_63236ffeaa",
        "secret": "07fc7a4681",
        "enrollId": "user_type4_63236ffeaa",
        "enrollSecret": "07fc7a4681"
      },
      {
        "username": "user_type8_e9b1f3abf2",
        "secret": "feedaa493b",
        "enrollId": "user_type8_e9b1f3abf2",
        "enrollSecret": "feedaa493b"
      },
      {
        "username": "user_type8_402650db69",
        "secret": "f0b3790917",
        "enrollId": "user_type8_402650db69",
        "enrollSecret": "f0b3790917"
      },
      {
        "username": "user_type8_658159a390",
        "secret": "85335b2377",
        "enrollId": "user_type8_658159a390",
        "enrollSecret": "85335b2377"
      },
      {
        "username": "user_type8_fcb8c0ea7b",
        "secret": "88e2c518b6",
        "enrollId": "user_type8_fcb8c0ea7b",
        "enrollSecret": "88e2c518b6"
      },
      {
        "username": "user_type8_3f7e0b3325",
        "secret": "dfd3a37def",
        "enrollId": "user_type8_3f7e0b3325",
        "enrollSecret": "dfd3a37def"
      }
    ]
  }
};
var peers = manual.credentials.peers;
console.log('loading hardcoded peers');
var users = null;                                   //users are only found if security is on
if(manual.credentials.users) users = manual.credentials.users;
console.log('loading hardcoded users');

if(process.env.VCAP_SERVICES){                              //load from vcap, search for service, 1 of the 3 should be found...
  var servicesObject = JSON.parse(process.env.VCAP_SERVICES);
  for(var i in servicesObject){
    if(i.indexOf('ibm-blockchain') >= 0){                     //looks close enough
      if(servicesObject[i][0].credentials.error){
        console.log('!\n!\n! Error from Bluemix: \n', servicesObject[i][0].credentials.error, '!\n!\n');
        peers = null;
        users = null;
        process.error = {type: 'network', msg: 'Due to overwhelming demand the IBM Blockchain Network service is at maximum capacity.  Please try recreating this service at a later date.'};
      }
      if(servicesObject[i][0].credentials && servicesObject[i][0].credentials.peers){
        console.log('overwritting peers, loading from a vcap service: ', i);
        peers = servicesObject[i][0].credentials.peers;
        if(servicesObject[i][0].credentials.users){
          console.log('overwritting users, loading from a vcap service: ', i);
          users = servicesObject[i][0].credentials.users;
        } 
        else users = null;                            //no security
        break;
      }
    }
  }
}

// ==================================
// configure ibm-blockchain-js sdk
// ==================================
var options =   {
          network:{
            peers: peers,
            users: users,
            options: {quiet: true, tls:false, maxRetry: 1}
          },
          chaincode:{
            zip_url: 'https://github.com/pawanjay176/marbles-chaincode/archive/master.zip',
            unzip_dir: 'marbles-chaincode-master/ebay',               //subdirectroy name of chaincode after unzipped
            git_url: 'https://github.com/pawanjay176/marbles-chaincode/ebay',   //GO get http url
          
            //hashed cc name from prev deployment
            //deployed_name: '14b711be6f0d00b190ea26ca48c22234d93996b6e625a4b108a7bbbde064edf0179527f30df238d61b66246fe1908005caa5204dd73488269c8999276719ca8b'
          }
        };
if(process.env.VCAP_SERVICES){
  console.log('\n[!] looks like you are in bluemix, I am going to clear out the deploy_name so that it deploys new cc.\n[!] hope that is ok budddy\n');
  options.chaincode.deployed_name = '';
}
ibc.load(options, cb_ready);                                //parse/load chaincode

var chaincode = null;
function cb_ready(err, cc){                                 //response has chaincode functions
  if(err != null){
    console.log('! looks like an error loading the chaincode or network, app will fail\n', err);
    if(!process.error) process.error = {type: 'load', msg: err.details};        //if it already exist, keep the last error
  }
  else{
    chaincode = cc;
    part1.setup(ibc, cc);
    // part2.setup(ibc, cc);
    if(!cc.details.deployed_name || cc.details.deployed_name === ''){         //decide if i need to deploy
      cc.deploy('init', ['99'], {save_path: './cc_summaries', delay_ms: 50000}, cb_deployed);
    }
    else{
      console.log('chaincode summary file indicates chaincode has been previously deployed');
      cb_deployed();
    }
  }
}

// ============================================================================================================================
//                        WebSocket Communication Madness
// ============================================================================================================================
function cb_deployed(e, d){
  if(e != null){
    //look at tutorial_part1.md in the trouble shooting section for help
    console.log('! looks like a deploy error, holding off on the starting the socket\n', e);
    if(!process.error) process.error = {type: 'deploy', msg: e.details};
  }
  else{
    console.log('------------------------------------------ Websocket Up ------------------------------------------');
    
    wss = new ws.Server({server: server});                        //start the websocket now
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
    
    wss.broadcast = function broadcast(data) {                      //send to all connections     
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
    ibc.monitor_blockheight(function(chain_stats){                    //there is a new block, lets refresh everything that has a state
      if(chain_stats && chain_stats.height){
        console.log('hey new block, lets refresh and broadcast to all');
        ibc.block_stats(chain_stats.height - 1, cb_blockstats);
        wss.broadcast({msg: 'reset'});
        chaincode.query.read(['_itemindex'], cb_got_index);
        // chaincode.query.read(['_opentrades'], cb_got_trades);
      }
      
      //got the block's stats, lets send the statistics
      function cb_blockstats(e, stats){
        if(e != null) console.log('error:', e);
        else {
          if(chain_stats.height) stats.height = chain_stats.height - 1;
          // wss.broadcast({msg: 'chainstats', e: e, chainstats: chain_stats, blockstats: stats});
        }
      }
      
      //got the marble index, lets get each marble
      function cb_got_index(e, index){
        if(e != null) console.log('error:', e);
        else{
          try{
            var json = JSON.parse(index);
            console.log(index);
            console.log(json);
            for(var i in json){
              console.log('!', i, json[i]);
              chaincode.query.read([json[i]], cb_got_marble);             //iter over each, read their values
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
            console.log("printing marble");
            console.log(JSON.parse(marble));
            // wss.broadcast({msg: 'marbles', marble: JSON.parse(marble)});
          }
          catch(e){
            console.log('marble msg error', e);
          }
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

app.post('/manufacture',function(req, res){
    var data = req.body;
    chaincode.query.read(['_itemindex'], cb_got_index);
    console.log("creating new item..");
    if(data.name && data.id && data.company && data.price && data.warranty && data.category){
      chaincode.invoke.init_item([data.id, data.name, data.company, data.price, data.warranty, data.category], cb_invoked);
    }
    else{
      console.log("invalid");
      res.json({'status':'invalid'});  
    }
    res.json({'status':200});
})

app.post('/first_sale',function(req, res){
    var data = req.body;
    chaincode.query.read(['_itemindex'], cb_got_index);
    console.log("making first sale..");
    if(data.id && data.owner && data.bill_num && data.seller){
      chaincode.invoke.first_sale([data.id, data.owner, data.bill_num, data.seller], cb_invoked);
    }
    else{
      console.log("invalid");
      res.json({'status':'invalid'});  
    }
    res.json({'status':200});
})



app.post('/resale', function(req, res){
  var data = req.body;
  chaincode.query.read(['_itemindex'], cb_got_index);
  console.log("resale")
  if(data.id && data.newOwner && data.newPrice){
        chaincode.invoke.resale_item([data.id, data.newOwner, data.newPrice]);
      }
  else{
      console.log("invalid");
      res.json({'status':'invalid'});  
    }
  res.json({'status':200});

})

app.post('/repair', function(req, res){
  var data = req.body;
  chaincode.query.read(['_itemindex'], cb_got_index);
  console.log("resale")
  if(data.id && data.problem && data.fixes){
        chaincode.invoke.repair_item([data.id, data.problem, data.fixes]);
      }
  else{
      console.log("invalid");
      res.json({'status':'invalid'});  
    }
  res.json({'status':200});

})

app.post('/getItem',function(req, res){
  var id = req.body.id;
  console.log(req.body);
  chaincode.query.read([id], function(e, item){
    if(e != null) console.log('error:', e);
    else{
      try{
        var json_data = JSON.parse(item);
        res.json(json_data)
      }
      catch(e){
        console.log('error',e);
      }
    }
  });
})


//got the marble index, lets get each marble
  function cb_got_index(e, index){
    if(e != null) console.log('error:', e);
    else{
      try{
        var json = JSON.parse(index);
        for(var i in json){
          console.log('!', i, json[i]);
          chaincode.query.read([json[i]], cb_got_marble);                       //iter over each, read their values
        }
      }
      catch(e){
        console.log('error:', e);
      }
    }
  }
  
  //call back for getting a marble, lets send a message
  function cb_got_marble(e, marble){
    console.log("Call to cb_got_marble");
    if(e != null) console.log('error:', e);
    else {
      try{
        console.log(JSON.parse(marble));
        // sendMsg({msg: 'marbles', marble: JSON.parse(marble)});
      }
      catch(e){}
    }
  }
  
  function cb_invoked(e, a){
    console.log('response: ', e, a);
  }