var myApp = angular.module('ebayApp', []);


myApp.controller('MainCtrl',['$scope','$http','$location', function($scope,$http, $location){
	console.log('hello');
	connect_to_server();
	console.log("done");
	$scope.create = function(){
		console.log("creating item..");
		var obj = 	{
						type: 'create',
						name: $scope.name,
						id: $scope.id,
						owner: $scope.owner,
						v: 1
					};
		if(obj.name && obj.id && obj.owner){
			console.log("creating item, sending",obj);
			ws.send(JSON.stringify(obj));
		}
	};

	$scope.check = function(){
		console.log("getting item..");
		ws.send(JSON.stringify({type: 'get', v: 1}));						//need to wait a bit

	};

	$scope.transfer = function(){
		var marbleName = '123';
		var user = "deepti";
		console.log("printing")
		if(marbleName){
			console.log('transfering', marbleName);
			var obj = 	{
							type: 'return_stuff',
							name: marbleName,
							user: user,
							v: 1
						};
			ws.send(JSON.stringify(obj));
	}
}
	



	// =================================================================================
// Socket Stuff
// =================================================================================
function connect_to_server(){
	var connected = false;
	connect();
	
	function connect(){
		var wsUri = 'ws://' + document.location.hostname + ':' + document.location.port;
		console.log('Connectiong to websocket', wsUri);
		
		ws = new WebSocket(wsUri);
		ws.onopen = function(evt) { onOpen(evt); };
		ws.onclose = function(evt) { onClose(evt); };
		ws.onmessage = function(evt) { onMessage(evt); };
		ws.onerror = function(evt) { onError(evt); };
	}
	
	function onOpen(evt){
		console.log('WS CONNECTED');
		connected = true;
		// clear_blocks();
		$('#errorNotificationPanel').fadeOut();
		ws.send(JSON.stringify({type: 'get', v:1}));
		ws.send(JSON.stringify({type: 'chainstats', v:1}));
	}

	function onClose(evt){
		console.log('WS DISCONNECTED', evt);
		connected = false;
		setTimeout(function(){ connect(); }, 5000);					//try again one more time, server restarts are quick
	}

	function onMessage(msg){
		try{
			var data = JSON.parse(msg.data);
			if(data.v != '2'){
				console.log('rec', data.msg, data);
				if(data.marble){
					build_ball(data.marble);
				}
				else if(data.msg === 'chainstats'){
					var e = formatDate(data.blockstats.transactions[0].timestamp.seconds * 1000, '%M/%d/%Y &nbsp;%I:%m%P');
					$('#blockdate').html('<span style="color:#fff">TIME</span>&nbsp;&nbsp;' + e + ' UTC');
					var temp = { 
									id: data.blockstats.height, 
									blockstats: data.blockstats
								};
					new_block(temp);								//send to blockchain.js
				}
				else if(data.msg=='payload'){
					console.log("received payload msg")
					var dataArray = data.payload;
					for(var i=0;i<dataArray.length;i++){
						console.log(i);
						console.log(atob(data.payload[i]));
					}
				}
			}
		}
		catch(e){
			console.log('ERROR', e);
		}
	}

	function onError(evt){
		console.log('ERROR ', evt);
		if(!connected && bag.e == null){											//don't overwrite an error message
			$('#errorName').html('Warning');
			$('#errorNoticeText').html('Waiting on the node server to open up so we can talk to the blockchain. ');
			$('#errorNoticeText').append('This app is likely still starting up. ');
			$('#errorNoticeText').append('Check the server logs if this message does not go away in 1 minute. ');
			$('#errorNotificationPanel').fadeIn();
		}
	}

	
}
}])
