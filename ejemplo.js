const { cli }=require('./cli/cli');
const { saludo, queonda }=require('./helpers/saludo');

const getName = cli();

console.log(saludo(getName));
console.log(queonda(getName));