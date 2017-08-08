var IoC = require('electrolyte');

IoC.use(IoC.node_modules());
IoC.use(IoC.dir('components'));
IoC.use(IoC.dir('.'));

var app = IoC.create('app');
app.create();
