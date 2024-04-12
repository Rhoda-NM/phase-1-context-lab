function createEmployeeRecord(dataArray) {
    return {
        firstName: dataArray[0],
        familyName: dataArray[1],
        title: dataArray[2],
        payPerHour: dataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesData) {
    return employeesData.map((employee) => createEmployeeRecord(employee));
}
function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}
function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    if(timeInEvent && timeOutEvent){
        let hrsWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hrsWorked;
    }
}
function wagesEarnedOnDate(date) {
    let payRate = this.payPerHour;
    let pay = hoursWorkedOnDate.call(this, date) * payRate;
    return pay;
}
function findEmployeeByFirstName(employeesArray, firstName) {
    return employeesArray.find(employee => employee.firstName === firstName)
}


function calculatePayroll(employeesRecord) {
    return employeesRecord.reduce((memo, rec) => {
        return memo + allWagesFor.call(rec)
    }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

