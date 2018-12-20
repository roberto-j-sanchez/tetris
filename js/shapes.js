const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

function createShape(type) {
    switch(type) {
        case "I":
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
            break;
        case "L":
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2]
            ];
            break;
        case "J":
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
            break;
        case "O":
            return [
                [4, 4],
                [4, 4],
            ];
            break;
        case "Z":
            return [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ];
            break;
        case "S":
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
            break;
        case "T":
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ];
            break;
    };
}