CSCI3100 Project  
THE WebGL and WebSocket 3D Web Game
===============================  
Final Code Phase   
Start from https://bitbucket.org/ntf/csci3100-group6/commits/6135a2c82d521af8bc4295e0838d628733745ff4   
Inital Code Phase  
Start from https://bitbucket.org/ntf/csci3100-group6/commits/525d581987ca52d718fef121c769a9a7bf87bc81  

===============================  
Update Node.js Dependences :  
npm install  

Run Server :  
node app -dev  

Run Game Server :  
cd game/server  
node server  

Build Client Javascript :    
node build   
Build Client Javascript (DEV):  
node build -dev  

SQL File : php/totheskies.sql   
PHP Config File : php/config.php   
===============================   
 "dependencies": {   
    "express": "3.0.6", //express engine on node.js (local development server)   
    "twig": "*", //template engine (local development server)   
    "browserify": "1.16", //script builder to make all client-side JS into single file   
    "jsmin" : "*", //the script to minify JS output by script builder   
    "socket.io" : "*", //the server side of WebSocket   
    "mysql" : "2.0.0-alpha7" //database driver   
  }