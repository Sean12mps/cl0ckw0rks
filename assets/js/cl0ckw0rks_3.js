'use strict';

// 	Helper Functions
var isEmpty = function ( obj ) {
    for( var prop in obj ) {
        if( obj.hasOwnProperty( prop ) )
            return false;
    }
    return true;
};

var getKeys = function( obj ) {
   var keys = [];
   for( var key in obj ){
      keys.push( key );
   }
   return keys;
}

var Clockworks = function () {

	var self = this;

	self.nodes = {
		'init' : {
			func : []
		}
	};

	self.addNode = function ( nodeName, nodePriority ) {

		self.nodes[nodeName] = { func : [] };
	};

	self.addFunction = function ( nodeName, func, funcPriority ) {

		self.nodes[nodeName].func.splice( funcPriority, 0, func );
	};
};

/* 	@param: bodyClass ( array )
 *			func ( function )
 *
 *	Check bodyClass to css classes in body element, 
 *	if all bodyClass array matched, return func as 
 *	function with jQuery support.
 */
Clockworks.prototype.initialize = function( bodyClass, func ) {

	var check = [];

	for ( var i = 0; i < bodyClass.length; i++ ) {

		if ( jQuery( 'body' ).hasClass( bodyClass[i] ) ) {

			check.push( true );
		}
	}

	if ( bodyClass.length === check.length ) {

		func( jQuery );
	}
};

Clockworks.prototype.run = function() {

	var self = this;

	for ( var name in self.nodes ) {

		var temp_func = self.nodes[name].func;
		
		for ( var i = 0; i < temp_func.length; i++ ) {

			var func = window[temp_func[i]];

			func( jQuery );
		}
	}
}
