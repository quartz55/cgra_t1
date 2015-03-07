/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	  CGFobject.call(this,scene);

	  this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	  this.vertices = [
            -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,

            -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5
		];

	  this.indices = [
        0,1,2,
        3,2,1,
        1,5,3,
        7,3,5,
        1,4,5,
        0,4,1,
        2,3,6,
        3,7,6,
        0,2,6,
        6,4,0,
        4,6,7,
        7,5,4
    ];

	  this.primitiveType=this.scene.gl.TRIANGLES;
	  this.initGLBuffers();
};
