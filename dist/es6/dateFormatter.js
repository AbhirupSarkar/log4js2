/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dateFormat = dateFormat;
/**
 * log4js <https://github.com/anigenero/log4js2>
 *
 * Copyright 2016-present Robin Schultz <http://anigenero.com>
 * Released under the MIT License
 */

let i18n = {
	'd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'm': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

const TOKEN = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsAa])\1?|[LloSZ]|'[^']*'|'[^']*'/g;
const TIMEZONE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
const TIMEZONE_CLIP = /[^-+\dA-Z]/g;

/**
 * Predefined DATE formats (specified by logj2)
 * @private
 * @type {{DEFAULT: string, ABSOLUTE: string, COMPACT: string, DATE: string, ISO8601: string, ISO8601_BASIC: string}}
 */
const _PREDEFINED = {
	'DEFAULT': 'yyyy-MM-dd HH:mm:ss,S',
	'ABSOLUTE': 'HH:MM:ss,S',
	'COMPACT': 'yyyyMMddHHmmssS',
	'DATE': 'dd MMM yyyy HH:mm:ss,S',
	'ISO8601': 'yyyy-MM-ddTHH:mm:ss,S',
	'ISO8601_BASIC': 'yyyyMMddTHHmmss,S'
};

/**
 * Pads numbers in the date format
 *
 * @param value
 * @param length
 *
 * @returns {?string}
 */
function pad(value, length) {

	value = String(value);
	length = length || 2;

	while (value.length < length) {
		value = '0' + value;
	}

	return value;
}

/**
 * Formats the date
 * @param date
 * @param mask
 * @returns {string}
 */
function dateFormat(date, mask) {

	if (_PREDEFINED[mask]) {
		mask = _PREDEFINED[mask];
	} else {
		mask = String(mask || _PREDEFINED.DEFAULT);
	}

	// check if the date format is set for UTC
	let isUTC = mask.slice(0, 4) == 'UTC:';
	if (isUTC) {
		mask = mask.slice(4);
	}

	let prefix = isUTC ? 'getUTC' : 'get';
	let day = date[prefix + 'Day']();
	let month = date[prefix + 'Month']();
	let fullYear = date[prefix + 'FullYear']();
	let hours = date[prefix + 'Hours']();
	let minutes = date[prefix + 'Minutes']();
	let seconds = date[prefix + 'Seconds']();
	let milliseconds = date[prefix + 'Milliseconds']();
	let offset = isUTC ? 0 : date.getTimezoneOffset();

	let flags = {
		'd': date.getDate(),
		'dd': pad(date.getDate()),
		'ddd': i18n.d[day],
		'dddd': i18n.d[day + 7],
		'M': month + 1,
		'MM': pad(month + 1),
		'MMM': i18n.m[month],
		'MMMM': i18n.m[month + 12],
		'yy': String(fullYear).slice(2),
		'yyyy': fullYear,
		'h': hours % 12 || 12,
		'hh': pad(hours % 12 || 12),
		'H': hours,
		'HH': pad(hours),
		'm': minutes,
		'mm': pad(minutes),
		's': seconds,
		'ss': pad(seconds),
		'S': pad(milliseconds, 1),
		'a': hours < 12 ? 'a' : 'p',
		'aa': hours < 12 ? 'am' : 'pm',
		'A': hours < 12 ? 'A' : 'P',
		'AA': hours < 12 ? 'AM' : 'PM',
		'Z': isUTC ? 'UTC' : (String(date).match(TIMEZONE) || ['']).pop().replace(TIMEZONE_CLIP, ''),
		'o': (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)
	};

	return mask.replace(TOKEN, function ($0) {
		return $0 in flags ? flags[$0] : $0;
	});
}
//# sourceMappingURL=data:application/json;base64,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VCxJQUFtQixFQUFuQixDQUFYLEdBQW9DLEdBQXBDLEdBQTBDLEtBQUssR0FBTCxDQUFTLE1BQVQsSUFBbUIsRUFBbkIsRUFBdUIsQ0FBckUsQ0FBM0I7RUF6QkgsQ0F4QmtDOztBQW9EdEMsUUFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLFVBQVUsRUFBVixFQUFjO0FBQ3hDLFNBQU8sTUFBTSxLQUFOLEdBQWMsTUFBTSxFQUFOLENBQWQsR0FBMEIsRUFBMUIsQ0FEaUM7RUFBZCxDQUEzQixDQXBEc0M7Q0FBaEMiLCJmaWxlIjoiZGF0ZUZvcm1hdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBsb2c0anMgPGh0dHBzOi8vZ2l0aHViLmNvbS9hbmlnZW5lcm8vbG9nNGpzMj5cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCBSb2JpbiBTY2h1bHR6IDxodHRwOi8vYW5pZ2VuZXJvLmNvbT5cclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5cclxubGV0IGkxOG4gPSB7XHJcblx0J2QnIDogWyAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1bmRheScsICdNb25kYXknLFxyXG5cdFx0J1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScgXSxcclxuXHQnbScgOiBbICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXHJcblx0XHQnT2N0JywgJ05vdicsICdEZWMnLCAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXHJcblx0XHQnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInIF1cclxufTtcclxuXHJcbmNvbnN0IFRPS0VOID0gL2R7MSw0fXxNezEsNH18eXkoPzp5eSk/fChbSGhtc0FhXSlcXDE/fFtMbG9TWl18J1teJ10qJ3wnW14nXSonL2c7XHJcbmNvbnN0IFRJTUVaT05FID0gL1xcYig/OltQTUNFQV1bU0RQXVR8KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWV8KD86R01UfFVUQykoPzpbLStdXFxkezR9KT8pXFxiL2c7XHJcbmNvbnN0IFRJTUVaT05FX0NMSVAgPSAvW14tK1xcZEEtWl0vZztcclxuXHJcbi8qKlxyXG4gKiBQcmVkZWZpbmVkIERBVEUgZm9ybWF0cyAoc3BlY2lmaWVkIGJ5IGxvZ2oyKVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7e0RFRkFVTFQ6IHN0cmluZywgQUJTT0xVVEU6IHN0cmluZywgQ09NUEFDVDogc3RyaW5nLCBEQVRFOiBzdHJpbmcsIElTTzg2MDE6IHN0cmluZywgSVNPODYwMV9CQVNJQzogc3RyaW5nfX1cclxuICovXHJcbmNvbnN0IF9QUkVERUZJTkVEID0ge1xyXG4gICAgJ0RFRkFVTFQnIDogJ3l5eXktTU0tZGQgSEg6bW06c3MsUycsXHJcbiAgICAnQUJTT0xVVEUnIDogJ0hIOk1NOnNzLFMnLFxyXG4gICAgJ0NPTVBBQ1QnIDogJ3l5eXlNTWRkSEhtbXNzUycsXHJcbiAgICAnREFURScgOiAnZGQgTU1NIHl5eXkgSEg6bW06c3MsUycsXHJcbiAgICAnSVNPODYwMScgOiAneXl5eS1NTS1kZFRISDptbTpzcyxTJyxcclxuICAgICdJU084NjAxX0JBU0lDJyA6ICd5eXl5TU1kZFRISG1tc3MsUydcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYWRzIG51bWJlcnMgaW4gdGhlIGRhdGUgZm9ybWF0XHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcGFyYW0gbGVuZ3RoXHJcbiAqXHJcbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gcGFkKHZhbHVlLCBsZW5ndGgpIHtcclxuXHJcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XHJcblx0bGVuZ3RoID0gbGVuZ3RoIHx8IDI7XHJcblxyXG4gICAgd2hpbGUgKHZhbHVlLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0dmFsdWUgPSAnMCcgKyB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3JtYXRzIHRoZSBkYXRlXHJcbiAqIEBwYXJhbSBkYXRlXHJcbiAqIEBwYXJhbSBtYXNrXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUZvcm1hdChkYXRlLCBtYXNrKSB7XHJcblxyXG4gICAgaWYgKF9QUkVERUZJTkVEW21hc2tdKSB7XHJcbiAgICAgICAgbWFzayA9IF9QUkVERUZJTkVEW21hc2tdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXNrID0gU3RyaW5nKG1hc2sgfHwgX1BSRURFRklORUQuREVGQVVMVCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgZm9ybWF0IGlzIHNldCBmb3IgVVRDXHJcbiAgICBsZXQgaXNVVEMgPSAobWFzay5zbGljZSgwLCA0KSA9PSAnVVRDOicpO1xyXG5cdGlmIChpc1VUQykge1xyXG5cdFx0bWFzayA9IG1hc2suc2xpY2UoNCk7XHJcblx0fVxyXG5cclxuXHRsZXQgcHJlZml4ID0gaXNVVEMgPyAnZ2V0VVRDJyA6ICdnZXQnO1xyXG5cdGxldCBkYXkgPSBkYXRlW3ByZWZpeCArICdEYXknXSgpO1xyXG5cdGxldCBtb250aCA9IGRhdGVbcHJlZml4ICsgJ01vbnRoJ10oKTtcclxuXHRsZXQgZnVsbFllYXIgPSBkYXRlW3ByZWZpeCArICdGdWxsWWVhciddKCk7XHJcblx0bGV0IGhvdXJzID0gZGF0ZVtwcmVmaXggKyAnSG91cnMnXSgpO1xyXG5cdGxldCBtaW51dGVzID0gZGF0ZVtwcmVmaXggKyAnTWludXRlcyddKCk7XHJcblx0bGV0IHNlY29uZHMgPSBkYXRlW3ByZWZpeCArICdTZWNvbmRzJ10oKTtcclxuXHRsZXQgbWlsbGlzZWNvbmRzID0gZGF0ZVtwcmVmaXggKyAnTWlsbGlzZWNvbmRzJ10oKTtcclxuXHRsZXQgb2Zmc2V0ID0gaXNVVEMgPyAwIDogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG5cclxuXHRsZXQgZmxhZ3MgPSB7XHJcblx0XHQnZCcgOiBkYXRlLmdldERhdGUoKSxcclxuXHRcdCdkZCcgOiBwYWQoZGF0ZS5nZXREYXRlKCkpLFxyXG5cdFx0J2RkZCcgOiBpMThuLmRbZGF5XSxcclxuXHRcdCdkZGRkJyA6IGkxOG4uZFtkYXkgKyA3XSxcclxuXHRcdCdNJyA6IG1vbnRoICsgMSxcclxuXHRcdCdNTScgOiBwYWQobW9udGggKyAxKSxcclxuXHRcdCdNTU0nIDogaTE4bi5tW21vbnRoXSxcclxuXHRcdCdNTU1NJyA6IGkxOG4ubVttb250aCArIDEyXSxcclxuXHRcdCd5eScgOiBTdHJpbmcoZnVsbFllYXIpLnNsaWNlKDIpLFxyXG5cdFx0J3l5eXknIDogZnVsbFllYXIsXHJcblx0XHQnaCcgOiBob3VycyAlIDEyIHx8IDEyLFxyXG5cdFx0J2hoJyA6IHBhZChob3VycyAlIDEyIHx8IDEyKSxcclxuXHRcdCdIJyA6IGhvdXJzLFxyXG5cdFx0J0hIJyA6IHBhZChob3VycyksXHJcblx0XHQnbScgOiBtaW51dGVzLFxyXG5cdFx0J21tJyA6IHBhZChtaW51dGVzKSxcclxuXHRcdCdzJyA6IHNlY29uZHMsXHJcblx0XHQnc3MnIDogcGFkKHNlY29uZHMpLFxyXG5cdFx0J1MnIDogcGFkKG1pbGxpc2Vjb25kcywgMSksXHJcblx0XHQnYScgOiBob3VycyA8IDEyID8gJ2EnIDogJ3AnLFxyXG5cdFx0J2FhJyA6IGhvdXJzIDwgMTIgPyAnYW0nIDogJ3BtJyxcclxuXHRcdCdBJyA6IGhvdXJzIDwgMTIgPyAnQScgOiAnUCcsXHJcblx0XHQnQUEnIDogaG91cnMgPCAxMiA/ICdBTScgOiAnUE0nLFxyXG5cdFx0J1onIDogaXNVVEMgPyAnVVRDJyA6IChTdHJpbmcoZGF0ZSkubWF0Y2goVElNRVpPTkUpIHx8IFsgJycgXSkucG9wKCkucmVwbGFjZShUSU1FWk9ORV9DTElQLCAnJyksXHJcblx0XHQnbycgOiAob2Zmc2V0ID4gMCA/ICctJyA6ICcrJykgKyBwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhvZmZzZXQpIC8gNjApICogMTAwICsgTWF0aC5hYnMob2Zmc2V0KSAlIDYwLCA0KVxyXG5cdH07XHJcblxyXG5cdHJldHVybiBtYXNrLnJlcGxhY2UoVE9LRU4sIGZ1bmN0aW9uICgkMCkge1xyXG5cdFx0cmV0dXJuICQwIGluIGZsYWdzID8gZmxhZ3NbJDBdIDogJDA7XHJcblx0fSk7XHJcblxyXG59XHJcbiJdfQ==