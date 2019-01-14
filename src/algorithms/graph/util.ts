/**
 * 根据前置字典获取访问列表
 * @param vertextKey
 * @param prevDict
 */
export function getPath(vertextKey: string , prevDict: {[indeX: string]: string}){
    const result = [vertextKey];
    let prev = prevDict[vertextKey];
    while (prev){
        if (result && result[0] === prev){
            break;
        }
        result.unshift(prev);
        prev = prevDict[prev];
    }
    return result;
}
