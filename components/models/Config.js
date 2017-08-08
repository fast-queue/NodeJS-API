exports = module.exports = function() {
	/**
	 * Config Class
	 * @key API-KEY authentication
	 * @url url from server
	 * @return Config { Config } Class
	 */

	// Objects
	var key = '';
	var url = 'http://tcc-andre.ddns.net/queue/';

	function Config() {
		return this;
	}
	/**
	 * Set the api-key value for http-rest
	 * @Param key the key
	 */
	Config.prototype.setKey = function(pKey) {
		if (typeof pKey === 'string') {
			key = pKey;
			return this;
		}
		throw new Error('Not a String');
	}

	Config.prototype.setUrl = function(pUrl) {
		if (typeof pUrl === 'string') {
			url = pUrl;
			return this;
		}
		throw new Error('Not a String');
	}

	Config.prototype.getKey = function() {
		return key;
	}

	Config.prototype.getUrl = function() {
		return url;
	}

	return Config;
}
exports['@singleton'] = false;
exports['@require'] = [];
