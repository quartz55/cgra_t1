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

	  // add a group of controls (and open/expand by defult)

	  var group=this.gui.addFolder("Luzes");
	  group.open();

	  group.add(this.scene, 'lightSwitch0');
	  group.add(this.scene, 'lightSwitch1');
	  group.add(this.scene, 'lightSwitch2');
	  group.add(this.scene, 'lightSwitch3');

    this.gui.add(this.scene, 'Clock');

	  return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	  // call CGFinterface default code (omit if you want to override)
	  CGFinterface.prototype.processKeyboard.call(this,event);

	  // Check key codes e.g. here: http://www.asciitable.com/
	  // or use String.fromCharCode(event.keyCode) to compare chars

	  // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
		if(event.keyCode == 97) // a
    {
        this.scene.robot.rotLeft();
    }
    else if(event.keyCode == 100)
    {
        this.scene.robot.rotRight();
    }

    if(event.keyCode == 119)
    {
        this.scene.robot.speed += 0.1;
    }
    else if(event.keyCode == 115)
    {
        this.scene.robot.speed -= 0.1;
    }
};
