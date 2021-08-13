
const refs = {
    dateEl: document.querySelector('[data-value="days"]'),
    hoursEl: document.querySelector('[data-value="hours"]'),
    minsEl: document.querySelector('[data-value="mins"]'),
    secsEl: document.querySelector('[data-value="secs"]')
}

class CountdownTimer {
    constructor({onTick, selector, targetDate}) {
        this.targetDate = targetDate;
        this.intervalId = targetDate;
        this.onTick = updateClockface;
        this.updateClockface = updateClockface;
        this.selector = selector;
    };


    start() {
        const startTime = this.targetDate.getTime();

        this.intervalId = setInterval(() => { 
            const currentTime = Date.now();
            if(startTime < currentTime) {
                alert('Недопустимое значение: дата уже наступила');
            }
            const deltaTime =startTime - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time);
        }, 1000);
        
    }

    getTimeComponents(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours =this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
      return {days, hours, mins, secs};
    }

    pad(value) {
        return String(value).padStart(2, '0')
       };
   
}

function updateClockface ({days, hours, mins, secs}) {
    refs.dateEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minsEl.textContent =`${mins}`;
    refs.secsEl.textContent = `${secs}`;
    return {days, hours, mins, secs}
   }    



const timer1 = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Aug 01, 2021'),
    onTick: updateClockface,
});


document.addEventListener('DOMContentLoaded', timer1.start.bind(timer1));

