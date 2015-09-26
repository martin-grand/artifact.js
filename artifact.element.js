Artifact.element = (function (_window) {
	'use strict';

	var exports = {};

	function init() {
		_window.$element = $element;
	}

	function $element(name, $wrapper) {
		return ($wrapper || _window.$body).find('[data-element~="' + name + '"]');
	}

	exports.init = init;
	return exports;

})(window);
