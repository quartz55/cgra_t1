/**
 * MyWheel
 * @constructor
 */
function MyWheel(scene, slices){
	  CGFobject.call(this,scene);
	  this.slices=slices || 8;

    this.cylinder = new MyCylinder(scene, this.slices);
    this.cylinder.initBuffers();

    this.face = new MyCircle(scene, this.slices);
 	  this.face.initBuffers();

    this.wheelAppearance = new CGFappearance(scene);
    this.wheelAppearance.loadTexture("../resources/images/wheel.jpg");

    this.tireAppearance = new CGFappearance(scene);
    this.tireAppearance.setAmbient(0.1, 0.1, 0.1, 1);
    this.tireAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
    this.tireAppearance.setSpecular(0.1, 0.1, 0.1, 0);

};

MyWheel.prototype = Object.create(CGFobject.prototype);
MyWheel.prototype.constructor = MyWheel;

MyWheel.prototype.display = function()
{
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);

    this.wheelAppearance.apply();
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 1, 0, 0);

    this.wheelAppearance.apply();
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.tireAppearance.apply();
    this.cylinder.display();
    this.scene.popMatrix();
};
