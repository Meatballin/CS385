
var gl;
var near;
var far;
var d;
var year = 0;
var day = 0;


function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
    //===================
    //SUN
    //===================
    Sun = new Sphere();
    Sun.color = vec4(1, 1, 0, 1);
    Sun.radius = 15;

    //===================
    //EARTH
    //===================
    Earth = new Sphere();
    Earth.color = vec4(0, 0, 1, 1);
    Earth.radius = 3;
    Earth.orbit = 30;

    //===================
    //MOON
    //===================
    Moon = new Sphere();
    Moon.color = vec4(1, 1, 1, 1);
    Moon.radius = 1;
    Moon.orbit = 8;

    near = 1;
    d = 2 * (Earth.orbit + Moon.orbit + Moon.radius + 5000);
    far = near + d;
    
    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here

    requestAnimationFrame(render);
}

window.onload = init;