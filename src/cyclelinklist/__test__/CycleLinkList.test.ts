import  CycleLinkList  from "../CycleLinkList";

describe("CycleLinkList test", () => {
    test("test append",()=>{
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        expect(clinklist.Size).toEqual(1);
    });

    test("test prepend",() => {
        const clinklist = new CycleLinkList();
        clinklist.prepend(1);
        expect(clinklist.Size).toEqual(1);
    });

    test("test getHeadNode", () => {
        const clinklist = new CycleLinkList();
        clinklist.prepend(1);
        expect(clinklist.getHeadNode()).toBe(clinklist.findNode(1));
    });

    test("test getTailNode", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        expect(clinklist.getTailNode()).toBe(clinklist.findNode(2));
    });

    test("test deleteNode", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        clinklist.append(3);
        clinklist.deleteNode(1);
        expect(clinklist.getTailNode().Next).toBe(clinklist.findNode(2));
        clinklist.prepend(1);
        clinklist.deleteNode(2);
        expect(clinklist.getTailNode().Next).toBe(clinklist.findNode(1));
        clinklist.deleteNode(3);
        expect(clinklist.getTailNode().Next).toBe(clinklist.getHeadNode());
    });

    test("test findNode", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        const headNode = clinklist.getHeadNode(),
        tailNode = clinklist.getTailNode();
        expect(headNode).toBe(clinklist.findNode(1));
        expect(tailNode).toBe(clinklist.findNode(2));
    });

    test("test clear", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        expect(clinklist.Size).toBe(2);
        clinklist.clear();
        expect(clinklist.Size).toBe(0);
    });

    test("test toString", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        expect(clinklist.toString()).toBe("1,2");
    });

    test("test pop", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        expect(clinklist.getTailNode()).toBe(clinklist.findNode(2));
        expect(clinklist.Size).toEqual(2);
        clinklist.pop();
        expect(clinklist.getTailNode()).toBe(clinklist.findNode(1));
        expect(clinklist.getTailNode().Next).toBe(clinklist.findNode(1));
        expect(clinklist.Size).toBe(1);
        clinklist.pop();
        expect(clinklist.Size).toBe(0);
    });

    test("test shift", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(2);
        expect(clinklist.getHeadNode()).toBe(clinklist.findNode(1));
        expect(clinklist.Size).toBe(2);
        clinklist.shift();
        expect(clinklist.getHeadNode()).toBe(clinklist.findNode(2));
        expect(clinklist.Size).toBe(1);
        clinklist.shift();
        expect(clinklist.Size).toBe(0);
    });

    test("test insertAfter", () => {
        const clinklist = new CycleLinkList();
        clinklist.append(1);
        clinklist.append(3);
        expect(clinklist.getHeadNode().Next).toBe(clinklist.findNode(3));
        expect(clinklist.Size).toEqual(2);
        clinklist.insertAfter(2, clinklist.findNode(1));
        expect(clinklist.getHeadNode().Next).toBe(clinklist.findNode(2));
        expect(clinklist.Size).toEqual(3);
        clinklist.insertAfter(4, clinklist.findNode(3));
        expect(clinklist.getTailNode()).toBe(clinklist.findNode(4));
        expect(clinklist.findNode(3)).toBe(clinklist.findNode(2).Next);
        expect(clinklist.findNode(4).Next).toBe(clinklist.getHeadNode());
    });

    test("test fromArray func", () => {
        let arr = [1, 2, 3];
        let list = CycleLinkList.fromArray(arr);
        expect(arr.length).toEqual(list.Size);
        arr = null;
        list = CycleLinkList.fromArray(arr);
        expect(list.Size).toEqual(0);
    });

    test("test iterator", () => {
        const linkList = new CycleLinkList();
        linkList.append(1);
        linkList.append(3);
        const iterator = linkList.getEnumerator();
        let index = 0,
            value;
        while (index < 10){
            if (index === 9){
                value = iterator.Current.value;
            }
            iterator.next();
            index++;
        }
        expect(value).toBe(3);
    });

    test("test toArray", () => {
        const linkList = new CycleLinkList();
        linkList.append(1);
        linkList.append(3);
        const arr = linkList.toArray();
        expect(arr.length).toEqual(linkList.Size);
        expect(arr[0]).toEqual(linkList.findNode(1));
    });
});
