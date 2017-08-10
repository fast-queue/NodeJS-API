exports = module.exports = function(service) {

	return {
		create: function() {
			service.initiate('http://tcc-andre.ddns.net/queue', 'minhavidaeandarporestepais');
			service.createQueue('teste', (err, id) => {
				})
			service.addPlayer('123456123', { name: 'andre', city: 'srs' }, (err, id) => {
				console.log(err, id);
			});
		}
	}

};

exports['@singleton'] = true;
exports['@require'] = ['controller'];
