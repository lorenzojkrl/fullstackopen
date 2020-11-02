
const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
    const result = palindrome('a')

    expect(result).toBe('a')
})

test('palindrome of react', () => {
    const result = palindrome('react')

    expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
    const result = palindrome('releveler')

    expect(result).toBe('releveler')
});


`
We specified jest to run in the testEnvironment node within script, however,
Jest can look for a configuration file with the default name jest.config.js, 
where we can define the execution environment like this:
`

// module.exports = {
//     testEnvironment: 'node',
// }