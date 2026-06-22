function advancedTitleCase(str) {
  const smallWords = /^(a|an|and|as|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)$/i;
  
  return str.toLowerCase().replace(/\b\w+\b/g, (word, index) => {
    if (index > 0 && smallWords.test(word)) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.substring(1);
  });
}