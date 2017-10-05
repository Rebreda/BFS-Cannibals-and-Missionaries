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
                    if (m >= 0 && c >= 0 && m < MAX + 1 && c < MAX + 1 ) {
                        par.children.push(temp);
                        queue.push(temp);
                    }
                } else {
                    temp = new Node([arr[0] + i, arr[1] + x, -1],par,[],par.depth + 1);
                    m = temp.state[0];
                    c = temp.state[1];
                    if (m >= 0 && c >= 0 && m < MAX + 1 && c < MAX + 1 ) { //make sure its a reasonable value
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
    let aq='';
    queue.push(root);
     
    while (queue.length !== 0) {
        curr = queue.shift();

        if (compareArr(curr.state, goal)) {
            console.log("found", curr);

            while (true) {
                if (curr.parent) {
                    aq = (curr.parent.state[0] - curr.state[0]) + "M " + (curr.parent.state[1] - curr.state[1] + "C, ");

                    console.log("Main Land: ", curr.state.toString(), " Island: " ,(MAX - curr.state[0]) + "," + (MAX - curr.state[1]));
                    $('<p>', {
                        class: 'listObjectShow',
                    }).text("Main Land: " + curr.state.toString()+ " | Island: " +(MAX - curr.state[0]) + "," + (MAX - curr.state[1]) + " | MOVE " + aq).appendTo('body');
                    

                    curr = curr.parent;
                } else {
                    $('<h1>', {
                      class: 'listObjectShow',
                    }).text("Main Land: " + curr.state.toString()+ " | Island: " +(MAX - root.state[0]) + "," + (MAX - root.state[1])).appendTo('body');

                    console.log("Main Land: ", curr.state.toString(), " Island: " ,(MAX - root.state[0]) + "," + (MAX - root.state[1]));
                    break;
                }
            }
            

            return curr;
        }

        if (searchArr(checked, curr.state) < 0) {
            //not checked + valid
            checked.push(curr.state);
            if (isValid(curr.state)) {
                genNode(curr, curr.state, queue);
            }
        }
    }
}


//generate initial node.
var rootNode = new Node([MAX, MAX, -1],null,[],1);
//call the search
bfs(rootNode, [0, 0, 1]);

$("#numb").on("change", function() {
    MAX = $("#numb").val();
    var asd = new Node([MAX, MAX, -1],null,[],1);
    console.log('asd', MAX);
    bfs( asd, [0, 0, 1]);
});
