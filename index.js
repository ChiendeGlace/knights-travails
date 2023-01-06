const buildGraph = (graph, a, b) => {
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
    return graph;
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
    return graph;

};

console.log(knightMoves([1, 2], [6, 7]));
