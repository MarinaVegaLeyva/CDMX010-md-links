const process = require("process");

const path = () => process.argv[2];

const options = () => {
    const optionsMD = { 
        validate:false, 
        stats:false, 
    };

    for(let x=0; x<process.argv.length; x++){
        if(process.argv[x]=== '--validate'){
            optionsMD.validate='--validate';
        }
        if(process.argv[x]=== '--stats'){
            optionsMD.stats='--stats';
        }
    }
    //console.log(optionsMD);
    return optionsMD;
};

module.exports = {
    path,
    options
};
