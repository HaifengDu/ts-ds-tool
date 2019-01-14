import LinkList from "../LinkList";
const linkList = new LinkList();

test("test linkList Size to equal 0", () => {
    expect(linkList.Size).toEqual(0);
});

test("test append to linkList", () => {
    linkList.append(1);
    expect(linkList.Size).toEqual(1);
    const headNode = linkList.getHeadNode();
    expect(headNode).toEqual(linkList.findNode(1));
    linkList.append(2);
    expect(linkList.Size).toEqual(2);
    linkList.append(3);
    expect(linkList.Size).toEqual(3);
    const tailNode = linkList.getTailNode();
    expect(tailNode).toEqual(linkList.findNode(3));
});

test("test getHeadNode method", () => {
    const headNode = linkList.getHeadNode();
    expect(linkList.findNode(1)).toEqual(headNode);
});

test("test getTailNode method", () => {
    const tailNode = linkList.getTailNode();
    expect(linkList.findNode(3)).toEqual(tailNode);
});

test("test findNode method", () => {
    let linkNode = linkList.findNode(2);
    const headNode = linkList.getHeadNode();
    expect(linkNode).toEqual(headNode.Next);
    const tailNode = linkList.getTailNode();
    linkNode = linkList.findNode(item => item === 3);
    expect(linkNode).toEqual(tailNode);
});

test("test deleteNode method", () => {
    linkList.deleteNode(2);
    expect(linkList.Size).toEqual(2);
    linkList.deleteNode(item => item === 3);
    expect(linkList.Size).toEqual(1);
    linkList.deleteNode(item => item === 1);
    expect(linkList.Size).toEqual(0);
});

test("test prepend method", () => {
    linkList.prepend(1);
    expect(linkList.Size).toEqual(1);
    linkList.prepend(0);
    expect(linkList.Size).toEqual(2);
});

test("test shift method", () => {
    linkList.shift();
    let headNode = linkList.getHeadNode();
    expect(linkList.Size).toEqual(1);
    expect(headNode).toEqual(linkList.findNode(1));
    linkList.shift();
    expect(linkList.Size).toEqual(0);
    linkList.shift();
    linkList.append(1);
    headNode = linkList.getHeadNode();
    expect(headNode).toEqual(linkList.findNode(1));
});

test("test pop method", () => {
    linkList.append(2);
    linkList.append(3);
    let tailNode = linkList.getTailNode();
    expect(linkList.Size).toEqual(3);
    expect(tailNode).toEqual(linkList.findNode(3));
    linkList.pop();
    tailNode = linkList.getTailNode();
    expect(linkList.Size).toEqual(2);
    expect(tailNode).toEqual(linkList.findNode(2));
    linkList.pop();
    expect(linkList.Size).toEqual(1);
    tailNode = linkList.getTailNode();
    expect(tailNode).toEqual(linkList.findNode(1));
    linkList.pop();
    expect(linkList.Size).toEqual(0);
    linkList.pop();
    linkList.append(1);
    linkList.append(2);
    expect(linkList.Size).toEqual(2);
    tailNode = linkList.getTailNode();
    expect(tailNode).toEqual(linkList.findNode(2));
});

test("test toArray func", () => {
    const arr = linkList.toArray();
    expect(arr.length).toEqual(linkList.Size);
});

test("test fromArray func", () => {
    let arr = [1, 2, 3];
    let list = LinkList.fromArray(arr);
    expect(arr.length).toEqual(list.Size);
    arr = null;
    list = LinkList.fromArray(arr);
    expect(list.Size).toEqual(0);
});

test("test toString func", () => {
    const str = linkList.toString();
    expect(str).toEqual("1,2");
});

test("test toDoubleLinkList func", () => {
    const linkList1 = new LinkList();
    let doubleLinkList = linkList1.toDoubleLinkList();
    expect(doubleLinkList.getHeadNode()).toEqual(null);
    linkList1.append(1);
    linkList1.append(2);
    doubleLinkList = linkList1.toDoubleLinkList();
    const node = doubleLinkList.findNode(item => item === 2);
    expect(doubleLinkList.getHeadNode()).toEqual(node.Prev);
});

test("test LinkListNode setValue func", () => {
    const linkList1 = new LinkList();
    linkList1.append(1);
    const head = linkList1.getHeadNode();
    expect(head.Value).toEqual(1);
    head.setValue(2);
    expect(head.Value).toEqual(2);
});

test("test insertAfter func", () => {
    const linkList1 = new LinkList();
    linkList1.append(1);
    linkList1.append(3);
    let node = linkList1.findNode(1),
        result = linkList1.insertAfter(2, node);
    expect(result).toEqual(true);
    let tailNode = linkList1.getTailNode();
    expect(tailNode).toBe(linkList1.findNode(3));
    node = linkList1.findNode(3);
    result = linkList1.insertAfter(4, node);
    expect(result).toEqual(true);
    tailNode = linkList1.getTailNode();
    expect(tailNode).toBe(linkList1.findNode(4));
    node = linkList1.findNode(5);
    result = linkList1.insertAfter(6, node);
    expect(result).toEqual(false);
});

test("test iterator", () => {
    const linkList1 = new LinkList();
    linkList1.append(1);
    linkList1.append(3);
    const iterator = linkList1.getEnumerator();
    while (!iterator.Current.done){
        iterator.next();
    }
});

test("test clear", () => {
    const linkList1 = new LinkList();
    linkList1.append(1);
    linkList1.append(3);
    expect(linkList1.Size).toEqual(2);
    linkList1.clear();
    expect(linkList1.Size).toEqual(0);
});

test("test toCycleLinkList", () => {
    const linkList1 = new LinkList();
    linkList1.append(1);
    linkList1.append(3);
    const clinklist = linkList1.toCycleLinkList();
    expect(clinklist.getTailNode().Next).toBe(clinklist.getHeadNode());
});
