// getUserName.test.js

// Assure-toi de mettre le bon chemin vers ta fonction
import getUserName from "frontend/src/services/getUserName.js";

describe('getUserName', () => {
  const users = [
    { id: 1, username: 'Alice' },
    { id: 2, username: 'Bob' },
    { id: 3, username: 'Charlie' },
  ];

  it('should return the username for a valid id', () => {
    expect(getUserName(1, users)).toBe('Alice');
    expect(getUserName(2, users)).toBe('Bob');
    expect(getUserName(3, users)).toBe('Charlie');
  });

  it('should return "Unknown User" for an invalid id', () => {
    expect(getUserName(4, users)).toBe('Unknown User');
    expect(getUserName('invalid', users)).toBe('Unknown User');
    expect(getUserName(null, users)).toBe('Unknown User');
  });

  it('should handle string ids correctly', () => {
    expect(getUserName('1', users)).toBe('Alice');
    expect(getUserName('2', users)).toBe('Bob');
    expect(getUserName('3', users)).toBe('Charlie');
  });
});
