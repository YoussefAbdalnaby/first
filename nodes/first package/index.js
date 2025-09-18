const path =require('path');
const fs=require('fs');


const pathloader=path.join(__dirname,'data');
if(!fs.existsSync(pathloader)){
  fs.mkdirSync(pathloader);
}

const filepath=path.join(pathloader,'apple.txt');
fs.writeFileSync(filepath,'This is a simple text file');
fs.appendFileSync(filepath,'\nThis is an appended text');


const readed=fs.readFileSync(filepath,'utf-8');
console.log(readed);

