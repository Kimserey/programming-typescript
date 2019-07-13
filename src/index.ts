interface Reservation {
    from: Date;
    to?: Date;
    destination: string;
}

interface Reserve {
    (from: Date, to: Date, destination: string): Reservation;
    (from: Date, destination: string): Reservation;
}

const reserve: Reserve =
    (from: Date, toOrDestination: Date | string, destination?: string) => {
        return {
            destination: "",
            from
        };
    };

function createElement(tag: "a"): string;
// tslint:disable-next-line: unified-signatures
function createElement(tag: 12.5): string;
function createElement(tag: "a" | 12.5): string {
    switch (typeof tag) {
        case "string":
            return tag;
        case "number":
            return tag.toString();
    }
}

type Filter = <T>(array: T[], f: (item: T) => boolean) => T[];

let filter: Filter = (array, f) => {
    const result = [];
    for (const item of array) {
        if (f(item)) {
            result.push(item);
        }
    }
    return result;
};

console.log(filter([1, 2, 3, 4], _ => _ < 3));
console.log(filter(["a", "b", "c"], _ => _ !== "b"));

interface TreeNode {
    value: string;
}
type LeafNode = TreeNode & {
    isLeaf: true;
};
type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode]
};

let a: TreeNode = { value: "a" };
let b: LeafNode = { value: "b", isLeaf: true };
let c: InnerNode = { value: "c", children: [b] };

let a1 = mapNode(a, _ => _.toUpperCase());
let b1 = mapNode(b, _ => _.toUpperCase());
let c1 = mapNode(c, _ => _.toUpperCase());

function mapNode<T extends TreeNode>(node: T, fn: (value: string) => string) {
    return {
        value: fn(node.value),
        ...node
    };
}

function call<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args);
}

function fill(length: number, value: string): string[] {
    return Array.from({ length }, () => value);
}

call(fill, 10, "a");

type X = [...string[]];
type Y = string[];

const x: X = ["a", "b"];
const y: Y = ["a"];
console.log(typeof(x) === typeof(y));
