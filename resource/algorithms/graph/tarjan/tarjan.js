import { HashMap } from "../../../hashmap/HashMap";
export function tarjan(graph) {
    const vertices = graph.getVertexs();
    const stack = [];
    const components = [];
    const visitedMap = new HashMap();
    vertices.forEach(item => stronglyConnect(item, stack));
    return components;
    function stronglyConnect(vertex, visitedStack, dfn = new HashMap(), low = new HashMap(), index = 1) {
        if (visitedMap.get(vertex.Key)) {
            return;
        }
        index++;
        visitedStack.push(vertex);
        dfn.put(vertex.Key, index);
        low.put(vertex.Key, index);
        const neighbors = vertex.getNeighbors();
        neighbors.forEach(item => {
            if (!dfn.get(item.Key)) {
                stronglyConnect(item, visitedStack, dfn, low, index);
            }
            if (!visitedMap.get(item.Key)) {
                const lowIndex = low.get(item.Key);
                const currentLowIndex = low.get(vertex.Key);
                low.put(vertex.Key, Math.min(currentLowIndex, lowIndex));
            }
        });
        const lowIndex = low.get(vertex.Key);
        const dfnIndex = dfn.get(vertex.Key);
        if (lowIndex === dfnIndex) {
            let target;
            const smallComponents = [];
            do {
                target = visitedStack.pop().Key;
                visitedMap.put(target, true);
                smallComponents.push(target);
            } while (target !== vertex.Key);
            components.push(smallComponents);
        }
    }
}
