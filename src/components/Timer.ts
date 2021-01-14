import Countdown from './Countdown';

export default class Timer {
  container: HTMLDivElement;
  inputWrapper: HTMLDivElement;
  secondInput: HTMLInputElement;
  minuteInput: HTMLInputElement;
  countdownWrapper: HTMLDivElement;
  buttonWrapper: HTMLDivElement;
  startPauseButton: HTMLButtonElement;
  cancelButton: HTMLButtonElement;
  countdown: Countdown | undefined;

  constructor(root: HTMLElement | Element) {
    this.container = document.createElement('div');
    this.container.className = 'timer-container--et';
    this.inputWrapper = document.createElement('div');
    this.inputWrapper.className = 'input-wrapper';
    this.minuteInput = document.createElement('input');
    this.minuteInput.type = 'number';
    this.minuteInput.placeholder = '1 ~ 59 min';
    this.secondInput = document.createElement('input');
    this.secondInput.type = 'number';
    this.secondInput.placeholder = '1 ~ 59 sec';
    this.countdownWrapper = document.createElement('div');
    this.countdownWrapper.className = 'countdown-wrapper';
    this.countdownWrapper.className = 'hidden--et';
    this.buttonWrapper = document.createElement('div');
    this.buttonWrapper.className = 'button-wrapper';
    this.startPauseButton = document.createElement('button');
    this.startPauseButton.className = 'start';
    this.startPauseButton.innerHTML = 'Start';
    this.startPauseButton.disabled = true;
    this.cancelButton = document.createElement('button');
    this.cancelButton.className = 'cancel';
    this.cancelButton.innerHTML = 'Cancel';
    this.cancelButton.disabled = true;
    const timerDot = document.createElement('span');
    timerDot.innerText = ':';

    /* input event */
    this.minuteInput.addEventListener('input', (e) =>
      this.maxLengthCheck(e, 2)
    );
    this.minuteInput.addEventListener('input', () => this.validateInput(true));
    this.secondInput.addEventListener('input', (e) =>
      this.maxLengthCheck(e, 2)
    );
    this.secondInput.addEventListener('input', () => this.validateInput(false));

    /* button event */
    this.startPauseButton.addEventListener('click', () => {
      if (this.startPauseButton.innerHTML.trim() === 'Start') {
        this.inputWrapper.className = 'input-wrapper hidden--et';
        this.countdownWrapper.className = 'countdown-wrapper';
        this.countdown = new Countdown(
          this.countdownWrapper,
          Number(this.minuteInput.value) * 60 + Number(this.secondInput.value)
        );
        this.clearInputs();
        this.startPauseButton.className = 'pause';
        this.startPauseButton.innerHTML = 'Pause';
        this.cancelButton.disabled = false;
      } else if (this.startPauseButton.innerHTML.trim() === 'Pause') {
        this.countdown?.pause();
        this.startPauseButton.className = 'restart';
        this.startPauseButton.innerHTML = 'Restart';
      } else {
        this.countdown?.restart();
        this.startPauseButton.className = 'pause';
        this.startPauseButton.innerHTML = 'Pause';
      }
    });
    this.cancelButton.addEventListener('click', () => {
      if (this.countdown) {
        this.inputWrapper.className = 'input-wrapper';
        this.countdownWrapper.className = 'hidden--et';
        this.clearInputs();
        this.countdown.cancel();
        this.cancelButton.disabled = true;
        this.startPauseButton.className = 'start';
        this.startPauseButton.innerHTML = 'Start';
        this.startPauseButton.disabled = true;
      }
    });

    /* append */
    this.inputWrapper.append(this.minuteInput, timerDot, this.secondInput);
    this.buttonWrapper.append(this.cancelButton, this.startPauseButton);
    this.container.append(
      this.inputWrapper,
      this.countdownWrapper,
      this.buttonWrapper
    );
    root.append(this.container);
  }

  maxLengthCheck(event: Event, maxLength: number): void {
    const target = <HTMLInputElement>event.target;
    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
    return;
  }

  validateInput(min: boolean): void {
    if (
      min
        ? this.minuteInput.value
        : this.secondInput.value && min
        ? Number(this.minuteInput.value) > 0
        : Number(this.secondInput.value) > 0
    ) {
      this.startPauseButton.disabled = false;
    } else {
      this.startPauseButton.disabled = true;
    }
    if (
      Number(this.minuteInput.value) > 59 ||
      Number(this.secondInput.value) > 59
    ) {
      this.startPauseButton.disabled = true;
    }
  }

  clearInputs(): void {
    this.minuteInput.value = '';
    this.secondInput.value = '';
  }
}
