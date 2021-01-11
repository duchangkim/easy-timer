export default class Countdown {
  endTime: number;
  seconds: HTMLDivElement;
  intervalRef: NodeJS.Timeout;

  constructor(root:HTMLElement | Element, endTime: number) {
    this.endTime = new Date(new Date().getTime() + endTime * 1000).getTime();
    this.seconds = document.createElement('div');
    this.seconds.className = 'seconds';

    this.intervalRef = setInterval(() => {
      const currentTime = new Date().getTime();
      const count = this.endTime - currentTime

      const s = Math.ceil((count / 1000));
      // console.log('intervaling...')
      this.seconds.innerText = `${s} sec`;
      if (s === 0) {
        clearInterval(this.intervalRef);
      }
    }, 10);

    root.append(this.seconds);
  }

  pause() {

  }
  cancel() {
    clearInterval(this.intervalRef);
    this.seconds.remove();
  }
}