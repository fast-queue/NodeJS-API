exports = module.exports = function(Config) {
	var config = new Config();
	return {
		create: function() {
			var teste = new Config();

			teste.setKey('minhavidaeandarporestepais');
			console.log(teste.getUrl(), teste.getKey());
			return this;
		}
	}


};

exports['@singleton'] = true;
exports['@require'] = ['models/Config'];
