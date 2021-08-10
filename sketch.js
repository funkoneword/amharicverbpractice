
let start,w,h,disp,verb,infverb,verbroot,english,verblist,letterlist;

function preload() {
  // Get the most recent earthquake in the database
  let url = 'https://cdn.glitch.com/2a512d31-9ecd-479b-9c95-6b8ceecda749%2Fverblist.json?v=1628611916117';
  verblist = loadJSON(url);
  url = 'https://cdn.glitch.com/2a512d31-9ecd-479b-9c95-6b8ceecda749%2Famhariclettersorders.json?v=1628573546629';
  letterlist = loadJSON(url);
  w = windowWidth-25;
  h = windowHeight-25;
  //start=verblist.verbs.length-1;
  
}

function setup() {
  
  //conversion(infverb);
  createCanvas(w,h);
  background(224);
  textAlign(CENTER,CENTER);
  
  
  verb = verblist.verbs[0];
  conversion(verb);
}
 
function draw() {
  textSize(22);
  text('use arrowkeys to see verbs',w/2,17*h/18)
  textSize(15)
  text('new verb',w/2,16*h/18)
  text('english',w/2,1*h/18)
  text("verb\nroot",w/16,3*h/5)
  text("verb\ninfintive",7*w/8,3*h/5)
  
  textSize(92); 
  text(disp,w/2,h/2);
  
}

function keyPressed() {
  if (keyCode === 37) {
    disptyp = 1;
  } else if (keyCode === 39) {
    disptyp = 2;
  } else if (keyCode === 38) {
    disptyp = 3;
  } else if (keyCode === 40) {
    verb=verblist.verbs[int(random(100))]; 
    conversion(verb);
  }
  prepareforthescreen(disptyp);
  background(random(255),random(255),random(255));
}

function prepareforthescreen(typ){
  switch(typ){
    case 1: disp = verbroot;  break;
    case 2: disp = infverb; break;
    case 3: disp = english;  break;
  }
  
}

function conversion(verb) {
  english="to "+verb.english;
  infverb=verb.amharic;
  
  let arrverb=split(infverb,"")
   if (arrverb[0]=='መ'){
    arrverb.splice(0,1);
  } else if (arrverb[0]=='ማ'){
    arrverb.splice(0,1,"አ");  
  } 
  let lngth=arrverb.length;
  if (arrverb[lngth-1]=='ት'){
    arrverb.splice(lngth-1,1);
    arrverb = search(arrverb,0,arrverb.length,'sixth','first');
  } else {
    //let lgnth=arrverb.length;
    if(arrverb[1]!='ስ'){
    arrverb = search(arrverb,0,arrverb.length-2,'sixth','first');
    }
    arrverb = search(arrverb,lngth-2,lngth-1,'first','sixth');
    arrverb = search(arrverb,lngth-2,lngth-1,'fourth','sixth');
    arrverb = search(arrverb,0,lngth,'second','seventh');
    if (arrverb[lngth-1]==arrverb[lngth-2]){
      arrverb.splice(lngth-1,1);
    }
  }
 
  
  verbroot=join(arrverb,"");
  
  
  
}

function search(arr,charstart,charend,find,repl){
    for (let i=charstart; i<charend;i++){
    let properorder = lookup(arr[i],find,repl);
    if (properorder){
      arr.splice(i,1,properorder);
    } 
  }
  return arr;
}



function lookup(char,find,repl){
  for(let i=0;i<letterlist.letters.length;i++){
    if (letterlist.letters[i][find] == char) {
      return letterlist.letters[i][repl];
      break;
    }
  }
  
}



