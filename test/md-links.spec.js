const { validateLink, resultValidaLinks, validateDirectory } = require('../helpers/logicLinks.js');

const result = {
  href: 'https://es.wikipedia.org/wiki/Markdown',
  status: 'OK'
}

const promises =  [
  { 
    href: 'https://es.wikipedia.org/wiki/Markdown',
    status: 'OK'
   }
];


const logValidaLinks = 'https://es.wikipedia.org/wiki/Markdown   OK';

describe('validateLink', () =>{
  it('validateLink deberia ser una funcion', () =>{
    expect(typeof validateLink).toBe('function');
  });
  it('Deberia retornar un objeto que contiene la url y el status de esta', (done)=>{
    validateLink('https://es.wikipedia.org/wiki/Markdown')
    .then(expected =>{
      expect(result).toEqual(expected);
      done();
    })
  });
});

describe('resultValidaLinks',()=>{
  it('resultValidaLinks deberia ser una funcion',() => {
    expect(typeof resultValidaLinks).toBe('function');
  });

/*   it('Deberia mostrar los link con su status',(done) => {
    console.log(promises);
    resultValidaLinks(promises)
    .then(() =>{
      expect(logValidaLinks).toEqual(logValidaLinks);
      done();
    })
  }); */
});

describe('validateDirectory',() => {
  it('resultValidaLinks deberia ser una funcion',() =>{
    expect(typeof validateDirectory).toBe('function');
  });

  it('deberia devolver un boolean',() =>{
    expect(validateDirectory('README.md')).toBe(false);
  });

})