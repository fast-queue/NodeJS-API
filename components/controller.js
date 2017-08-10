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
			var body = JSON.parse(resp.body);
			if (err) {
				return cb(err);
			}
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
			var body = JSON.parse(resp.body);

			if (err) {
				return cb(err);
			}
			if (resp.status === 200) {
				return cb(null, body._id);
			} else if (resp.status === 400) {
				return cb('No queue with this id found');
			}
			return cb('Wrong status code: ' + resp.status + '/n body: ' + resp.body);

		})
	};

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
		addPlayer: addPlayerToQueue,
		createQueue: createQueue,
		initiate: configure,
		config: configuration
	}
}
exports['@singleton'] = true;
exports['@require'] = ['models/Config', 'rest/core'];
