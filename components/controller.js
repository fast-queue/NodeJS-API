/**
 * Basic controller
 * @module
 */
exports = module.exports = function(Config, core) {
	var configuration = new Config();

	/**
	 * Create a queue on a configurated server (See configure to see how to configure.)
	 * @param {String} name Queue name
	 * @param {Function} cb Callback function to execute something after request
	 */
	var createQueue = (name, cb) => {
		var options = {
			method: 'POST',
			url: configuration.getUrl(),
			headers: {
				'API-KEY': configuration.getKey(),
				'Content-Type': 'Application/JSON'
			}
		}
		if (name) { options.body = JSON.stringify({ name: name }) }

		core.request(options, (err, resp) => {
			if (err) {
				return cb(err);
			}
			var body = JSON.parse(resp.body);
			if (resp.status === 200) {
				return cb(null, body._id);
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
			var body = JSON.parse(resp.body);
			if (resp.status === 200) {
				return cb(null, body._id);
			} else if (resp.status === 400) {
				return cb('No queue with this id found');
			}
			return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);

		})
	};

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
			var body = JSON.parse(resp.body);
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
			var body = JSON.parse(resp.body);
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
			var body = JSON.parse(resp.body);
			if (resp.status === 200) {
				return cb(null, body);
			}
			return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
		});
	}

	/**
	 * Get all queue's information, but do not include players on that queue. (See getPlayersOnQueue)
	 * @param {String} id Queue id
	 * @param {Function} cb CallbackFunction
	 */
	var getQueue = (id, cb) => {
		var options = {
			method: 'GET',
			url: configuration.getUrl() + '/' + id,
			headers: {
				'API-KEY': configuration.getKey()
			}
		}
		core.request(options, (err, resp) => {
			if (err) {
				return cb(err);
			}
			var body = JSON.parse(resp.body);
			if (resp.status === 200) {
				return cb(null, body);
			}
			return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);
		});
	}

	/**
	 * Get all players that are included on the queue
	 * @param {String} id Queue id
	 * @param {Function} cb Callback function
	 */
	var getPlayersOnQueue = (id, cb) => {
		var options = {
			method: 'GET',
			url: configuration.getUrl() + '/' + id + '/players',
			headers: {
				'API-KEY': configuration.getKey()
			}
		}
		core.request(options, (err, resp) => {
			if (err) {
				return cb(err);
			}
			var body = JSON.parse(resp.body);
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
	return {
		getQueue: getQueue,
		getPlayers: getPlayersOnQueue,
		getAllQueues: getAllQueues,
		addPlayer: addPlayerToQueue,
		createQueue: createQueue,
		removePlayer: removePlayerFromQueue,
		removeQueue: removeQueue,
		initiate: configure,
		config: configuration
	}
}
exports['@singleton'] = true;
exports['@require'] = ['models/Config', 'rest/core'];
