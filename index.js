let IoC = require('electrolyte');

IoC.use(IoC.node_modules());
IoC.use(IoC.dir('components'));
IoC.use(IoC.dir('.'));

let app = IoC.create('app');

module.exports = app;

