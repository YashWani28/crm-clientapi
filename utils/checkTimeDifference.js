function isWithinTimeDifferenceT(dateStr1, dateStr2,t) {
    // Convert the date strings to Date objects
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
  
    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(date2 - date1);
  
    // Convert the time difference to minutes
    const differenceInMinutes = timeDifference / (1000 * 60);
  
    // Check if the difference is less than or equal to 10 minutes
    return differenceInMinutes <= t;
  }

module.exports = isWithinTimeDifferenceT;