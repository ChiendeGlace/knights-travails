const buildGraph = (graph, a, b) => {
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[b].push(a);
    return graph;
};

const checkIfVisited = (visited, neighbour) => {
    for (let i = 0; i < visited.length; i++) {
        if (visited[i][0] === neighbour[0] && visited[i][1] === neighbour[1]) {
            return true;
        }
    }
    return false;
};

const solve = (graph, s) => {
    const queue = [s];
    const visited = [s];
    const prev = [];
    while (queue.length > 0) {
        const current = queue.shift();
        for (let neighbour of graph[current]) {
            if (checkIfVisited(visited, neighbour) == false) {
                queue.push(neighbour);
                visited.push(neighbour);
                prev[neighbour] = current;
            }
        }
    }
    return prev;
};

const reconstructPath = (s, e, prev) => {
    let path = [];
    debugger;
    for (let i = e; i != null; i = prev[i]) {
        path.push(i);
    }
    const reversedPath = [];
    for (let i = path.length - 1; i >= 0; i--) {
        reversedPath.push(path[i]);
    }
    if (path[path.length - 1] == s) {
        return reversedPath;
    }
    return;
};

const knightMoves = (start, end) => {
    const queue = [start];
    const graph = {};
    if ([...start, ...end].find((num) => num < 0 || num > 7))
        return 'Knight cannot be placed outside of the board';
    const possibleMoves = [
        [1, 2],
        [2, 1],
        [1, -2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [-1, 2],
        [2, -1],
    ];
    while (queue.length > 0) {
        let current = queue.shift();
        for (let i = 0; i < possibleMoves.length; i++) {
            let newX = current[0] + possibleMoves[i][0];
            let newY = current[1] + possibleMoves[i][1];
            let newSquare = [newX, newY];
            if (![newX, newY].find((num) => num < 0 || num > 7)) {
                if (!([newX, newY] in graph)) {
                    queue.push([newX, newY]);
                }
                buildGraph(graph, current, newSquare);
            }
        }
    }
    let prev = solve(graph, start);
    let result = reconstructPath(start, end, prev);
    let distance = result.length - 1;
    console.log(`Distance from [${start}] to [${end}] is ${distance}.`);
    console.log(`And the path was:`);
    console.log(...result);
};

knightMoves([6, 1], [0, 0]);
