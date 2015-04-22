/**
 * MyClock
 * @constructor
 */
function MyClock(scene, slices){
	  CGFobject.call(this,scene);
	  this.slices=slices || 8;

    this.clockBase = new MyCylinder(scene, this.slices);
    this.clockBase.initBuffers();

    this.clockFace = new MyCircle(scene, this.slices);
 	  this.clockFace.initBuffers();

    this.hoursHand = new MyClockHand(scene, 0, 0.3);
 	  this.hoursHand.initBuffers();

    this.minutesHand = new MyClockHand(scene, 0, 0.5);
 	  this.minutesHand.initBuffers();

    this.secondsHand = new MyClockHand(scene, 0, 0.8);
 	  this.secondsHand.initBuffers();

    this.hoursHand.setAngle(90);
    this.minutesHand.setAngle(180);
    this.secondsHand.setAngle(270);

    this.clockAppearance = new CGFappearance(scene);

    this.clockFaceAppearance = new CGFappearance(scene);
    this.clockFaceAppearance.loadTexture("../resources/images/clock.png");
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function()
{
    this.scene.pushMatrix();
    this.scene.scale(1,1,0.25);

    this.clockAppearance.apply();
    this.clockBase.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.125);

    this.clockFaceAppearance.apply();
    this.clockFace.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,0.125);

    this.hoursHand.display();
    this.minutesHand.display();
    this.secondsHand.display();
    this.scene.popMatrix();
};

MyClock.prototype.update = function(currTime){
    // 360   -   24*60*60*1000
    //  x    -   currTime
    this.hoursHand.setAngle(this.hoursHand.angle + (currTime*360)/(24*60*60*1000));
    // 360   -   60*60*1000
    //  x    -   currTime
    this.minutesHand.setAngle(this.minutesHand.angle + (currTime*360)/(60*60*1000));
    // 360   -   60*1000
    //  x    -   currTime
    this.secondsHand.setAngle(this.secondsHand.angle + (currTime*360)/(60*1000));
};
