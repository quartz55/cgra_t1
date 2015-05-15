/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene) {
	  CGFobject.call(this,scene);

    this.tri = new MyTriangle(scene);
    this.tri.initBuffers();

    this.body = new MyFullCylinder(scene, 12);
    this.body.initBuffers();

    this.wheel = new MyWheel(scene, 12);
    this.wheel.initBuffers();

    this.arm = new MyFullCylinder(scene, 12);
    this.arm.initBuffers();

    this.head = new MySemiCircle(scene, 12, 30);
    this.head.initBuffers();

    this.rotation = 0;
    this.position = [0, 0];
    this.speed = 0;

    this.bodySize = 3;
    this.bodyFat = 0.8;

    this.wheelSize = 0.25;

    this.armSize = 2;
    this.armFat = 0.3;

    this.defaultAppearance = new CGFappearance(scene);

    this.headAppearance = new CGFappearance(scene);
    this.headAppearance.loadTexture("../resources/images/face.png");
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.display = function () {
    this.scene.pushMatrix();

    // Rotate robot
    this.position[0] += this.speed*Math.sin(this.rotation*degToRad);
    this.position[1] += this.speed*Math.cos(this.rotation*degToRad);
    this.speed *= 0.95;

    this.scene.translate(this.position[0], 0, this.position[1]);
    this.scene.rotate(this.rotation*degToRad, 0, 1, 0);

    this.tri.display(); //direction

    // Robot body
    this.scene.pushMatrix();

    this.scene.translate(0, this.bodySize/2, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.scale(this.bodyFat, this.bodyFat, this.bodySize);

    this.defaultAppearance.apply();
    this.body.display();

    this.scene.popMatrix();

    // Left wheel
    this.scene.pushMatrix();

    this.scene.translate(this.bodyFat/2+2*this.wheelSize, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.scene.scale(1, 1, this.wheelSize);
    this.wheel.display();

    this.scene.popMatrix();

    // Right wheel
    this.scene.pushMatrix();

    this.scene.translate(-(this.bodyFat/2+2*this.wheelSize), 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);
    this.scene.scale(1, 1, this.wheelSize);
    this.wheel.display();

    this.scene.popMatrix();

    // Left arm
    this.scene.pushMatrix();

    this.scene.translate(this.bodyFat+this.armFat, this.bodySize-this.armSize/2, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.scale(this.armFat, this.armFat, this.armSize);

    this.defaultAppearance.apply();
    this.arm.display();

    this.scene.popMatrix();

    // Right arm
    this.scene.pushMatrix();

    this.scene.translate(-(this.bodyFat+this.armFat), this.bodySize-this.armSize/2, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.scale(this.armFat, this.armFat, this.armSize);

    this.defaultAppearance.apply();
    this.arm.display();

    this.scene.popMatrix();

    // Head
    this.scene.pushMatrix();

    this.scene.translate(0, this.bodySize, 0);
    this.scene.scale(this.bodyFat, 1, this.bodyFat);
    this.scene.rotate(Math.PI/2, 0, 1, 0);

    this.headAppearance.apply();
    this.head.display();

    this.scene.popMatrix();

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
