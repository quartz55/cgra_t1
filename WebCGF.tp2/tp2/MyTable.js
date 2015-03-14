/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	  CGFobject.call(this,scene);
    this.cube = new MyUnitCubeQuad(scene);

	  this.woodMaterial = new CGFappearance(scene);
    this.woodMaterial.setAmbient(0.4, 0.20, 0, 1);
    this.woodMaterial.setDiffuse(0.4, 0.20, 0, 1);
    this.woodMaterial.setSpecular(0.2, 0.2, 0.2, 1);
    this.woodMaterial.setShininess(120);

    this.metalMaterial = new CGFappearance(scene);
    this.metalMaterial.setAmbient(0.4, 0.4, 0.4, 1);
    this.metalMaterial.setDiffuse(0.4, 0.4, 0.4, 0.5);
    this.metalMaterial.setSpecular(0.8, 0.8, 0.8, 1);
    this.metalMaterial.setShininess(120);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function (){
    /* Back left leg */
    this.scene.pushMatrix();
    this.scene.translate(0.15,1.75,0.15);
    this.scene.scale(0.3,3.5,0.3);

    this.metalMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    /* Back right leg */
    this.scene.pushMatrix();
    this.scene.translate(0.15+5-0.3,1.75,0.15);
    this.scene.scale(0.3,3.5,0.3);

    this.metalMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    /* Front left leg */
    this.scene.pushMatrix();
    this.scene.translate(0.15,1.75,0.15+3-0.3);
    this.scene.scale(0.3,3.5,0.3);

    this.metalMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    /* Front right leg */
    this.scene.pushMatrix();
    this.scene.translate(0.15+5-0.3,1.75,0.15+3-0.3);
    this.scene.scale(0.3,3.5,0.3);

    this.metalMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();

    /* Table top */
    this.scene.pushMatrix();
    this.scene.translate(2.5,0.15+3.5,1.5);
    this.scene.scale(5,0.3,3);

    this.woodMaterial.apply();
    this.cube.display();
    this.scene.popMatrix();
}
