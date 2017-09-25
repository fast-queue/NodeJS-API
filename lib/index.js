/**
 * Basic controller
 * @module
 */
var core = require('./rest/core')
var Config = require('./models/Config')
var configuration = new Config();

/**
 * Create a queue on a configurated server (See configure to see how to configure.)
 * @param {Object} obj Queue name
 * @param {Function} cb Callback function to execute something after request
 */
var addQueue = (obj, cb) => {
	var options = {
		method: 'POST',
		url: configuration.getUrl(),
		headers: {
			'API-KEY': configuration.getKey(),
			'Content-Type': 'Application/JSON'
		}
	}
	if (obj) { options.body = JSON.stringify(obj) }

	core.request(options, (err, resp) => {
		if (err) {
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body._id);
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	})
}

/**
 * Update a queue information.
 * It does maintain the players and keys in the queue, only update the info.
 * If the sender object does not contain a previous attribute, the object won't contain it anymore.
 * @param {String} queueId Queue _id
 * @param {Object} obj Queue Object
 * @param {Function} cb Callback function
 */
var updateQueue = (queueId, obj, cb) => {
	var options = {
		method: 'PUT',
		url: configuration.getUrl() + '/' + queueId,
		headers: {
			'API-KEY': configuration.getKey(),
			'Content-Type': 'Application/JSON'
		},
		body: JSON.stringify(obj)
	}
	core.request(options, (err, resp) => {
		if(err){
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body._id);
		} else if (resp.status === 500) {
			return cb('No queue with this id found');
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	})

}

/**
 * Add a player to a queue given an queue _ID
 * @param {String} id the _id property of the queue
 * @param {Object} player The player object containing all informations
 * @param {Function} cb Callback function that recieves the results of request.
 */
var addPlayerToQueue = (id, player, cb) => {
	var options = {
		method: 'POST',
		url: configuration.getUrl() + '/' + id + '/players',
		headers: {
			'API-KEY': configuration.getKey(),
			'Content-Type': 'Application/JSON'
		}
	}
	if (player) { options.body = JSON.stringify(player) }

	core.request(options, (err, resp) => {
		if (err) {
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body._id);
		} else if (resp.status === 400) {
			return cb('No queue with this id found');
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);

	})
};

/**
 * Update a plyer on a queue
 * Maintain the same _id. 
 * If the sender object does not contain a previous attribute, the object won't contain it anymore.
 * @param {String} queueId Queue _id
 * @param {String} playerId Player _id
 * @param {Object} obj player object
 * @param {Function} cb Callback function
 */
var updatePlayer = (queueId, playerId, obj, cb) => {
	var options = {
		method: 'PUT',
		url: configuration.getUrl() + '/' + queueId + '/players/' + playerId,
		headers: {
			'API-KEY': configuration.getKey(),
			'Content-Type': 'Application/JSON'
		},
		body: JSON.stringify(obj)
	}
	core.request(options, (err, resp) => {
		if(err){
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body._id);
		} else if (resp.status === 500) {
			return cb('No queue with this id found');
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	})

}

/**
 * Remove a queue from the server
 * @param {String} id the _id of the queue
 * @param {Function} cb Callback function to process the result
 */
var removeQueue = (id, cb) => {
	var options = {
		method: 'DELETE',
		url: configuration.getUrl() + '/' + id,
		headers: {
			'API-KEY': configuration.getKey()
		}
	}
	core.request(options, (err, resp) => {
		var body = resp.body;
		if (err) {
			return cb(err);
		}
		if (resp.status === 200) {
			return cb(null, body._id);
		} else if (resp.status === 400) {
			return cb('Queue not found, not deleted');
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	})
}

/**
 * Remove a player from queue;
 * @function
 * @param {String} qId Queue _ID
 * @param {String} pId Player _ID
 * @param {Function} cb Callback Function
 */
var removePlayerFromQueue = (qId, pId, cb) => {
	var options = {
		method: 'DELETE',
		url: configuration.getUrl() + '/' + qId + '/players/' + pId,
		headers: {
			'API-KEY': configuration.getKey()
		}
	}
	core.request(options, (err, resp) => {
		var body = resp.body;
		if (err) {
			return cb(err);
		}
		if (resp.status === 200) {
			return cb(null, body._id);
		} else if (resp.status === 400) {
			return cb(res.message);
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	})
}

/**
 * Get all Queues on server. (Queues that the API-KEY has access)
 * @param {Function} cb Callback function to process result
 */
var getAllQueues = (cb) => {
	var options = {
		method: 'GET',
		url: configuration.getUrl(),
		headers: {
			'API-KEY': configuration.getKey()
		}
	}
	core.request(options, (err, resp) => {
		if (err) {
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body);
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	});
}

/**
 * Get all queue's information, but do not include players on that queue. (See getPlayersOnQueue)
 * @param {Object} obj Data object. See object below
 * @param {Function} cb CallbackFunction
 * 
 * obj = {
 * 	id: String -- The queue ID -- Needed
 * 	plugin?: http address from plugin to be executed.
 * }
 */
var getQueue = (obj, cb) => {
	if (!obj.id) { return new Error('No queue id found on obj.') }
	var URI = configuration.getUrl() + '/' + obj.id;
	obj.plugin ? URI += '?callback=' + obj.plugin : console.log('[Info?] No plugin entered');
	var options = {
		method: 'GET',
		url: URI,
		headers: {
			'API-KEY': configuration.getKey()
		}
	}
	core.request(options, (err, resp) => {
		if (err) {
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body);
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	});
}

/**
 * Get all player's information on a queue.
 * @param {Object} obj Data object. See object below
 * @param {Function} cb CallbackFunction
 * 
 * obj = {
 * 	id: String -- The queue ID -- Needed
 * 	plugin?: http address from plugin to be executed.
 * }
 */
var getPlayersOnQueue = (obj, cb) => {
	if (!obj.id) { return new Error('No queue id found on obj.') }
	var URI = configuration.getUrl() + '/' + obj.id + '/players';
	obj.plugin ? URI += '?callback=' + obj.plugin : console.log('[Info?] No plugin entered');
	var options = {
		method: 'GET',
		url: URI,
		headers: {
			'API-KEY': configuration.getKey()
		}
	}
	core.request(options, (err, resp) => {
		if (err) {
			return cb(err);
		}
		var body = resp.body;
		if (resp.status === 200) {
			return cb(null, body);
		}
		return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
	});
}

/**
 * Initial configuration to access server
 * Something like a constructor
 * @param {String} url url that the service will access (Server)
 * @param {String} key API-KEY used on process.
 */
var configure = (url, key) => {
	if (!url) { new Error('No url found'); return false; }
	configuration.setUrl(url);
	if (key) { configuration.setKey(key) }
	return true;
}
module.exports = {
	addPlayer: addPlayerToQueue,
	addPlayerToQueue: addPlayerToQueue,
	addQueue: addQueue,
	config: configure,
	configure: configure,
	getQueue: getQueue,
	getAllQueues: getAllQueues,
	getPlayers: getPlayersOnQueue,
	getPlayersOnQueue: getPlayersOnQueue,
	initiate: configure,
	removeQueue: removeQueue,
	removePlayer: removePlayerFromQueue,
	removePlayerFromQueue: removePlayerFromQueue,
	updatePlayer: updatePlayer,
	updateQueue: updateQueue
}

