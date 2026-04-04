import { describe, it, expect, beforeEach } from 'vitest';
import { secret, SecretValue, isSecretValue, getSecrets, clearSecrets } from './secret';

describe('secret', () => {
  beforeEach(() => {
    clearSecrets();
  });

  it('creates a SecretValue with the correct key', () => {
    const val = secret('my-password');
    expect(val).toBeInstanceOf(SecretValue);
    expect(val.value).toBe('my-password');
    expect(val.key).toBe('secret_0');
  });

  it('registers the secret in the secrets registry', () => {
    secret('my-password');
    const secrets = getSecrets();
    expect(secrets.get('secret_0')).toBe('my-password');
  });

  it('assigns incrementing keys', () => {
    const s0 = secret('first');
    const s1 = secret('second');
    expect(s0.key).toBe('secret_0');
    expect(s1.key).toBe('secret_1');
    expect(getSecrets().size).toBe(2);
  });

  it('isSecretValue() recognizes SecretValue', () => {
    const val = secret('test');
    expect(isSecretValue(val)).toBe(true);
  });

  it('isSecretValue() rejects non-SecretValue', () => {
    expect(isSecretValue('string')).toBe(false);
    expect(isSecretValue(42)).toBe(false);
    expect(isSecretValue({})).toBe(false);
  });

  it('clearSecrets() wipes the registry', () => {
    secret('first');
    secret('second');
    clearSecrets();
    expect(getSecrets().size).toBe(0);
  });
});
