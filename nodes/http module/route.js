const http=require('http');

const server=http.createServer((req,res)=>{  
if (req.url === '/') {
    console.log(req.url)
res.writeHead(200,{'Content-Type':'text/plain'});
res.end('Hello World from nodejs home page \n');
}
else if (req.url === '/about') {
    console.log(req.url)
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('This is the about page \n'); }


})


server.listen(3000,()=>{
  console.log('Server is running on port 3000');
});