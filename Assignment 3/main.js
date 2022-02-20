function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    Cube = new Cube(gl);
    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    Cube.render();
    requestAnimationFrame(render);
    
}
window.onload = init;