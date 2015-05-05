/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene) {
	  CGFobject.call(this,scene);

    this.tri = new MyTriangle(scene);
    this.tri.initBuffers();

    this.rotation = 0;
    this.position = [0, 0];
    this.speed = 0;
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function () {
    this.scene.pushMatrix();

    this.position[0] += this.speed*Math.sin(this.rotation*degToRad);
    this.position[1] += this.speed*Math.cos(this.rotation*degToRad);
    this.speed *= 0.95;

    this.scene.translate(this.position[0], 0, this.position[1]);
    this.scene.rotate(this.rotation*degToRad, 0, 1, 0);
    this.tri.display();

    this.scene.popMatrix();
};

MyRobot.prototype.rotRight = function ()
{
    this.rotation -= 5;
};

MyRobot.prototype.rotLeft = function ()
{
    this.rotation += 5;
};
