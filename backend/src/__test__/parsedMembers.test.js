const { parsedMembers } = require('../services/parsedMembers');

describe('parsedMembers', () => {
  test('should parse valid JSON string to array', () => {
    const members = JSON.stringify(['user1', 'user2']);
    const expectedMembers = ['user1', 'user2'];
    const result = parsedMembers(members);
    expect(result).toEqual(expectedMembers);
  });

  test('should return empty array when input is undefined', () => {
    const members = undefined;
    const expectedMembers = [];
    const result = parsedMembers(members);
    expect(result).toEqual(expectedMembers);
  });

  test('should return empty array when JSON is not an array', () => {
    const members = JSON.stringify('not an array');
    const expectedMembers = [];
    const result = parsedMembers(members);
    expect(result).toEqual(expectedMembers);
  });

  test('should return empty array when input is an empty array JSON', () => {
    const members = JSON.stringify([]);
    const expectedMembers = [];
    const result = parsedMembers(members);
    expect(result).toEqual(expectedMembers);
  });
});