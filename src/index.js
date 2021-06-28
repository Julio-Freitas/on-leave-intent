export default class OnleaveIntent {
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
    this.init();
  }

  checkOutOfBounds = event => {
    if (event.relatedTarget === null) {
      this.callback();
      this.destroy();
    }
  };

  init = () => {
    this.timerMouseOut = window.setTimeout(
      () => this.handleMouseOut(),
      this.delay
    );
  };

  destroy = () => {
    window.clearTimeout(this.timerMouseOut);
    document.removeEventListener('mouseout', this.checkOutOfBounds);
  };

  handleMouseOut() {
    document.addEventListener('mouseout', this.checkOutOfBounds);
  }
}
