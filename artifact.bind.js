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
 * <a data-click="{methodName:'parameter',methodName2:'parameter'}"></a>
 *
 */

Artifact.bind = (function (_window) {
	'use strict';

	var exports = {},

		eventMap = {},
		events = ['click', 'change', 'blur', 'focus'];

	function init() {
		for (var i = 0; i < events.length; i++) {
			createBind(events[i]);
			$body.on(events[i], '[data-' + events[i] + ']', callEvent(events[i]));
		}

	}

	function callEvent(eventName) {
		return function (event) {
			var $this = $(this),
				binderString = $this.attr('data-' + eventName),
				binders = {},
				methodName;

			if (!eventMap.hasOwnProperty(eventName)) {
				console.error('eventMap not set:', eventName);
				return false;
			}

			if (binderString.charAt(0) === '{') {
				// case: <a data-click="{methodName:'parameter',methodName2:'parameter'}"></a>
				try {
					binders = _window.eval(binderString);
				} catch (e) {
					console.error('invalid binder string:', binderString, this);
					return false;
				}

			} else {
				methodName = binderString.split(':')[0];
				binders[methodName] = binderString.replace(methodName, '');
			}

			for (methodName in binders) {
				if (binders.hasOwnProperty(methodName) &&
					eventMap[eventName].hasOwnProperty(methodName)) {
					eventMap[eventName][methodName](event, binders[methodName]);
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
