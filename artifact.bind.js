/**
 *  Example:
 *
 *  Artifact.bind.click({
 *      'methodName' : function(event, parameter){
 *          // do your stuff here...
 *      }
 *  });
 *
 *
 * <a data-click="methodName:parameter"></a>
 * <a data-clicks="{methodName:'parameter',methodName2:'parameter'}"></a>
 *
 */

Artifact.bind = (function (_window) {
	'use strict';

	var exports = {},

		eventMap = {},
		events = [
			['click', 'clicks'],
			['change', 'changes'],
			['blur', 'blurs'],
			['focus', 'focuses']
		];

	function init() {
		initBindings();
	}

	function initBindings() {
		var i = 0;

		for (i = 0; i < events.length; i++) {
			createBind(events[i]);
			$body.on(events[i], '[data-' + events[i] + ']', callEvent(events[i]));
		}

	}

	function callEvent(eventName) {
		return function (event) {
			var $this = $(this),
				binderAttributes = $this.attr('data-' + eventName).split(';'),
				i,
				methodName,
				methodArgument;

			for (i = 0; i < binderAttributes.length; i++) {
				methodName = binderAttributes[i].split(':')[0];
				methodArgument = binderAttributes[i].substr(methodName.length + 1);
				if (eventMap.hasOwnProperty(eventName)) {
					if (eventMap[eventName].hasOwnProperty(methodName)) {
						eventMap[eventName][methodName](event, methodArgument);
					}
				}
			}
		};
	}

	function createBind(eventName) {
		exports[eventName] = function (map) {
			var key,
				mapObject = {};

			if (arguments.length === 1) {
				// case: Artifact.bind.click({'methodName', callback});
				mapObject = arguments[0];
			} else {
				// case: Artifact.bind.click('methodName', callback);
				mapObject[arguments[0]] = arguments[1];
			}

			eventMap[eventName] = eventMap[eventName] || {};
			for (key in mapObject) {
				if (mapObject.hasOwnProperty(key)) {
					eventMap[eventName][key] = mapObject[key];
				}

			}

		};

	}

	exports.init = init;
	return exports;

})(window);