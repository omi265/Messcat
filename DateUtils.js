module.exports = class DateUtils {
	static dateWithTimeZone (date, offsetHours) {
		if (-(offsetHours*60) === date.getTimezoneOffset()) {
			return date
		}
		return this.offsetting(date, offsetHours)
	}
	static dateFromISO8601(isostr) {
    	var parts = isostr.match(/\d+/g)
    	return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5])
	}
	static offsetting(date, offsetHours) {
		if (!offsetHours) {
			offsetHours = 0
		}
    	const time = date.getTime() + offsetHours * 60 * 60 * 1000
    	return new Date(time)
	}
	static dateString(date, offsetHours) {
		return this.offsetting(date, offsetHours).toString().slice(4,15)
	}
	static dateTimeString(date, offsetHours) {
		return this.offsetting(date, offsetHours).toString().slice(4,21)
	}
	static dateStringIST (date) {
		return this.dateString(date, 5.5)
	}
	/**
	 * Returns the week number for this date.  dowOffset is the day of week the week
	 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
	 * the week returned is the ISO 8601 week number.
	 * @param int dowOffset
	 * @return int
	 */
	static weekOfYear (date, dowOffset=0) {
		/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
	    
	    var newYear = new Date(date.getFullYear(),0,1);
	    
	    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	    day = (day >= 0 ? day : day + 7);
	    
	    var daynum = Math.floor((date.getTime() - newYear.getTime() - 
	    
	    (date.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	    var weeknum;
	    //if the year starts before the middle of a week
	    if(day < 4) {
	        weeknum = Math.floor((daynum+day-1)/7) + 1;
	        if(weeknum > 52) {
	            nYear = new Date(date.getFullYear() + 1,0,1);
	            nday = nYear.getDay() - dowOffset;
	            nday = nday >= 0 ? nday : nday + 7;
	            /*if the next year starts before the middle of
	              the week, it is week #1 of that year*/
	            weeknum = nday < 4 ? 1 : 53;
	        }
	    } else {
	        weeknum = Math.floor((daynum+day-1)/7);
	    }
	    return weeknum;
	}
	
}