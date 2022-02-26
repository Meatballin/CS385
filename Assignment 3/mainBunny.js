angle = 0;
function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(1, 1, 1, 1);
    gl.enable(gl.DEPTH_TEST);
    Bunny = new Bunny(gl);
    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    angle += 1;
    Bunny.MV = rotate(angle, [1,1,1]); //rotate around the axis(1,1,1)
    Bunny.render();
    requestAnimationFrame(render);
    
}
window.onload = init;