export default class Countdown {
  endTime: number;
  msCount: number;
  minutes: HTMLDivElement;
  seconds: HTMLDivElement;
  intervalRef: NodeJS.Timeout;

  constructor(root:HTMLElement | Element, endTime: number) {
    this.endTime = new Date(new Date().getTime() + endTime * 1000).getTime();
    this.msCount = 0;
    this.minutes = document.createElement('div');
    this.minutes.className = 'minutes';
    this.seconds = document.createElement('div');
    this.seconds.className = 'seconds';
    this.intervalRef = setInterval(() => this.countdownInterval(), 10);

    root.append(
      this.minutes,
      this.seconds,
    );
  }

  pause(): void {
    console.log(this.msCount)
    clearInterval(this.intervalRef);
  }

  restart(): void {
    this.endTime = new Date(new Date().getTime() + this.msCount).getTime();
    this.intervalRef = setInterval(() => this.countdownInterval(), 10);
  }

  cancel(): void {
    clearInterval(this.intervalRef);
    this.minutes.remove();
    this.seconds.remove();
  }

  countdownInterval(): void {
    const currentTime = new Date().getTime();
    this.msCount = this.endTime - currentTime;
    const s = Math.ceil((this.msCount / 1000) % 60) === 60 ? 0 : Math.ceil((this.msCount / 1000) % 60);
    const m = s === 0 ? Math.ceil((this.msCount / (1000 * 60))) : Math.floor((this.msCount / (1000 * 60)));

    this.minutes.innerText = `${m} min`;
    this.seconds.innerText = `${s} sec`;
    if (this.msCount === 0) {
      clearInterval(this.intervalRef);
    }
  }
}