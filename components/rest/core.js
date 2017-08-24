/**
 * Core module with the basic REST functions
 * @module
 */


exports = module.exports = function(request) {
	/**
	 * Process a request given an options object
	 * @param {Object} options Options object for the request. (See generateOptions)
	 * @param {Function} cb callback to be called when processed the request.
	 */
	function basicRest(options, cb) {
		request(options, (err, response, body) => {
			if (err) {
				return cb(err);
			}
			cb(null, { status: response.statusCode, body: body });
		});
	};

	/**
	 * Generates the options to REQUEST
	 * Return Object
	 * {	url: String,
	 * 		method: String,
	 * 		headers: Object,
	 * 		obj: Object
	 * }
	 *
	 * Headers Object
	 * {	'User-Agent': 'request',
	 * 		'Content-Type': 'text/html'
	 * }
	 * @param {String} url the url to be called
	 * @param {String} method method: PUT, POST, DELETE, GET
	 * @param {Object} headers Headers to HTTP Request
	 * @param {Object} obj The body obj, if there is
	 * @return {Objcet} Options object returned
	 *
	 */
	function generateOptions(url, method, headers, obj) {
		if (!url) { return new Error('No url found') }
		if (!method) { return new Error('No method found') }
		var ret = { url: url, method: method };
		if (headers) { ret.headers = headers }
		if (obj) { ret.body = obj }

		return ret;
	};

	return {
		request: basicRest,
		createOptions: generateOptions
	};
}
exports['@singleton'] = true;
exports['@require'] = ['request'];
