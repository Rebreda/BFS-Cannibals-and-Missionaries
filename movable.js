/* Breadth-First-Search(Graph, Root, Goal):
    
    create empty set Checked
    create empty queue Queue      

    add Root to Checked
    Queue.enqueue(Root)                      

    while Queue is not empty {
        Current = Queue.dequeue()
        if Current.has(Goal) {
            return Current
        }
        for each Node that is adjacent to Current {
            if Node is not in Checked {
                Checked.add(Node)
                Queue.enqueue(Node)
            }
        }
    } */

function Node(state, parent, children, depth) {
  this.state = state;
  this.parent = parent;
  this.children = children;
  this.depth = depth;
  this.text = {"name" : state};
}


function compareArr(a1, a2) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

function searchArr(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length)
        return i;
    }
  }
  return -1;
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function genNode(par, arr, queue) {
  let LMAX = MAX - 1;
  let temp = null;

  for (let i = 0; i < MAX ; i++) {
    
    for (let x = 0; x < MAX; x++) {
    //console.log("all: ", i, x);
      if (i + x < MAX && i + x > 0) {
        if (arr[2] == -1) { //left side, subtract
            temp = new Node([arr[0] - i, arr[1] - x, 1], par, [], par.depth + 1);
            m = temp.state[0]; c = temp.state[1];
            if(m >= 0 && c >= 0 &&  m < MAX+1 && c < MAX+1){
            par.children.push(temp);
            // par.children = shuffle(par.children);
            queue.push(temp);
            }
        } else {
            temp = new Node([arr[0] + i, arr[1] + x, -1], par, [], par.depth + 1);
             m = temp.state[0]; c = temp.state[1];
            if(m >= 0 && c >= 0 &&  m < MAX+1 && c < MAX+1){
            par.children.push(temp);
            queue.push(temp);
            }
        }
      }
    }
  }
  
}
var node = {}; 

function isValid(arr) {
  var m = arr[0];
  var c = arr[1];
  var main = (m >= 0 && c >= 0 && MAX - m >= 0 && MAX - c >= 0);
  var left = (m === 0 || m >= c);
  var right = (MAX - m === 0 || MAX - m >= MAX - c);
  
  return main && left && right ;
  
}
function addElement (x, y, z, a) { 
  // create a new div element 
  // and give it some content 
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(x); 
  if(y){
    newDiv.style.color = "blue";
  }
  
  newDiv.className = a;

  newDiv.appendChild(newContent); //add the text node to the newly created div. 

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById(z); 

  currentDiv.appendChild(newDiv, currentDiv); 
}

let graph = [];
let combos = [];
MAX = 3;

function bfs(graph, root, goal) {
  $("#div1").empty();
  $("#div2").empty();
  let checked = [];
  let queue = [];
  let curr = [];
  let last = null;
    let combo = [];

  queue.push(root);
  //console.log("root", root);
   config = {
      container: "#tree-simple",
      stackChildren: true,
      // animateOnInit: true
  };
var treeMaker = [config]; 
  var big = [];
var xla = 0;
var x2 = {}; 
  while (queue.length !== 0) {
    curr = queue.shift();
  if (compareArr(curr.state, root.state) && treeMaker.length == 1) {
    
    node = {
      text: {
          name: "island: " + root.state.toString(),
          title: 'main land: 0,0',
          // desc: "A basic example",
      }
  };
  var last2 = node;  
  treeMaker.push(node);
  }
    if (compareArr(curr.state, goal)) {
      console.log("found", curr);
      while (true) {
        if (curr.parent) {
          big.push(curr);
          console.log(curr.state);
          
          // addElement(curr.state.toString() + " " + curr.depth.toString(), false, 'div2',curr.depth.toString());
          
          curr = curr.parent;
        } else {
          console.log(root.state);
          break;
        }
      }
      big = big.reverse();
    
    for(var prop in big){
      console.log('p'+big[prop].depth, big[prop].state);
      
      x2   = {
          parent: last2,
          text: {
              name: "island: " + big[prop].state.toString(),
              title: "main land: " + (3-big[prop].state[0]) +"," + (3-big[prop].state[1])  ,
              // desc: "A basic example",
          }
      };
      treeMaker.push(x2);
      combo.push(big[prop].state);
      if(big[prop].children){
        let y = big[prop].children; 
        for( var x in y){
          if(searchArr(combo, y[x].state) > 0) continue; 
           y2   = {
              parent: x2,
              text: {
                  name: "island: " + y[x].state.toString(),
                  title: "main land: " +  (3-y[x].state[0]) +"," + (3-y[x].state[1])  ,

                  // desc: "A basic example",
              }
          };
          treeMaker.push(y2);
          console.log('c', y[x].state); 
        }
      }
      
      last2 = x2; 
      
    }
    
      var chart = new Treant(treeMaker, function(){} ,$);

      return curr;
    }
    
    
          

    if (searchArr(checked, curr.state) < 0 ) { //not checked + valid
      checked.push(curr.state);
      if(isValid(curr.state)){
        genNode(curr, curr.state, queue);
      } 
    }
  }
}


var rootNode = new Node([MAX, MAX, -1], null, [], 1);

bfs([], rootNode, [0, 0, 1]);

 $("#numb").on("change", function(){
   MAX = $("#numb").val();
  var asd = new Node([MAX, MAX, -1], null, [], 1);
  console.log('asd', asd);
  bfs([], asd, [0, 0, 1]);
});




