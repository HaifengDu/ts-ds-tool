import DoubleLinkList from "../DoubleLinkList";
const doubleLinkList = new DoubleLinkList();

test("test doubleLinkList Size to equal 0", () => {
    expect(doubleLinkList.Size).toEqual(0);
});

test("test append to doubleLinkList", () => {
    doubleLinkList.append(1);
    doubleLinkList.append(2);
    doubleLinkList.append(3);
    expect(doubleLinkList.Size).toEqual(3);
});

test("test prepend to doubleLinkList", () => {
    doubleLinkList.prepend(0);
    expect(doubleLinkList.Size).toEqual(4);
});

test("test findNode method", () => {
    let linkNode = doubleLinkList.findNode(1);
    const headNode = doubleLinkList.getHeadNode();
    expect(linkNode).toEqual(headNode.Next);
    linkNode = doubleLinkList.findNode(item => item === 3);
    const tailNode = doubleLinkList.getTailNode();
    expect(linkNode).toEqual(tailNode);
});

test("test deleteNode method", () => {
    doubleLinkList.deleteNode(2);
    expect(doubleLinkList.Size).toEqual(3);
    doubleLinkList.deleteNode(item => item === 3);
    expect(doubleLinkList.Size).toEqual(2);
    doubleLinkList.deleteNode(item => item === 0);
    expect(doubleLinkList.Size).toEqual(1);
    doubleLinkList.deleteNode(1);
    doubleLinkList.append(1);
    doubleLinkList.append(2);
});

test("test getHeadNode method", () => {
    const headNode = doubleLinkList.getHeadNode();
    expect(doubleLinkList.findNode(1)).toEqual(headNode);
});

test("test getTailNode method", () => {
    const tailNode = doubleLinkList.getTailNode();
    expect(doubleLinkList.findNode(2)).toEqual(tailNode);
});

test("test shift method", () => {
    doubleLinkList.shift();
    const headNode = doubleLinkList.getHeadNode();
    expect(doubleLinkList.Size).toEqual(1);
    expect(headNode).toEqual(doubleLinkList.findNode(2));
    doubleLinkList.shift();
    expect(doubleLinkList.Size).toEqual(0);
    doubleLinkList.shift();
    doubleLinkList.append(2);
});

test("test pop method", () => {
    doubleLinkList.prepend(1);
    doubleLinkList.append(3);
    let tailNode = doubleLinkList.getTailNode();
    expect(doubleLinkList.Size).toEqual(3);
    expect(tailNode).toEqual(doubleLinkList.findNode(3));
    doubleLinkList.pop();
    tailNode = doubleLinkList.getTailNode();
    expect(doubleLinkList.Size).toEqual(2);
    expect(tailNode).toEqual(doubleLinkList.findNode(2));
    doubleLinkList.pop();
    tailNode = doubleLinkList.getTailNode();
    expect(doubleLinkList.Size).toEqual(1);
    expect(tailNode).toEqual(doubleLinkList.findNode(1));
    doubleLinkList.pop();
    expect(doubleLinkList.Size).toEqual(0);
    doubleLinkList.pop();
});

test("test toArray func", () => {
    const arr = doubleLinkList.toArray();
    expect(arr.length).toEqual(0);
});

test("test toString func", () => {
    doubleLinkList.prepend(0);
    doubleLinkList.append(1);
    doubleLinkList.append(2);
    const str = doubleLinkList.toString();
    expect(str).toEqual("0,1,2");
});

test("test fromArray func", () => {
    let arr = [1, 2, 3];
    let list = DoubleLinkList.fromArray(arr);
    expect(arr.length).toEqual(list.Size);
    arr = null;
    list = DoubleLinkList.fromArray(arr);
    expect(list.Size).toEqual(0);
});

test("test DoubleLinkListNode setValue func", () => {
    const linkList = new DoubleLinkList();
    linkList.append(1);
    const head = linkList.getHeadNode();
    expect(head.Value).toEqual(1);
    head.setValue(2);
    expect(head.Value).toEqual(2);
});

test("test insertAfter func", () => {
    const linkList = new DoubleLinkList();
    linkList.append(1);
    linkList.append(3);
    let node = linkList.findNode(item => item === 1),
        result = linkList.insertAfter(2, node);
    expect(result).toEqual(true);
    expect(linkList.getHeadNode().Next).toBe(linkList.findNode(2));
    expect(linkList.getTailNode().Prev).toBe(linkList.findNode(2));
    node = linkList.findNode(item => item === 3);
    result = linkList.insertAfter(4, node);
    expect(result).toEqual(true);
    expect(linkList.getTailNode()).toBe(linkList.findNode(4));
    node = linkList.findNode(item => item === 5);
    result = linkList.insertAfter(6, node);
    expect(result).toEqual(false);
});

test("test clear", () => {
    const linkList = new DoubleLinkList();
    linkList.append(1);
    linkList.append(3);
    expect(linkList.Size).toEqual(2);
    linkList.clear();
    expect(linkList.Size).toEqual(0);
});

test("test iterator", () => {
    const linkList = new DoubleLinkList();
    linkList.append(1);
    linkList.append(3);
    const iterator = linkList.getEnumerator();
    while (!iterator.Current.done){
        iterator.next();
    }
});
