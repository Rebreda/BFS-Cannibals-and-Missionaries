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

//the node that holds state/action data
function Node(state, parent, children, depth) {
    this.state = state;
    this.parent = parent;
    this.children = children;
    this.depth = depth;
}

//checks that two arrays are exactly the same
function compareArr(a1, a2) {
    return a1.length == a2.length && a1.every((v,i)=>v === a2[i]);
}

//checks if one array is in an array of arrays 
function searchArr(haystack, needle) {
    var i, j, current;
    for (i = 0; i < haystack.length; ++i) {
        if (needle.length === haystack[i].length) {
            current = haystack[i];
            for (j = 0; j < needle.length && needle[j] === current[j]; ++j)
                ;
            if (j === needle.length)
                return i;
        }
    }
    return -1;
}

//creates the next nodes in tree
function genNode(par, arr, queue) {
    let LMAX = MAX - 1;
    let temp = null;

    for (let i = 0; i < MAX; i++) {
        for (let x = 0; x < MAX; x++) {
            if (i + x < MAX && i + x > 0) {
                if (arr[2] == -1) {
                    //left side, subtract possible actions
                    temp = new Node([arr[0] - i, arr[1] - x, 1],par,[],par.depth + 1);
                    m = temp.state[0];
                    c = temp.state[1];
                    if (m >= 0 && c >= 0 && m < MAX + 1 && c < MAX + 1) {
                        par.children.push(temp);
                        queue.push(temp);
                    }
                } else {
                    temp = new Node([arr[0] + i, arr[1] + x, -1],par,[],par.depth + 1);
                    m = temp.state[0];
                    c = temp.state[1];
                    if (m >= 0 && c >= 0 && m < MAX + 1 && c < MAX + 1) {
                        par.children.push(temp);
                        queue.push(temp);
                    }
                }
            }
        }
    }
}

//checks if the array is a valid entry
function isValid(arr) {
    var m = arr[0];
    var c = arr[1];
    var main = (m >= 0 && c >= 0 && MAX - m >= 0 && MAX - c >= 0);
    var left = (m === 0 || m >= c);
    var right = (MAX - m === 0 || MAX - m >= MAX - c);
    return main && left && right;
}

MAX = 3;
var node = {};


function bfs(root, goal) {
    let checked = [];
    let queue = [];
    let curr = [];
    let last = null;
    let combo = [];
    
    // used for visualization not algorith
    var treeMaker = [{
        container: "#tree-simple",
        stackChildren: true
    }];
    var big = [];
    var xla = 0;
    var x2 = {};
     //END used for visualization, not the algroithm.
    
    queue.push(root); //init search
    while (queue.length !== 0) {
        curr = queue.shift(); //frontier node
        
        // used for visualization not algorithm {
        if (compareArr(curr.state, root.state) && treeMaker.length == 1) {
            node = {
                text: {
                    name: "island: " + root.state.toString(),
                    title: 'main land: 0,0',
                }
            };
            var last2 = node;
            treeMaker.push(node);
        }
        // } END used for visualization not algorithm END
        
        if (compareArr(curr.state, goal)) { //check if goal
            console.log("found", curr);
            while (true) {
                if (curr.parent) { 
                    big.push(curr); //create solution tree 
                    console.log(curr.state);
                    curr = curr.parent;
                } else {
                    console.log(root.state);
                    break;
                }
            }
            
            // used for visualization not algorithm {
            big = big.reverse(); 
            for (var prop in big) {
                x2 = {
                    parent: last2,
                    text: {
                        name: "island: " + big[prop].state.toString(),
                        title: "main land: " + (3 - big[prop].state[0]) + "," + (3 - big[prop].state[1]),
                    }
                };
                treeMaker.push(x2);
                combo.push(big[prop].state);
                if (big[prop].children) {
                    let y = big[prop].children;
                    for (var x in y) {
                        if (searchArr(combo, y[x].state) > 0)
                            continue;
                        y2 = {
                            parent: x2,
                            text: {
                                name: "island: " + y[x].state.toString(),
                                title: "main land: " + (3 - y[x].state[0]) + "," + (3 - y[x].state[1]),
                            }
                        };
                        treeMaker.push(y2);
                    }
                }
                last2 = x2;
            }
            var chart = new Treant(treeMaker,function() {}  ,$);
            // } END used for visualization not algorithm END
            return curr; //end bfs
        }

        if (searchArr(checked, curr.state) < 0) { //if this state hasnt been checked before, add it to seen checked list 
            checked.push(curr.state);
            if (isValid(curr.state)) { //if valid node, then generate children. 
                genNode(curr, curr.state, queue);
            }
        }
    }
}


//generate initial node.
var rootNode = new Node([MAX, MAX, -1],null,[],1);
//call the search
bfs(rootNode, [0, 0, 1]);


// used for visualization not algorithm
$("#numb").on("change keypress", function() {
    MAX = $("#numb").val();
    var asd = new Node([MAX, MAX, -1],null,[],1);
    console.log('asd', asd);
    bfs( asd, [0, 0, 1]);
});
// used for visualization not algorithm