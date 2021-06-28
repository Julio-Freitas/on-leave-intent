import OnleaveIntent from './index';

describe('OnLeveInternet', () => {
  let callback;
  let onLeaveIntent;
  const delay = 1000;

  jest.useFakeTimers();

  beforeEach(() => {
    callback = jest.fn();
    onLeaveIntent = new OnleaveIntent(callback, delay);
  });

  it('Should run the callback function if the user goes out of the screnn', () => {
    jest.advanceTimersByTime(delay);
    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }));

    expect(callback).toHaveBeenCalled();
  });

  it('Should  not run the callback function if the user goes out of the screnn', () => {
    jest.advanceTimersByTime(delay);
    document.dispatchEvent(
      new MouseEvent('mouseout', { relatedTarget: new EventTarget() })
    );
    expect(callback).not.toHaveBeenCalled();
  });

  it('Should run the callback function before the delay', () => {
    jest.advanceTimersByTime(delay / 2);
    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }));
    expect(callback).not.toHaveBeenCalled();
  });

  it('Should run the callback function only once', () => {
    jest.advanceTimersByTime(delay);
    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }));
    document.dispatchEvent(new MouseEvent('mouseout', { relatedTarget: null }));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
