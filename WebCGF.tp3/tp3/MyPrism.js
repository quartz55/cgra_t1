/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
	  CGFobject.call(this,scene);

	  this.slices=slices;
	  this.stacks=stacks;

 	  this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    // this.normals = [];

    const angle = 2*3.14/this.slices; /* 2*PI/nSlices */

    for(i = 0; i < 2*this.slices; i++){
        this.vertices.push(Math.cos(i*angle));
        this.vertices.push(Math.sin(i*angle));
        this.vertices.push(0.5);

        this.vertices.push(Math.cos(i*angle));
        this.vertices.push(Math.sin(i*angle));
        this.vertices.push(-0.5);

        // normAngle = i*angle+angle/2;
        // this.normals.push(Math.cos(normAngle));
        // this.normals.push(Math.sin(normAngle));
        // this.normals.push(0);

        // this.normals.push(Math.cos(normAngle));
        // this.normals.push(Math.sin(normAngle));
        // this.normals.push(0);
    }

    for(i = 0; i < this.slices; i++){
        v = i*2;

        this.indices.push(v);
        this.indices.push(v+1);
        this.indices.push(v+2);

        this.indices.push(v+2);
        this.indices.push(v+1);
        this.indices.push(v+3);
    }

 	  this.primitiveType = this.scene.gl.TRIANGLES;
 	  this.initGLBuffers();
};
