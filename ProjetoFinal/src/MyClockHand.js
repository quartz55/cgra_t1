var degToRad = Math.PI / 180.0;

/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, angle, length) {
	  CGFobject.call(this,scene);
    this.hand = new MyUnitCubeQuad(scene);
    this.angle = angle || 0;
    this.length = length || 0.2;

    this.handAppearance = new CGFappearance(scene);
    this.handAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.handAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
    this.handAppearance.setSpecular(0.2, 0.2, 0.2, 0);
    this.handAppearance.setShininess(300);
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function (){
    this.scene.pushMatrix();
    this.scene.rotate(degToRad * this.angle, 0, 0, -1);
    this.scene.translate(0, this.length/2, 0);
    this.scene.scale(0.025, this.length, 0.025);

    this.handAppearance.apply();
    this.hand.display();
    this.scene.popMatrix();
};

MyClockHand.prototype.setAngle = function (angle){
    this.angle = angle;
};
