exports = module.exports = function(request) {
	/**
	 * options {
	 * method,
	 * url,
	 * headers,
	 * }
	 */
	var basicRest = (options, cb) => {
		request(options, (err, response, body) => {
			if (err) {
				return cb(err);
			}
			cb({ status: response.status, body: body });
		});
	}

	return basicRest;
}
exports['@singleton'] = true;
exports['@require'] = ['request'];
