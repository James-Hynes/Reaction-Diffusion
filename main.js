let grid = [],
    next = [];

let dA = 1.0,
    dB = .5,
    feed = 0.0367,
    k = 0.0649;

function setup() {
    createCanvas(200, 200);
    pixelDensity(1);
    
    setFrameRate(30);
    
    for(let x = 0; x < width; x++) {
        grid[x] = [];
        for(let y = 0; y < height; y++) {
            grid[x][y] = {a: 1, b: 0};
        }
    }
    
    next = grid;

    for(let x = 100; x < 110; x++) {
        for(let y = 100; y < 110; y++) {
            grid[]
        }
    }
}

function draw() {
    loadPixels();
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            let a = grid[x][y].a;
            let b = grid[x][y].b;
            let c = floor((a - b) * 255);
            c = constrain(c, 0, 255);
            
            var pix = (x + y * width) * 4
            pixels[pix] = c;
            pixels[pix + 1] = c;
            pixels[pix + 2] = c;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    
    let tempGrid = grid;
    grid = next;
    next = tempGrid;
}

function laplace(ab, x, y) {
    let sum = 0;
    for(let i = (x - 1); i <= (x + 1); i++) {
        for(let j = (y - 1); j <= (y + 1); j++) {
            let distanceFromCenter = Math.floor(Math.abs(x - i) + Math.abs(y - j));
            let wrappedI = ((i < 0) ? width - 1 : i);
            wrappedI = ((wrappedI > width - 1) ? 0 : wrappedI);
            let wrappedJ = ((j < 0) ? height - 1 : j);
            wrappedJ = ((wrappedJ > height - 1) ? 0 : wrappedJ);
            switch(distanceFromCenter) {
                case 0:
                    sum += ((ab) ? grid[wrappedI][wrappedJ].a * -1 : grid[wrappedI][wrappedJ].b * -1);
                    break;
                case 1:
                    sum += ((ab) ? grid[wrappedI][wrappedJ].a * 0.2 : grid[wrappedI][wrappedJ].b * 0.2);
                    break;
                case 2:
                    sum += ((ab) ? grid[wrappedI][wrappedJ].a * 0.05 : grid[wrappedI][wrappedJ].b * 0.05);
                    break;
            }
        }
    }
    return sum;
}

setInterval(function() {
    for(let i = 0; i < 2; i++) {
      for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            let a = grid[x][y].a,
                b = grid[x][y].b;
            next[x][y].a = a + 
                ((dA * laplace(true, x, y)) - 
                (a * b * b) + 
                (feed * (1 - a)));
            next[x][y].b = b + 
                           ((dB * laplace(false, x, y)) + 
                           (a * b * b) -
                           ((k + feed) * b));
            
            next[x][y].a = constrain(next[x][y].a, 0, 1);            
            next[x][y].b = constrain(next[x][y].b, 0, 1);

        }
    }    
    }
}, 2);

function mousePressed() {
    for(let i = Math.max(mouseX, 0); i < Math.min(mouseX + 10, width); i++) {
        for(let j = Math.max(mouseY, 0); j < Math.min(mouseY + 10, height); j++) {
            grid[i][j].b = 1;
        }
    }
}