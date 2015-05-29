/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
	  //call CGFinterface constructor
	  CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	  // call CGFinterface init
	  CGFinterface.prototype.init.call(this, application);

	  // init GUI. For more information on the methods, check:
	  //  http://workshop.chromeexperiments.com/examples/gui

	  this.gui = new dat.GUI();

    this.gui.add(this.scene, 'Clock');

    this.gui.add(this.scene, 'currRobotAppearance', this.scene.robotAppearancesList);

	  var group=this.gui.addFolder("Luzes");
	  group.open();

	  group.add(this.scene, 'lightSwitch0');
	  group.add(this.scene, 'lightSwitch1');
	  group.add(this.scene, 'lightSwitch2');
	  group.add(this.scene, 'lightSwitch3');


	  return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	  CGFinterface.prototype.processKeyboard.call(this,event);

    if(event.keyCode == 111)
        this.scene.robot.startWaving();
};

MyInterface.prototype.processKeyDown = function(event) {
	  CGFinterface.prototype.processKeyDown.call(this,event);

		if(event.keyCode == 'A'.charCodeAt(0)) {
        this.scene.KEY_A = true;
    }
    else if(event.keyCode == 'D'.charCodeAt(0)) {
        this.scene.KEY_D = true;
    }

    if(event.keyCode == 'W'.charCodeAt(0)) {
        this.scene.KEY_W = true;
    }
    else if(event.keyCode == 'S'.charCodeAt(0)) {
        this.scene.KEY_S = true;
    }

};

MyInterface.prototype.processKeyUp = function(event) {
	  CGFinterface.prototype.processKeyUp.call(this,event);

		if(event.keyCode == 'A'.charCodeAt(0)) {
        this.scene.KEY_A = false;
    }
    if(event.keyCode == 'D'.charCodeAt(0)) {
        this.scene.KEY_D = false;
    }

    if(event.keyCode == 'W'.charCodeAt(0)) {
        this.scene.KEY_W = false;
    }
    if(event.keyCode == 'S'.charCodeAt(0)) {
        this.scene.KEY_S = false;
    }

};
