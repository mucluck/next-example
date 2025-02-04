// module.exports = convert;
// module.exports.toDate = convertToDate;

// module.exports.toJulianDay = toJulianDay;
// module.exports.toMillisecondsInJulianDay = toMillisecondsInJulianDay;
// module.exports.fromJulianDayAndMilliseconds = fromJulianDayAndMilliseconds;

var DAY = 86400000;
var HALF_DAY = DAY / 2;
var UNIX_EPOCH_JULIAN_DATE = 2440587.5;
var UNIX_EPOCH_JULIAN_DAY = 2440587;

function convert(date: Date) {
	return (toJulianDay(date) + toMillisecondsInJulianDay(date) / DAY).toFixed(6);
}

function convertToDate(julian: number) {
	return new Date((Number(julian) - UNIX_EPOCH_JULIAN_DATE) * DAY);
}

function toJulianDay(date: Date) {
	return ~~((+date + HALF_DAY) / DAY) + UNIX_EPOCH_JULIAN_DAY;
}

function toMillisecondsInJulianDay(date: Date) {
	return (+date + HALF_DAY) % DAY;
}

function fromJulianDayAndMilliseconds(day: number, ms: number) {
	return (day - UNIX_EPOCH_JULIAN_DATE) * DAY + ms;
}

export default convert;

export { convertToDate, toJulianDay };
