import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withErrorHandler } from './error-handler';

describe('withErrorHandler', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the wrapped function with forwarded arguments', async () => {
    const fn = vi.fn();
    const wrapped = withErrorHandler('Test', fn);
    await wrapped('a', 42);
    expect(fn).toHaveBeenCalledWith('a', 42);
  });

  it('does not exit on success', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const wrapped = withErrorHandler('Test', () => {});
    await wrapped();
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('prints labelled error and exits 1 on Error', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const wrapped = withErrorHandler('Compile', () => { throw new Error('bad config'); });
    await wrapped();
    expect(errorSpy).toHaveBeenCalledWith('Compile failed: bad config');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('prints non-Error values directly', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const wrapped = withErrorHandler('Run', () => { throw 'string error'; });
    await wrapped();
    expect(errorSpy).toHaveBeenCalledWith('Run failed: string error');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('handles async functions that reject', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const wrapped = withErrorHandler('Logs', async () => { throw new Error('timeout'); });
    await wrapped();
    expect(errorSpy).toHaveBeenCalledWith('Logs failed: timeout');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
