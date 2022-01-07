/* crashes game for some reason ...*/

let loop = true;
let task = "robstore" 
/*options:
shoplift
robstore
mug
need to add: larceny, dealdrugs, forgery, traffick, homicide, grandtheft, kidnap, assassinate, heist
*/
let interval = 1000; //1 second
let button = '';

if(task=="shoplift"){
    interval = 1000 * 1; //1 seconds
    button = document.querySelector('#root > div > div.MuiBox-root.css-1ik4laa > div.jss3.MuiBox-root.css-1335198 > button:nth-child(3)');
}
else if(task=="robstore"){
    interval = 1000 * 60; //60 seconds
    button = document.querySelector('#root > div > div.MuiBox-root.css-1ik4laa > div.jss3.MuiBox-root.css-1335198 > button:nth-child(5)'); 
}
else if(task=="mug"){
    interval = 1000 * 3; //3 seconds
    button = document.querySelector('#root > div > div.MuiBox-root.css-1ik4laa > div.jss3.MuiBox-root.css-1335198 > button:nth-child(7)');
}
// else if(task==""){
//     interval = 1000 * 60; //60 seconds
//     button = document.querySelector('');
// }
// else if(task==""){
//     interval = 1000 * 60; //60 seconds
//     button = document.querySelector('');
// }
while (loop==true){
    setInterval(function(){ 
        button.click();
        sleep(1000);
    }, interval);
}