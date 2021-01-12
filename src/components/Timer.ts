import Countdown from './Countdown';

export default class Timer {
  container: HTMLDivElement;
  inputWrapper: HTMLDivElement;
  secondInput: HTMLInputElement;
  startPauseButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  countdown: Countdown | undefined;

  constructor (root: HTMLElement | Element) {
    this.container = document.createElement('div');
    this.inputWrapper = document.createElement('div');
    this.secondInput = document.createElement('input');
    this.secondInput.placeholder = '1 ~ 60 seconds';
    this.secondInput.oninput = (e) => this.maxLengthCheck(e, 2);
    this.startPauseButton = document.createElement('button');
    this.startPauseButton.innerHTML = 'Start';
    this.startPauseButton.disabled = true;
    this.cancelButton = document.createElement('button');
    this.cancelButton.innerHTML = 'Cancel';
    this.cancelButton.disabled = true;

    this.secondInput.addEventListener('input', () => {
      if (this.secondInput.value.length > 0 && Number(this.secondInput.value) > 0) {
        this.startPauseButton.disabled = false;
      } else {
        this.startPauseButton.disabled = true;
      }
    });

    this.startPauseButton.addEventListener('click', (e:Event) => {
      if (this.startPauseButton.innerHTML.trim() === 'Start') {
        this.countdown = new Countdown(root, Number(this.secondInput.value));
        this.secondInput.value = '';
        this.startPauseButton.innerHTML = 'Pause';
        this.cancelButton.disabled = false;
      } else if (this.startPauseButton.innerHTML.trim() === 'Pause') {
        this.countdown?.pause();
        this.startPauseButton.innerHTML = 'Restart';
      } else {
        this.countdown?.restart();
        this.startPauseButton.innerHTML = 'Pause';
      }
    });

    this.cancelButton.addEventListener('click',  () => {
      if (this.countdown) {
        this.countdown.cancel();
        this.cancelButton.disabled = true;
        this.startPauseButton.innerHTML = 'Start';
        this.startPauseButton.disabled = true;
      }
    });

    this.inputWrapper.append(
      this.secondInput,
      this.cancelButton,
      this.startPauseButton,
    );
    root.append(this.container, this.inputWrapper);
  }

  private maxLengthCheck (event:Event, maxLength: number):void {
    const target = (<HTMLInputElement>event.target);
    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
    return;
  }
}