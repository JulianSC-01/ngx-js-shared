import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { LeadingZeroPipe } from './leading-zero.pipe';

describe('LeadingZeroPipe', () => {
  let pipe: LeadingZeroPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    pipe = new LeadingZeroPipe();
  });

  test('should create', () => {
    expect(pipe).toBeDefined();
  });

  test('should pad 2 for single digit', () => {
    expect(pipe.transform(1)).
      toBe('01');
  });

  test('should pad 2 for double digit', () => {
    expect(pipe.transform(10)).
      toBe('10');
  });

  test('should pad 4 for single digit', () => {
    expect(pipe.transform(1, 4)).
      toBe('0001');
  });

  test('should pad 4 for double digit', () => {
    expect(pipe.transform(10, 4)).
      toBe('0010');
  });

  test('should not exceed max pad for single digit',
    () => {
      expect(pipe.transform(1, 20)).
        toBe('0000000001');
    });

  test('should not exceed max for double digit',
    () => {
      expect(pipe.transform(10, 20)).
        toBe('0000000010');
    });
});
