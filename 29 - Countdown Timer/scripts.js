(function () {
  const timeLeft = document.querySelector(".display__time-left");
  const endTime = document.querySelector(".display__end-time");
  const timers = document.querySelector(".timer__controls");
  const custom = document.querySelector("#custom");
  const stop = document.querySelector("#stop");
  timers.addEventListener("click", selectTimer, { capture: true });
  custom.addEventListener("submit", selectTimer, { capture: true });
  stop.addEventListener("click", stopAll);
  let now, then, timerId;

  function stopAll() {
    clearTimer(timerId);
    return;
  }

  function selectTimer(e) {
    if (e.target.name === "minutes") {
      return;
    } else if (e.target.name === "customForm") {
      e.preventDefault();
      setTimer(e.target.elements[0].value * 60);
      e.target.elements[0].value = "";
    } else {
      setTimer(e.target.dataset.time);
    }
  }

  function timer(seconds) {
    now = Date.now();
    then = now + seconds * 1000;

    const intervalId = setInterval(() => {
      const secondsLeft = (then - Date.now()) / 1000;

      if (Math.floor(secondsLeft) <= 0) {
        clearTimer(timerId);
        timeLeft.textContent = `0:00`;
        endTime.textContent = ``;
      } else {
        const minsRemain = secondsLeft / 60;
        const secondsRemain = secondsLeft % 60;
        const endHours = new Date(then).getHours();
        const endMinutes = new Date(then).getMinutes();

        timeLeft.textContent = `${Math.floor(minsRemain)}:${Math.floor(secondsRemain)}`;
        endTime.textContent = `End Time: ${endHours}:${endMinutes}`;
      }
    }, 1000);
    timerId = intervalId;
    return intervalId;
  }

  function clearTimer(id) {
    clearInterval(id);
    now = 0;
    then = 0;
    endTime.textContent = "";
  }

  function setTimer(seconds) {
    let currentInterval, timerId;
    do {
      clearTimer(timerId);
      timerId = timer(seconds);
      currentInterval = seconds;
    } while (timerId > 0 && currentInterval !== seconds);
  }
})();
