export default function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export default function removeChilds(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}