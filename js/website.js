// Top of screen on refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function randomShape(shapeID) {
    num = Math.floor((Math.random() * 9) + 1);
    document.getElementById(shapeID).data = "images/svg/shape_" + num.toString()  + ".svg";
}

function randomColor(shapeID) {
    const pastel_colors = ["#f39ea1", "#f9c798", "#f8f099", "#c0dcb0", "#a6c7e7", "#c2b0e0"]
    let svg = document.getElementById(shapeID).contentDocument;
    if (svg == null) {
        setTimeout(() => {  randomColor(shapeID); }, 5);
    } else {
        let fill = pastel_colors[Math.floor((Math.random() * 6))];
        if (svg.getElementById("Layer_1") == null) {
            setTimeout(() => {  randomColor(shapeID); }, 5);
        } else {
            svg.getElementById("Layer_1").setAttribute("fill", fill);
            svg.getElementById("Layer_1").setAttribute("stroke-width", 0);
        }
        return;
    }
}

function randomSize(shapeID) {
    size = Math.floor((Math.random() * 20) + 5);
    document.getElementById(shapeID).style.width = size.toString() + "vw"
    blur = 12 * ((25-size)/20);
    document.getElementById(shapeID).style.filter = "blur(" + blur.toString() + "px)";
    document.getElementById(shapeID).style.zIndex = size-20;

}

function randomPos(shapeID, numID) {
    if ((numID-1)%2 == 0) {
        x = Math.floor((Math.random() * 10) + -10);
        y = 50+(numID-1)*25;
    } else {
        x = Math.floor((Math.random() * 10) + 80);
        y = 20+(numID-2)*25;
    }
    document.getElementById(shapeID).style.left = x.toString() + "%"
    document.getElementById(shapeID).style.top = y.toString() + "%"
    return y;
}

function floatingShapes() {
    let og_heights = []; 
    for (let i = 1; i < 15; i++) {
        id = "shape" + i.toString();
        randomShape(id);
        randomSize(id);
        randomColor(id);
        og_heights.push(randomPos(id, i));
    }
    return og_heights;
}

function getSpeeds() {
    let og_speeds = []; 
    for (let i = 1; i < 15; i++) {
        og_speeds.push(Math.floor((Math.random() * 250) + 20));
    }
    return og_speeds;
}

og_heights = floatingShapes();
og_speeds = getSpeeds();

let oldValue = 0
let newValue = 0

window.addEventListener('scroll', (e) => {
    let scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    let scroll_pos = window.pageYOffset;
    updateShapeHeight(scroll_pos, scrollMaxY, og_heights, og_speeds);
});

function updateShapeHeight(scroll_pos, scrollMaxY, og_heights, og_speeds) {
    ratio = scroll_pos/scrollMaxY;
    for (let i = 1; i < 15; i++) {
        id = "shape" + i.toString();
        speed = 100;
        y_pos = og_heights[i-1] - og_speeds[i-1]*ratio;
        document.getElementById(id).style.top = y_pos.toString() + "%";
    }
}