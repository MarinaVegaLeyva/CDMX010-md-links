const fs = require('fs');
const {path, options } = require('./cli/cli');
const { extractLinks, validateLink, resultValidaLinks, stats } = require('./helpers/logicLinks');

const pathArgv = path();
const optionsArgv = options();

const mdLinks = (path, options) =>{
    const data =  fs.readFileSync(path,'utf8');
    const links = extractLinks(data);
    const promises = links.map((link) => validateLink(link)); // esto produce un arreglo de promesas

    if(options.validate!==false){
        resultValidaLinks(promises);
    }
    if(options.stats!==false){
        stats(promises);
    }
  };

  mdLinks(pathArgv,optionsArgv); 
