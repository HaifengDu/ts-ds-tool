import DoubleLinkListCycle from "../DoubleLinkListCycle";

describe("DoubleLinkListCycle Gen test", () => {
    test("should create an empty linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        expect(linkDoubleCycle).toBeDefined();
        expect(linkDoubleCycle.isEmpty()).toBe(true);
    });
    test("should append items to the linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        linkDoubleCycle.append(1);
        const headNode = linkDoubleCycle.getHeadNode();
        const tailNode = linkDoubleCycle.getTailNode();
        expect(linkDoubleCycle.isEmpty()).toBe(false);
        expect(headNode).toBe(tailNode);

        linkDoubleCycle.append(5);
        const headNodeTwo = linkDoubleCycle.getHeadNode();
        const tailNodeTwo = linkDoubleCycle.getTailNode();
        expect(tailNodeTwo.value).toEqual(5);
        expect(tailNodeTwo.Prev).toBe(headNodeTwo);
        expect(headNodeTwo.Next.value).toEqual(5);
    });
    test("should prepend items in linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        linkDoubleCycle.prepend(1);
        const headNode = linkDoubleCycle.getHeadNode();
        const tailNode = linkDoubleCycle.getTailNode();
        expect(linkDoubleCycle.isEmpty()).toBe(false);
        expect(headNode).toBe(tailNode);
        expect(headNode.Prev).toBe(tailNode);
        expect(tailNode.Next).toBe(headNode);

        linkDoubleCycle.prepend(5);
        const headNodeTwo = linkDoubleCycle.getHeadNode();
        const tailNodeTwo = linkDoubleCycle.getTailNode();
        expect(headNodeTwo.value).toEqual(5);
        expect(headNodeTwo.Prev).toBe(tailNodeTwo);
        expect(tailNodeTwo.Next).toBe(headNodeTwo);
    });
    test("should shift items in linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        linkDoubleCycle.shift();
        expect(linkDoubleCycle.getHeadNode()).toEqual(null);
        linkDoubleCycle.append(1);
        linkDoubleCycle.append(5);
        linkDoubleCycle.shift();
        expect(linkDoubleCycle.getHeadNode().value).toEqual(5);
        linkDoubleCycle.shift();
        expect(linkDoubleCycle.getHeadNode()).toEqual(null);
        expect(linkDoubleCycle.getTailNode()).toEqual(null);
    });
    test("should pop items in linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        linkDoubleCycle.pop();
        expect(linkDoubleCycle.getTailNode()).toEqual(null);

        linkDoubleCycle.append(1);
        const data = linkDoubleCycle.pop();
        expect(data.value).toEqual(1);
        linkDoubleCycle.append(1);
        linkDoubleCycle.append(5);

        linkDoubleCycle.pop();
        expect(linkDoubleCycle.getTailNode().value).toEqual(1);

        linkDoubleCycle.pop();
        expect(linkDoubleCycle.getHeadNode()).toEqual(null);
        expect(linkDoubleCycle.getTailNode()).toEqual(null);
    });
    test("should deleteNode items in linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        linkDoubleCycle.deleteNode(5);
        linkDoubleCycle.append(1);
        linkDoubleCycle.append(5);
        linkDoubleCycle.append(7);
        linkDoubleCycle.append(1);
        linkDoubleCycle.deleteNode((item: any) => item === 5);
        expect(linkDoubleCycle.toString()).toEqual("1,7,1");
        linkDoubleCycle.deleteNode(1);
        expect(linkDoubleCycle.toString()).toEqual("7");
        linkDoubleCycle.deleteNode(7);
        expect(linkDoubleCycle.getHeadNode()).toBe(null);
    });
    test("should findNode items in linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        linkDoubleCycle.append(1);
        linkDoubleCycle.append(7);
        linkDoubleCycle.append(1);
        linkDoubleCycle.append(5);
        const res = linkDoubleCycle.findNode(2);
        expect(res).toBe(null);
        const findRes = linkDoubleCycle.findNode(item => item === 1);
        expect(findRes.Next.value).toEqual(7);

        const findTwoRes = linkDoubleCycle.findNode(5);
        expect(findTwoRes.Next).toBe(linkDoubleCycle.getHeadNode());
    });
    test("should isEmpty items in linkDoubleCycle", () => {
        const linkDoubleCycle = new DoubleLinkListCycle();
        expect(linkDoubleCycle.isEmpty()).toBe(true);
        linkDoubleCycle.append(1);
        expect(linkDoubleCycle.isEmpty()).toBe(false);
    });
    test("should getEnumerator items in linkDoubleCycle", () => {
        const linkDoubleList = new DoubleLinkListCycle<number>();
        linkDoubleList.append(1);
        linkDoubleList.append(3);
        const iterator = linkDoubleList.getEnumerator();
        const arr: Array<number> = [];
        while (arr.length < 10){
            arr.push(iterator.Current.value);
            iterator.next();
        }
    });
});
