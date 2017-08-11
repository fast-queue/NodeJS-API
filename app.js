exports = module.exports = function(service) {

	return {
		create: function() {
			service.initiate('http://tcc-andre.ddns.net/queue', 'minhavidaeandarporestepais');
			service.createQueue('teste', (err, id) => {
				service.addPlayer(id, { name: 'andre', city: 'srs' }, (err, idP) => {
					if (err) { console.log(err) }
					service.removePlayer(id, idP, (err, resp) => {
						if (err) { return console.log(err) }
						console.log(resp);
					})
				});
				service.removeQueue(id, (err, resp) => {
					console.log(resp);
				});
			});
		},
		getAll: function() {
			service.getAllQueues((err, resp) => {
				if (err) {
					return console.log(err);
				}
				console.log(resp);
			})
		}
	}
};

exports['@singleton'] = true;
exports['@require'] = ['controller'];
