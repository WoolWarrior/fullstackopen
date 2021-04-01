const for_testing = require('../utils/for_testing')

test('palindrome of a', () => {
  const result = for_testing.palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = for_testing.palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = for_testing.palindrome('releveler')

  expect(result).toBe('releveler')
})