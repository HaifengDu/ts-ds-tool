export function getPath(vertextKey, prevDict) {
    const result = [vertextKey];
    let prev = prevDict[vertextKey];
    while (prev) {
        if (result && result[0] === prev) {
            break;
        }
        result.unshift(prev);
        prev = prevDict[prev];
    }
    return result;
}
