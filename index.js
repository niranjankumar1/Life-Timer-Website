let isBOBOpen = false
let dbBirth;
const settingIcon = document.getElementById('settingicon')
const settingCon = document.getElementById('settingCon')
const startText = document.getElementById('intial')
const afterText = document.getElementById('after') 
const dobButton = document.getElementById('blbutton')
const dobInput = document.getElementById('dobinput')

const Year = document.getElementById('year');
const Month = document.getElementById('month');
const Day = document.getElementById('day');
const Hour = document.getElementById('hour');
const Minute = document.getElementById('minute');
const Second = document.getElementById('second');

const makeTwoDigit = (number) => {
    return number > 9 ? number : `0${number}`;
}
const toggleDate = () => {
    if(isBOBOpen){
        settingCon.classList.add('hide');
    }else{
        settingCon.classList.remove('hide');
    }
    isBOBOpen = !isBOBOpen;
    console.log("Toggle",isBOBOpen);
};
const updateAge = () =>{
    const newDate = new Date();
    const dateDiff = newDate - dbBirth;
    
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = 60 * millisecondsInSecond;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;

    const year = Math.floor(dateDiff / (365.25 * millisecondsInDay));
    const totalMonths = Math.floor(dateDiff / (30.44 * millisecondsInDay));
    const month = totalMonths % 12;
    const day = Math.floor((dateDiff % (30.44 * millisecondsInDay)) / millisecondsInDay);
    const hour = Math.floor((dateDiff % millisecondsInDay) / millisecondsInHour);
    const minute = Math.floor((dateDiff % millisecondsInHour) / millisecondsInMinute);
    const second = Math.floor((dateDiff % millisecondsInMinute) / millisecondsInSecond);

    Year.innerHTML = makeTwoDigit(year);
    Month.innerHTML = makeTwoDigit(month);
    Day.innerHTML = makeTwoDigit(day);
    Hour.innerHTML = makeTwoDigit(hour);
    Minute.innerHTML = makeTwoDigit(minute);
    Second.innerHTML = makeTwoDigit(second);
}; 
const localStorageGetter = () =>{
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    if(year && month && date){
        dbBirth = new Date(year, month, date);
    }
    updateAge();
}
const contentToggler = () =>{
    updateAge();
    if(dbBirth){
        startText.classList.add('hide');
        afterText.classList.remove('hide');
    }
    else{
        afterText.classList.add('hide');
        startText.classList.remove('hide');
    }
};
const dobHandle = () => {
    const dataString = dobInput.value;
    dbBirth = dataString ? new Date(dataString) : null;

    if(dbBirth){
        localStorage.setItem("year", dbBirth.getFullYear());
        localStorage.setItem("month",dbBirth.getMonth());
        localStorage.setItem("date",dbBirth.getDate());
    }
    contentToggler();
    setInterval(() => updateAge(), 1000);
};
localStorageGetter();
contentToggler();
settingIcon.addEventListener('click',toggleDate);
dobButton.addEventListener('click',dobHandle);
