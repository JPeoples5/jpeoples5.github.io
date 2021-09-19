//Global Elements
const editTimeWrapper = document.querySelector(".edit-time-wrapper")
const countdownTimeWrapper = document.querySelector(".countdown-time-wrapper")
const editBtn = document.querySelector(".edit-btn")
const playIcon = document.querySelector('.fa-play')
const pauseIcon = document.querySelector('.fa-pause')

//Global Variables
let isPaused = false

let countdownTime = document.querySelector("#countdown-time")
let minutesVal = 35
let secondsVal = 00

let subtractSecond
let lastSetTime = `${minutesVal} : ${secondsVal}`

//Logic
function displayEditTimer() {
    //stop timer
    clearInterval(subtractSecond)

    if (isHidden(playIcon)) {
        displayElement(hide, pauseIcon)
        displayElement(show, playIcon)
    }

    displayElement(hide, countdownTimeWrapper)
    displayElement(show, editTimeWrapper)
    displayElement(hide, editBtn)
}

// save inputed time 0-999 to the countDownTime
function setTimer() {
    minutesVal = document.querySelector("#number-input").value
    secondsVal = "00" // needs to be string to keep the double 0s
    lastSetTime = countdownTime.innerHTML = `${minutesVal} : ${secondsVal}`

    displayElement(hide, editTimeWrapper)
    displayElement(show, countdownTimeWrapper)
}

function clearSetNumber() {
    document.querySelector("#number-input").value = ""
}

// Timer logic
function startTimer() {
    isPaused = false
    togglePlayPauseIcon()

    // call secondsCountdown every 1s
    subtractSecond = setInterval(secondsCountdown, 1000)

    function secondsCountdown() {
        if (!isPaused) {
            secondsVal--

            //decrease minute, reset secs to 59
            if (secondsVal = 0) {
                secondsVal = 59
                minutesVal--
            }

            //example => `12 : 09`
            secondsVal < 10 ? secondsVal = "0" + secondsVal : null
            // Countdown is finished
            minutesVal < 0 ? breakTime() : countdownTime.innerHTML = `${minutesVal} : ${secondsVal}`
        }
    }
}

function pauseTimer() {
    togglePlayPauseIcon()
    isPaused = true
    clearInterval(subtractSecond)
}

//Reset the countdown Time to the lastSetTime
function resetTimer() {
    displayElement(hide, pauseIcon)
    displayElement(show, playIcon)

    clearInterval(subtractSecond)

    minutesVal = lastSetTime.split(" ")[0]
    secondsVal = "00"

    lastSetTime = `${minutesVal} : ${secondsVal}`

    countdownTime.innerHTML = lastSetTime
}

function breakTime() {
    countdownTime.innerHTML = "Break"
    pauseTimer()
    playFinishedAudio()
}

// TODO: find a bunch of the office quotes and randomize them
function playFinishedAudio() {
    // audioArr =[]
    var audio = new Audio('/assets/ding-sound.mp3');
    audio.play();
}

function showEditBtn() {
    !isHidden(countdownTimeWrapper) && isHidden(editBtn) ? displayElement(show, editBtn) : null
}

function hideEditBtn() {
    !isHidden(countdownTimeWrapper) && !isHidden(editBtn) ? displayElement(hide, editBtn) : null
}

// ################# helper funtions #################
function isHidden(element) {
    if (element.classList.contains("hidden")) {
        return true
    } else return false
}

const hide = 'hide'
const show = 'show'
function displayElement(displayAction, element) {
    displayAction === 'show' ? element.classList.remove("hidden") : null
    displayAction === 'hide' ? element.classList.add("hidden") : null
}

function togglePlayPauseIcon() {
    if (editTimeWrapper.classList.contains("hidden")) {

        if (isHidden(pauseIcon)) {
            displayElement(hide, playIcon)
            displayElement(show, pauseIcon)
        } else {
            displayElement(hide, pauseIcon)
            displayElement(show, playIcon)
        }

    }
}
// ################# helper functions #################
