class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = floor(random(20, 120));
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    eat() {
        var allCells = this.chooseCell();
        this.multiply--;
        if (this.multiply <= 0) {
            for (let j in allCells) {
                var x = allCells[j][0];
                var y = allCells[j][1];

                if (matrix[y][x] == 1) {
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 2) {
                    for (var i in grassEatArr) {
                        if (x == grassEatArr[i].x && y == grassEatArr[i].y) {
                            grassEatArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (var i in predatorArr) {
                        if (x == predatorArr[i].x && y == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 4) {
                    for (var i in bombArr) {
                        if (x == bombArr[i].x && y == bombArr[i].y) {
                            bombArr.splice(i, 1);
                            break;
                        }
                    }
                }

                matrix[y][x] = 0;
            }
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
    }
}