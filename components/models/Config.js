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

	/**
	 * Config Class
 	 * @class
 	 */
	function Config() {
		return this;
	}
	/**
	 * Set the api-key value for http-rest
	 * @param {String} key The API-KEY used for authentication
	 */
	Config.prototype.setKey = function(pKey) {
		if (typeof pKey === 'string') {
			key = pKey;
			return this;
		}
		throw new Error('Not a String');
	}

	/**
	 * Set the access url
	 * @param {String} pUrl The url for the service access
	 */
	Config.prototype.setUrl = function(pUrl) {
		if (typeof pUrl === 'string') {
			url = pUrl;
			return this;
		}
		throw new Error('Not a String');
	}

	/**
	 * Get API-KEY that are in use
	 * @return the API-KEY
	 */
	Config.prototype.getKey = function() {
		return key;
	}

	/**
	 * Get url that are in use
	 * @return the URL
	 */
	Config.prototype.getUrl = function() {
		return url;
	}

	return Config;
}
exports['@singleton'] = false;
exports['@require'] = [];
