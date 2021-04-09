const fetch = require("node-fetch");
var colors = require("colors");

const extractLinks = (data) => {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);
  const links = data.match(regex);
  for (let x = 0; x < links.length; x++) {
    links[x] = links[x].replace(/[(),"]+/g, "");
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
};
