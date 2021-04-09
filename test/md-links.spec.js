const { validateLink } = require('../helpers/logicLinks.js');
//const {saludo}= require( '../helpers/saludo.js')

//const print = (message) =>`Estoy recibiendo ${message}`;

/* describe('mdLinks', () => {

  it('should...', () => {
    expect(saludo('Marina')).toBe('Hola Marina');
  });

}); */

const result = {
  href: 'https://es.wikipedia.org/wiki/Markdown',
  status: 'OK'
}

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
