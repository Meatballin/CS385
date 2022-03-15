

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
    
    //Calculation of viewing frustrum
    var aspect = (canvas.clientWidth / canvas.clientHeight);
    var angle = Math.atan((d/2) / (near + (d/2)));
    var fov = 2 * (angle);

    Sun.P = perspective(fov, aspect, near, far);
    Earth.P = perspective(fov, aspect, near, far);
    Moon.P = perspective(fov, aspect, near, far);

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    year += 1;
    day += 1;
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    ms = new MatrixStack();
    var v = translate(0.0, 0.0, -0.5 * (near + far));
    ms.load(v);
    //Sun
    ms.push();
    ms.scale(Sun.radius);
    Sun.MV = ms.current();
    Sun.render();
    ms.pop();


    //earth
    ms.push();
    ms.rotate(year, [0,1,0]);
    ms.translate(Earth.orbit, 0, 0);
    ms.push();
    ms.rotate(day, [1,0,0]);
    ms.scale(Earth.radius);
    Earth.MV = ms.current();
    Earth.render();
    ms.pop();
    ms.rotate(day, [0, 1, 0]);
    ms.translate(Moon.orbit, 0, 0);
    ms.scale(Moon.radius);
    Moon.MV = ms.current();
    Moon.render();
    ms.pop();
    requestAnimationFrame(render);
}

window.onload = init;