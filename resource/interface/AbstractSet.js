export class AbstractSet {
    diff(set) {
        if (!set) {
            return this.entries();
        }
        const items = this.entries();
        const result = [];
        for (const element of items) {
            if (!set.has(element)) {
                result.push(element);
            }
        }
        return result;
    }
    union(set) {
        if (!set) {
            return this.entries();
        }
        const items = set.entries();
        const thisItems = this.entries();
        for (const element of items) {
            if (!this.has(element)) {
                thisItems.push(element);
            }
        }
        return thisItems;
    }
    intersect(set) {
        if (!set) {
            return [];
        }
        const result = [];
        let largeSet, smallItems;
        if (this.Size > set.Size) {
            largeSet = this;
            smallItems = set.entries();
        }
        else {
            largeSet = set;
            smallItems = this.entries();
        }
        for (const element of smallItems) {
            if (largeSet.has(element)) {
                result.push(element);
            }
        }
        return result;
    }
    isEmpty() {
        return this.Size === 0;
    }
}
