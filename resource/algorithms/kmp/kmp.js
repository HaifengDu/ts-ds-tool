function getNext(word) {
    const next = [0];
    let wordIndex = 1;
    let prevIndex = 0;
    while (wordIndex < word.length) {
        if (word[prevIndex] === word[wordIndex]) {
            next[wordIndex] = prevIndex + 1;
            prevIndex++;
            wordIndex++;
        }
        else if (prevIndex === 0) {
            next[wordIndex] = 0;
            wordIndex++;
        }
        else {
            prevIndex = next[prevIndex - 1];
        }
    }
    return next;
}
export function kmp(text, word) {
    if (text === null || text === undefined) {
        return -1;
    }
    if (word === null || word === undefined) {
        return -1;
    }
    if (word.length === 0) {
        return 0;
    }
    const next = getNext(word);
    let wordIndex = 0;
    let textIndex = 0;
    while (textIndex < text.length) {
        if (text[textIndex] === word[wordIndex]) {
            if (wordIndex === word.length - 1) {
                return textIndex - wordIndex;
            }
            textIndex++;
            wordIndex++;
        }
        else if (wordIndex > 0) {
            wordIndex = next[wordIndex - 1];
        }
        else {
            wordIndex = 0;
            textIndex++;
        }
    }
    return -1;
}
