export default class Countdown {
  endTime: number;
  msCount: number;
  seconds: HTMLDivElement;
  intervalRef: NodeJS.Timeout;

  constructor(root:HTMLElement | Element, endTime: number) {
    this.endTime = new Date(new Date().getTime() + endTime * 1000).getTime();
    this.msCount = 0;
    this.seconds = document.createElement('div');
    this.seconds.className = 'seconds';
    this.intervalRef = setInterval(() => this.countdownInterval(), 10);

    root.append(this.seconds);
  }

  pause(): void {
    clearInterval(this.intervalRef);
  }

  restart(): void {
    this.endTime = new Date(new Date().getTime() + this.msCount).getTime();
    this.intervalRef = setInterval(() => this.countdownInterval(), 10);
  }

  cancel(): void {
    clearInterval(this.intervalRef);
    console.log(this.intervalRef);
    this.seconds.remove();
  }

  countdownInterval(): void {
    const currentTime = new Date().getTime();
    this.msCount = this.endTime - currentTime
    const s = Math.ceil((this.msCount / 1000));
    this.seconds.innerText = `${s} sec`;
    if (s === 0) {
      clearInterval(this.intervalRef);
    }
  }
}