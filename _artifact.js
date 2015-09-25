var Artifact = {};

(function (_window, $) {
	'use strict';

	function constructor() {
		if (!$) {
			// TODO: remove jQuery dependencies
			console.error('Please include jquery! Artifact need it.');
			return false;
		}

		setUpDomElements();
		_window.$document.on('ready', init);

	}

	function init() {
		var module;

		for (module in Artifact) {
			if (Artifact.hasOwnProperty(module) && Artifact[module].hasOwnProperty('init')) {
				Artifact[module].init();
			}

		}

	}

	function setUpDomElements() {
		_window.$window = $(window);
		_window.$document = $(document);
		_window.$body = $(document.body);
	}

	// call constructor immediately:
	constructor();

})(window, window.jQuery);
