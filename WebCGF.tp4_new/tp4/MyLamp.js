/**
 * MyLamp
 * @constructor
 */
function MyLamp(scene) {
	  CGFobject.call(this,scene);

 	  this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function()
{
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    const radius = 1;
    const rings = 12;
    const sectors = 24;

    const R = 1.0/(rings-1);
    const S = 1.0/(sectors-1);

    for(r = 0; r < rings; r++)
    {
        for(s = 0; s < sectors; s++)
        {
            const y = Math.sin(-Math.PI/2 + Math.PI * r * R);
            const x = Math.cos(2*Math.PI * s * S) * Math.sin(Math.PI * r * R);
            const z = Math.sin(2*Math.PI * s * S) * Math.sin(Math.PI * r * R);

            this.vertices.push(x*radius);
            this.vertices.push(y*radius);
            this.vertices.push(z*radius);

            this.normals.push(x);
            this.normals.push(y);
            this.normals.push(z);

            this.indices.push(r*sectors+s);
            this.indices.push((r+1)*sectors+s);
            this.indices.push((r+1)*sectors+(s+1));

            this.indices.push(r*sectors+s);
            this.indices.push((r+1)*sectors+(s+1));
            this.indices.push(r*sectors+(s+1));
        }
    }

 	  this.primitiveType = this.scene.gl.TRIANGLES;
 	  this.initGLBuffers();
};
