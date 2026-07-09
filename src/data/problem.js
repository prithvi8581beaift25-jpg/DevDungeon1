export const problem = {
  title: 'Two Sum',
  difficulty: 'Easy',
  description:
    'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Exactly one valid answer exists',
  ],
  inputFormat: 'An array of integers nums, and an integer target.',
  outputFormat: 'An array of two indices whose values sum to target.',
  examples: [
    {
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: '[0, 1]',
      explanation: 'nums[0] + nums[1] == 9, so the answer is [0, 1].',
    },
    {
      input: 'nums = [3, 2, 4], target = 6',
      output: '[1, 2]',
      explanation: 'nums[1] + nums[2] == 6, so the answer is [1, 2].',
    },
  ],
};
