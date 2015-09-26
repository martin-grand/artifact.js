Artifact.template = (function (_window) {
	'use strict';

	var exports = {},
		templates = {},
		engine;

	function init() {
		engine = new _window.ArtifactTemplateEngine();
		exports.addHelper = engine.addHelper;
		exports.addPartial = engine.addPartial;
	}

	function addTemplate(name, source) {
		templates[name] = engine.template(source);
	}

	function get(name) {
		return templates[name];
	}

	function compile(name, context) {
		templates[name](context);
	}

	exports.init = init;
	exports.get = get;
	exports.addTemplate = addTemplate;
	exports.compile = compile;
	return exports;

})(window);
