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

    this.leftWheel = new MyWheel(scene, 12);
    this.leftWheel.initBuffers();

    this.rightWheel = new MyWheel(scene, 12);
    this.rightWheel.initBuffers();

    this.armSize = 2;
    this.armFat = 0.3;

    this.leftArm = new MyRobotArm(scene, this.armSize, this.armFat);
    this.leftArm.initBuffers();

    this.rightArm = new MyRobotArm(scene, this.armSize, this.armFat);
    this.rightArm.initBuffers();

    this.head = new MySemiCircle(scene, 12, 30);
    this.head.initBuffers();

    this.rotation = 0;
    this.position = [0, 0];
    this.speed = 0;

    this.bodySize = 3;
    this.bodyFat = 0.8;

    this.wheelSize = 0.25;

    this.defaultAppearance = null;

    this.steelTexture = new CGFappearance(scene);
    this.steelTexture.setDiffuse(0.5, 0.5, 0.5, 0.5);
    this.steelTexture.setSpecular(0.8, 0.8, 0.8, 1);
    this.steelTexture.setShininess(200);

    this.blackTexture = new CGFappearance(scene);
    this.blackTexture.setAmbient(0.1, 0.1, 0.1, 1);
    this.blackTexture.setDiffuse(0.1, 0.1, 0.1, 1);
    this.blackTexture.setSpecular(0.3, 0.3, 0.3, 0.5);
    this.blackTexture.setShininess(10);

    this.skinTexture = new CGFappearance(scene);
    this.skinTexture.setAmbient(0.529, 0.403, 0.352, 1);
    this.skinTexture.setDiffuse(0.529, 0.403, 0.352, 0.5);
    this.skinTexture.setSpecular(1, 1, 1, 0.1);
    this.skinTexture.setShininess(10);

    this.headAppearance0 = new CGFappearance(scene);
    this.headAppearance0.loadTexture("../resources/images/robotFace.png");

    this.headAppearance1 = new CGFappearance(scene);
    this.headAppearance1.loadTexture("../resources/images/face.png");

    this.headAppearance = null;
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

    this.leftWheel.addRotation(this.speed);
    this.rightWheel.addRotation(this.speed);

    this.rightArm.addRot(this.speed/2);
    this.leftArm.addRot(this.speed/2);

    // this.tri.display(); //direction

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
    this.leftWheel.display();

    this.scene.popMatrix();

    // Right wheel
    this.scene.pushMatrix();

    this.scene.translate(-(this.bodyFat/2+2*this.wheelSize), 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.scene.scale(1, 1, this.wheelSize);
    this.rightWheel.display();

    this.scene.popMatrix();

    // Left arm
    this.scene.pushMatrix();

    this.scene.translate(this.bodyFat+this.armFat, this.bodySize-this.armSize/2, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);

    this.defaultAppearance.apply();
    this.leftArm.display();

    this.scene.popMatrix();

    // Right arm
    this.scene.pushMatrix();

    this.scene.translate(-(this.bodyFat+this.armFat), this.bodySize-this.armSize/2, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);

    this.defaultAppearance.apply();
    this.rightArm.display();

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
    this.rotation -= 2;
    this.leftWheel.addRotation(0.06);
    this.rightWheel.addRotation(-0.06);
};

MyRobot.prototype.rotLeft = function ()
{
    this.rotation += 2;
    this.leftWheel.addRotation(-0.06);
    this.rightWheel.addRotation(0.06);
};

MyRobot.prototype.changeAppearance = function(newApp)
{
    if(newApp == 0)
    {
        this.headAppearance = this.headAppearance0;
        this.defaultAppearance = this.blackTexture;
    }
    else if(newApp == 1)
    {
        this.headAppearance = this.headAppearance1;
        this.defaultAppearance = this.skinTexture;
    }
    else
    {
        this.headAppearance = this.headAppearance1;
        this.defaultAppearance = this.skinTexture;
    }
};

MyRobot.prototype.startWaving = function()
{
    this.rightArm.startWaving();
};
