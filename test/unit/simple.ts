// simple.spec.ts
import { assert } from 'chai';

describe('Simple Math Test', function () {
  it('should correctly add two numbers', () => {
    const result = add(2, 3);
    assert.equal(result, 5);
  });

  it('should correctly add two negative numbers', () => {
    const result = add(-2, -3);
    assert.equal(result, -5);
  });

  // Add more test cases as needed
});

// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
