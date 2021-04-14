const fs = require('fs');
const {pathArgv } = require('./cli/cli');
const { validatePath } = require('./helpers/logicLinks');

const pathCli = pathArgv();

validatePath(pathCli);

