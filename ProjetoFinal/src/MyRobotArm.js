/**
 * MyRobotArm
 * @constructor
 */
function MyRobotArm(scene, armSize, armFat){
	  CGFobject.call(this,scene);

    this.armSize = armSize || 1;
    this.armFat = armFat || 1;

    this.fullCylinder = new MyFullCylinder(scene, 12);
    this.fullCylinder.initBuffers();

    this.rotation = 0;
    this.rotForward = true;

    this.waveSpeed = 0.05;
    this.waveRot = 0;
    this.waving = false;
    this.waveDir = 1;
    this.waveCounter = 0;

};

MyRobotArm.prototype = Object.create(CGFobject.prototype);
MyRobotArm.prototype.constructor = MyRobotArm;

MyRobotArm.prototype.display = function()
{
    this.scene.pushMatrix();


    this.scene.translate(-this.armFat/2, -this.armFat/2, -this.armSize/2);

    if (this.waving){
        this.wave();
        this.scene.rotate(this.waveRot, 1, 0, 0);
    }
    else this.scene.rotate(this.rotation, 1, 0, 0);

    this.scene.translate(this.armFat/2, this.armFat/2, this.armSize/2);
    this.scene.scale(this.armFat, this.armFat, this.armSize);

    this.fullCylinder.display();

    this.scene.popMatrix();
};

MyRobotArm.prototype.addRot = function(value)
{
    if (Math.abs(value) <= 0.001)
    {
        this.rotation += (0-this.rotation)/20;
        return;
    }

    value = Math.abs(value);

    if (this.rotForward)
    {
        this.rotation += value;
        if (this.rotation >= Math.PI/4)
        {
            this.rotation = Math.PI/4;
            this.rotForward = false;
        }
    }
    else
    {
        this.rotation -= value;
        if (this.rotation <= -Math.PI/4)
        {
            this.rotation = -Math.PI/4;
            this.rotForward = true;
        }
    }
};

MyRobotArm.prototype.startWaving = function()
{
    if (!this.waving)
    {
        this.waveRot = this.rotation;
        this.waving = true;
        this.waveCounter = 0;
        this.waveDir = 0;
    }
};

MyRobotArm.prototype.wave = function()
{
    if (this.waveCounter < 3)
    {
        this.waving = true;
        if (this.waveDir == 0)
        {
            this.waveRot -= this.waveSpeed;
            if (this.waveRot <= -Math.PI-Math.PI/6)
                this.waveDir = 1;
        }
        else if (this.waveDir == 1)
        {
            this.waveRot += this.waveSpeed;
            if (this.waveRot >= -Math.PI+Math.PI/6){
                this.waveDir = 0;
                ++this.waveCounter;
            }
        }
    }
    else
    {
        if (Math.abs(this.waveRot - this.rotation) > 0.1)
        {
            this.waveRot += this.waveSpeed;
            return;
        }
        this.waveCounter = 0;
        this.waving = false;
    }
};
