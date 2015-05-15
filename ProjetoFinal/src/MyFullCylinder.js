/**
 * MyFullCylinder
 * @constructor
 */
function MyFullCylinder(scene, slices){
	  CGFobject.call(this,scene);
	  this.slices=slices || 8;

    this.cylinder = new MyCylinder(scene, this.slices);
    this.cylinder.initBuffers();

    this.face = new MyCircle(scene, this.slices);
 	  this.face.initBuffers();

    this.clockAppearance = new CGFappearance(scene);

};

MyFullCylinder.prototype = Object.create(CGFobject.prototype);
MyFullCylinder.prototype.constructor = MyFullCylinder;

MyFullCylinder.prototype.display = function()
{
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.face.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.cylinder.display();
    this.scene.popMatrix();
};
