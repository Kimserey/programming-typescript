import { myObj, MyObject } from "./my-object";

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
console.log(typeof (x) === typeof (y));

type Color = "Black" | "White";
type File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Position {
    constructor(
        private file: File,
        private rank: Rank
    ) { }

    public distanceFrom(position: Position) {
        return {
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
            rank: Math.abs(position.rank - this.rank)
        };
    }
}

abstract class Piece {
    protected position: Position;
    constructor(
        private readonly color: Color,
        file: File,
        rank: Rank
    ) {
        this.position = new Position(file, rank);
    }

    public moveTo(position: Position) {
        this.position = position;
    }

    public abstract canMoveTo(position: Position): boolean;
}

class King extends Piece {
    public canMoveTo(position: Position): boolean {
        const distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    }
}

class Game {
    private static makePieces() {
        return [
            new King("White", "E", 1),
            new King("Black", "E", 8)
        ];
    }

    private pieces = Game.makePieces();
}

interface State {
    [key: string]: string;
}

class StringDabatase {
    public static from(state: State) {
        const db = new StringDabatase();
        for (const key of Object.keys(state)) {
            db.set(key, state[key]);
        }
        return db;
    }

    private state: State = {};

    /**
     * Returns the value stored at the provided key.
     * @param key   Key index.
     * @returns     Value if found, null if not found.
     */
    public get(key: string) {
        return key in this.state ? this.state[key] : null;
    }

    /**
     * Saves the value at the provided key.
     * @param key       Key index.
     * @param value     Value to store.
     */
    public set(key: string, value: string) {
        this.state[key] = value;
    }
}

const stringDb: StringDabatase = new StringDabatase();
stringDb.set("", "hehe");
stringDb.get("");

const xx = {
    lastname: "Lam",
    name: "Kimserey"
};

const yy = {
    name: "hehe",
    ...xx
};

const zz = [
    "",
    ...Object.keys(xx)
];

const xxx: [string, number, ...string[]] = [
    "Test",
    10,
    "Test",
    "Test",
    "Test"
];

function saySomething(...args: string[]) {
    for (const value of args) {
        console.log(value);
    }
}

saySomething("Hello", "world");
