export default class TimeCalculation {
  timer: HTMLDivElement;
  intervalRef: null | NodeJS.Timeout;
  start: Date;
  // end: Date;

  constructor(
    timer: HTMLDivElement,
    ) {
    this.timer = timer;
    this.intervalRef = null;
    this.start = new Date();
    // this.end = new Date();
  }

  startTimer() {
    this.start = new Date(Date.now() + 60000 * 0.1);
    // this.end = new Date();
    this.intervalRef = setInterval(() => {
      const current = new Date();
      const count = +this.start - +current;

      const m = Math.floor((count / 60000) % 60);
      const s = Math.floor((count / 1000) % 60);
      const ms = count % 1000;

      this.timer.innerHTML = `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}.${ms}`;
    }, 10);
  }

  stopTimer() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  cancelTimer() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);

    }
  }
}