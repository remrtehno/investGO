const path = require('path');
let ejs = require('ejs');
let fs = require('fs');


function compileEjs(dirname) {
  fs.readdir(dirname, function (error, fileNames) {
    if (error) {
      console.log(error);
      return;
    }

    console.log('compiled ejs')

    fileNames.forEach((file) => {
      if (file.search(/.html$/) !== -1) {
        let str = fs.readFileSync(`${dirname}/${file}`, 'utf8');
        let html = ejs.render(str);
        fs.writeFileSync(`${dirname}/${file}`, html);
      }
    });
  });
}

module.exports = [compileEjs];


//prod
if(process.argv[2] === '--prod') {
  compileEjs(path.resolve(process.cwd(), 'build/public/landing/'));
}