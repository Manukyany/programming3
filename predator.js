class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.multiply = 0
        this.directions = [];
    }
    getNewCoordinates() {
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
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 12) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newGrass = new Predator(newX, newY);
            predatorArr.push(newGrass);
            this.multiply = 0;
        }
    }
    move() {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        if (newCell && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.energy--
        } else if (newCell1 && this.energy > 0) {
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            this.x = newX
            this.y = newY
            this.energy--
        }
        else {
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEatArr) {
                if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }

}