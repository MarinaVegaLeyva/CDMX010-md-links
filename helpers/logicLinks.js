const fetch = require("node-fetch");
var colors = require("colors");
const fs = require('fs');
const path = require('path');
const { options } = require('../cli/cli');

const optionsArgv = options();

const mdLinks = (route, options) =>{
  const data =  fs.readFileSync(route,'utf8');
  const links = extractLinks(data);
  let promises = null;
  if(links!==null){
    promises = links.map((link) => validateLink(link)); // esto produce un arreglo de promesas
  }
  
  if(options.validate!==false && promises!==null ){
      resultValidaLinks(promises);
  }
  if(options.stats!==false && promises!==null ){
      stats(promises);
  }
};

const validatePath = (route) => {
  if(validateDirectory(route)){
    readDirectory(route)
  }else{
    const extNamePath = path.extname(route);
    if(extNamePath ==='.md'){
        mdLinks(route,optionsArgv)        
    }
  }
}

const validateDirectory = (route) => {
  const directory = fs.lstatSync(route).isDirectory();
  return directory;
}

const readDirectory = (directory) => {
  fs.readdir(directory, (err,files) =>{
    if(err) {
      return console.log("error al procesar el archivo");
    }else{
      files.forEach((doc) => {
        const newPath = path.normalize(directory + '/' + doc);
        validatePath(newPath);
      });
    }
  });
}

const extractLinks = (data) => {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);
  const links = data.match(regex);
  if(links!=null){
    for (let x = 0; x < links.length; x++) {
      links[x] = links[x].replace(/[(),"]+/g, "");
    }
  }
  return links;
};

const validateLink = (url) =>
  fetch(url)
    .then((response) => {
      return { href: url, status: response.ok ? "OK" : "FAIL" };
    })
    .catch(() => {
      //console.log('Este link esta roto: ', err );
      return { href: url, status: "FAIL" };
    });

const resultValidaLinks = (promises) => {
  // eslint-disable-next-line no-undef
  Promise.all(promises) // el promise.all recibe como argumento un arreglo de promesas
    //.then(result => console.log(result)); // el resultado de cada promesas [{ state: 'OK'}, { state: 'OK'}, { state: 'OK'}, ...]
    .then((result) => {
      //console.log(promises);
      result.map((res) => {
        if (res.status === "OK") {
          console.log(
            `${colors.blue(res.href)} ${" "} ${colors.green(res.status)}`
          );
        } else {
          console.log(
            `${colors.blue(res.href)} ${" "} ${colors.red(res.status)}`
          );
        }
      });
    });
};

const stats = (promises) => {
  // eslint-disable-next-line no-undef
  Promise.all(promises)
  .then((result) => {
    const totalLinks = result.length;
    let counterOk = 0;
    let counterFail = 0;
    result.map((res) => {
      if (res.status === "OK") {
        counterOk++;
      } else {
        counterFail++;
      }
    });
    console.log(`${colors.bold('------------------------------------------ STATS ------------------------------------------')}`);
    console.log(`${colors.yellow('Total: ')}${colors.magenta(totalLinks)}`);
    console.log(`${colors.yellow('OK: ')}${colors.magenta(counterOk)}`);
    console.log(`${colors.yellow('FAIL: ')}${colors.magenta(counterFail)}`);
  });
};



module.exports = {
  extractLinks,
  validateLink,
  resultValidaLinks,
  stats,
  readDirectory,
  validateDirectory,
  validatePath
};
