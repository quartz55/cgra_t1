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

    this.rotation = 0;

    // Appearances
    this.wheelAppearance = new CGFappearance(scene);
    this.wheelAppearance.loadTexture("../resources/images/wheel.jpg");
    this.wheelAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.wheelAppearance.setDiffuse(0.8, 0.8, 0.8, 0.3);
    this.wheelAppearance.setSpecular(0.8, 0.8, 0.8, 1);
    this.wheelAppearance.setShininess(300);

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
    this.scene.rotate(this.rotation, 0, 0, 1);

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

    this.scene.popMatrix();
};

MyWheel.prototype.addRotation = function(value)
{
    this.rotation += value;
    if (this.rotation >= 2*Math.PI) this.rotation -= 2*Math.PI;
    else if (this.rotation <= 0) this.rotation += 2*Math.PI;
};
