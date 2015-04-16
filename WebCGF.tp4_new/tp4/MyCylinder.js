/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
	  CGFobject.call(this,scene);

	  this.slices=slices;
	  this.stacks=stacks;

 	  this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function()
{
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    const angle = (2*Math.PI)/this.slices; /* 2*PI/nSlices */
    numVertices = this.slices*2;

    Z = 0.5;
    currentIndex = 0;
    maxIndex = 0;

    for(s = 0; s < this.stacks; s++, currentIndex=s*numVertices)
    {
        for(i = 0; i < this.slices; i++, maxIndex+=2)
        {
            this.vertices.push(Math.cos(i*angle));
            this.vertices.push(Math.sin(i*angle));
            this.vertices.push(Z);

            this.normals.push(Math.cos(i*angle));
            this.normals.push(Math.sin(i*angle));
            this.normals.push(0);


            this.vertices.push(Math.cos(i*angle));
            this.vertices.push(Math.sin(i*angle));
            this.vertices.push(Z-1.0/this.stacks);

            this.normals.push(Math.cos(i*angle));
            this.normals.push(Math.sin(i*angle));
            this.normals.push(0);
        }

        for(i = 0; i < this.slices-1; i++, currentIndex+=2)
        {
            this.indices.push(currentIndex);
            this.indices.push(currentIndex+1);
            this.indices.push(currentIndex+2);

            this.indices.push(currentIndex+2);
            this.indices.push(currentIndex+1);
            this.indices.push(currentIndex+3);
        }

        /*
         Last slice (with vertices from the first)
         */
        this.indices.push(currentIndex);
        this.indices.push(currentIndex+1);
        this.indices.push(s*numVertices);

        this.indices.push(s*numVertices);
        this.indices.push(currentIndex+1);
        this.indices.push(s*numVertices+1);

        Z-=1.0/this.stacks;
    }

 	  this.primitiveType = this.scene.gl.TRIANGLES;
 	  this.initGLBuffers();
};
