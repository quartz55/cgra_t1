/**
 * MyWindowWall
 * @constructor
 */
function MyWindowWall(scene, winWidth, winHeight){
	  CGFobject.call(this,scene);

    this.winWidth = winWidth || 0.5;
    this.winHeight = winHeight || 0.5;

    this.leftQuadW = (1-this.winWidth)/2;
    this.topQuadW = this.winWidth;
    this.topQuadH = (1-this.winHeight)/2;

    this.quadLeft = new MyQuad(scene,
                               -0.5, 0.040,
                               -(1-this.winHeight)+0.1, 1+(1-this.winHeight)-0.1);
    this.quadLeft.initBuffers();

    this.quadRight = new MyQuad(scene,
                                1-0.04, 1+0.5,
                                -(1-this.winHeight)+0.1, 1+(1-this.winHeight)-0.1);
    this.quadRight.initBuffers();

    this.quadTop = new MyQuad(scene, 0.05, 0.95, -0.25, 0.035);
    this.quadTop.initBuffers();

    this.quadBottom = new MyQuad(scene, 0.05, 0.95, 1-0.035, 1+0.25);
    this.quadBottom.initBuffers();

    this.windowAppearance = new CGFappearance(scene);
    this.windowAppearance.loadTexture("../resources/images/window.png");
    this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    this.windowAppearance.setAmbient(0.7,0.7,0.7,1);
    this.windowAppearance.setDiffuse(0.7,0.7,0.7,1);
    this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
    this.windowAppearance.setShininess(10);

};

MyWindowWall.prototype = Object.create(CGFobject.prototype);
MyWindowWall.prototype.constructor = MyWindowWall;

MyWindowWall.prototype.display = function()
{
    this.scene.pushMatrix();

    this.scene.translate(-0.5, 0, 0);
    this.scene.scale(this.leftQuadW,1,1);
    this.scene.translate(0.5, 0, 0);

    this.windowAppearance.apply();
    this.quadLeft.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(0.5-this.leftQuadW, 0, 0);
    this.scene.scale(this.leftQuadW,1,1);
    this.scene.translate(0.5, 0, 0);

    this.windowAppearance.apply();
    this.quadRight.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(-0.5+this.leftQuadW, -0.5, 0);
    this.scene.scale(this.topQuadW,this.topQuadH,1);
    this.scene.translate(0.5, 0.5, 0);

    this.windowAppearance.apply();
    this.quadBottom.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    this.scene.translate(-0.5+this.leftQuadW, 0.5-this.topQuadH, 0);
    this.scene.scale(this.topQuadW,this.topQuadH,1);
    this.scene.translate(0.5, 0.5, 0);

    this.windowAppearance.apply();
    this.quadTop.display();

    this.scene.popMatrix();
};
