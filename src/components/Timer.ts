import TimerCalculation from './TimerCalculation';

export default class Timer {
  constructor(element: HTMLElement | Element) {
    const timerContainer = document.createElement('div');
    const timerSetterWrapper = document.createElement('div');
    const minutesSetInput = document.createElement('input');
    const minutesSpan = document.createElement('span');
    const secondsSetInput = document.createElement('input');
    const secondsSpan = document.createElement('span');
    const buttonWrapper = document.createElement('div');
    const cancelButton = document.createElement('button');
    const startAndPauseButton = document.createElement('button');

    /* Container, Wrapper */
    timerContainer.className = 'timer-container'
    timerSetterWrapper.className = 'timer-setter-wrapper';
    buttonWrapper.className = 'timer-button-wrapper';

    /* timer input */
    minutesSetInput.className = 'minutes-input';
    minutesSetInput.type = 'number';
    minutesSetInput.min = '0';
    minutesSetInput.value = '0';
    minutesSetInput.maxLength = 2;
    minutesSetInput.oninput = (e) => this.maxLengthCheck(e);
    minutesSetInput.addEventListener('change', (e:Event) => {
      if ((<HTMLInputElement>e.target).value === '0' && secondsSetInput.value === '0') {
        startAndPauseButton.disabled = true;
        return;
      }
      startAndPauseButton.disabled = false;
    });
    minutesSpan.innerText = 'Min';

    secondsSetInput.className = 'seconds-input';
    secondsSetInput.type = 'number';
    secondsSetInput.min = '0';
    secondsSetInput.value = '0';
    secondsSetInput.maxLength = 2;
    secondsSetInput.oninput = (e) => this.maxLengthCheck(e);
    secondsSetInput.addEventListener('change', (e:Event) => {
      if ((<HTMLInputElement>e.target).value === '0' && minutesSetInput.value === '0') {
        startAndPauseButton.disabled = true;
        return;
      }
      startAndPauseButton.disabled = false;
    });
    secondsSpan.innerText = 'Sec';

    /* buttons */
    cancelButton.className = 'cancel-button';
    cancelButton.innerText = 'Cancel';
    cancelButton.disabled = true;

    startAndPauseButton.className = 'start-button';
    startAndPauseButton.innerText = 'Start';
    startAndPauseButton.disabled = true;

    startAndPauseButton.onclick = () => TimerCalculation.start();

    /* append */
    timerSetterWrapper.append(
      minutesSetInput,
      minutesSpan,
      secondsSetInput,
      secondsSpan,
    );
    buttonWrapper.append(
      cancelButton,
      startAndPauseButton,
    )
    timerContainer.append(
      timerSetterWrapper,
      buttonWrapper,
    );
    element.append(timerContainer);
  }

  private maxLengthCheck (event:Event):void {
    const target = (<HTMLInputElement>event.target);
    if (target.value.length > target.maxLength) {
      target.value = target.value.slice(0, target.maxLength);
    }
    return;
  }
}