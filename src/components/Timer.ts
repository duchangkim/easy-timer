import Countdown from './Countdown';

export default class Timer {
  container: HTMLDivElement;
  inputWrapper: HTMLDivElement;
  secondInput: HTMLInputElement;
  minuteInput: HTMLInputElement;
  startPauseButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  countdown: Countdown | undefined;

  constructor (root: HTMLElement | Element) {
    this.container = document.createElement('div');
    this.inputWrapper = document.createElement('div');
    this.minuteInput = document.createElement('input');
    this.minuteInput.type = 'number';
    this.minuteInput.placeholder = '1 ~ 59 minutes';
    this.secondInput = document.createElement('input');
    this.secondInput.type = 'number';
    this.secondInput.placeholder = '1 ~ 59 seconds';
    this.startPauseButton = document.createElement('button');
    this.startPauseButton.innerHTML = 'Start';
    this.startPauseButton.disabled = true;
    this.cancelButton = document.createElement('button');
    this.cancelButton.innerHTML = 'Cancel';
    this.cancelButton.disabled = true;

    /* input event */
    this.minuteInput.addEventListener('input', (e) => this.maxLengthCheck(e, 2));
    this.minuteInput.addEventListener('input', () => this.validateInput(true));
    this.secondInput.addEventListener('input', (e) => this.maxLengthCheck(e, 2));
    this.secondInput.addEventListener('input', () => this.validateInput(false));

    /* button event */
    this.startPauseButton.addEventListener('click', () => {
      if (this.startPauseButton.innerHTML.trim() === 'Start') {
        this.countdown = new Countdown(root, (Number(this.minuteInput.value) * 60) + Number(this.secondInput.value));
        this.minuteInput.value = '';
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

    /* append */
    this.inputWrapper.append(
      this.minuteInput,
      this.secondInput,
      this.cancelButton,
      this.startPauseButton,
    );
    root.append(this.container, this.inputWrapper);
  }

  maxLengthCheck (event:Event, maxLength: number):void {
    const target = (<HTMLInputElement>event.target);
    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
    return;
  }

  validateInput(min: boolean):void {
    if (
      min? this.minuteInput.value : this.secondInput.value && 
      min? Number(this.minuteInput.value) > 0 : Number(this.secondInput.value) > 0
    ) {
      this.startPauseButton.disabled = false;
    } else {
      this.startPauseButton.disabled = true;
    }
    if (Number(this.minuteInput.value) > 59 || Number(this.secondInput.value) > 59) {
      this.startPauseButton.disabled = true;
    }
  }
}