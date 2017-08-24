var IoC = require('electrolyte');

IoC.use(IoC.node_modules());
IoC.use(IoC.dir('components'));
IoC.use(IoC.dir('.'));

return IoC.create('app');