import { myObj, MyObject } from "./my-object";
import { brotliCompress } from "zlib";

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

function test<T>(t: T) {
    return class {
        public x(v: T) {
            return "";
        }
    };
}

interface Debuggable {
    getDebugValue(): object;
}

const MyClassTypeValue = class MyClass {
    public doSomething() {
        return "";
    }
};
const myClassValue = new MyClassTypeValue();

class MyClassExtend extends MyClassTypeValue {
    public doSomethingElse() {
        return "";
    }
}
const myClassExtended = new MyClassExtend();

type ClassConstructor<T> =
    new (...args: any[]) => T;

interface B {
    something(): string;
}

interface A extends B {
    do(): string;
}

type AA = {
    do(): string
} & B;

const aaa: A = {
    do: () => "",
    something: () => ""
};

const aaaa: AA = {
    do: () => "",
    something: () => ""
};

type U = "A" | "B";
type W = "C" | "D";
type UW = U | W;
const uw: UW = "D";

class Something { }
class Else extends Something { }

// Call signature
interface Xx {
    (num: number): string;
    (num: string, val: string): string;
}

const testxx: Xx =
    (num: number | string, val?: string): string => "";

/**
 * A function returning an anonymous class extending the class provided as argument,
 * intersected with a debug functionality.
 * @param Class Class to be extended with debug functionality.
 * @returns     A new class extending the original class with debug functionality.
 */
function withDebug<C extends ClassConstructor<Debuggable>>(Class: C) {
    return class extends Class {
        /**
         * Returns debug value.
         * @returns Debug value of the current object.
         */
        public debug() {
            const value = this.getDebugValue();
            return JSON.stringify(value);
        }
    };
}

function yyy<C extends Debuggable>(value: C) {
    return value.getDebugValue();
}

function zzz<C extends StringDabatase>(value: C) {
    return value.get("");
}

class User implements Debuggable {
    constructor(
        private id: number,
        private firstName: string,
        private lastName: string
    ) { }

    public getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + " " + this.lastName
        };
    }
}

const UserWithDebug = withDebug(User);
const user = new UserWithDebug(1, "Kimserey", "Lam");
console.log(user.debug());

const Hello = withDebug(
    class Test {
        public getDebugValue() {
            return {
                something: "hehe"
            };
        }
    }
);
const hello = new Hello();
console.log(hello.debug());

interface Shoe {
    purpose: string;
}

const Shoes = {
    create(): Shoe {
        return {
            purpose: "x"
        };
    }
};

const shoes = Shoes.create();
console.log(shoes.purpose);

interface ExistingUser {
    id: number;
    name: string;
}

interface NewUser {
    name: string;
}

function deleteUser(user: { id?: number, name: string }) {
    delete user.id;
}

let existingUser: ExistingUser = {
    id: 123,
    name: "Kim"
};

deleteUser(existingUser);
console.log(existingUser.id);

class Animal { }
class Bird extends Animal {
    public chirp() { console.log("e"); }
}
class Crow extends Bird {
    public caw() { console.log("o"); }
}

function chirp(bird: Bird): Bird {
    bird.chirp();
    return bird;
}

chirp(new Bird());
chirp(new Crow());

function clone(fn: (b: Bird) => Bird): void { }

function birdToBird(b: Bird): Bird { return b; }
clone(birdToBird);

function animalToCrow(a: Animal): Crow {
    return new Crow();
}
clone(animalToCrow);

// Flow-based type inference
function parseSomething(sth: string | number | null | undefined): string {
    if (sth == null) {
        return "";
    }

    if (typeof sth === "number") {
        return sth.toFixed();
    }

    return sth;
}

interface UserTextEvent {
    type: "TextEvent";
    value: string;
    target: number;
}

interface UserMouseEvent {
    type: "MouseEvent";
    value: string;
    target: [number, number];
}

type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) {
    switch (event.type) {
        case "MouseEvent":
            console.log(event.type, event.value, event.target);
            break;
        case "TextEvent":
            console.log(event.type, event.value, event.target);
            break;
    }
}

function isBig(n: number) {
    if (n >= 100) {
        return true;
    }

    return false;
}

type KeyOfTest = keyof { name: string, test: number };

function get<O, K extends keyof O>(o: O, k: K): O[K] {
    return o[k];
}

const val = get({ value: "Hello world", test: 10 }, "test");

type Weekday = "Mon";
type Day = Weekday | "Sat" | "Sun";

const nextDay: { [K in Weekday]: Day } = {
    Mon: "Mon"
}

type I = InstanceType<ClassConstructor<string>>;

declare global {
    interface Array<T> {
        zip<U>(list: U[]): Array<[T, U]>;
    }
}

Array.prototype.zip = function <T, U>(this: T[], list: U[]) {
    return this.map((v, k) => [v, list[k]]);
};

interface Option<T> {
    flatMap<_>(f: (value: T) => Option<_>): Option<_>;
    getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
    constructor(private value: T) { }

    public flatMap<_>(f: (value: T) => None): None;
    public flatMap<_>(f: (value: T) => Some<_>): Some<_>;
    public flatMap<_>(f: (value: T) => Option<_>): Option<_> {
        return f(this.value);
    }

    public getOrElse(): T {
        return this.value;
    }
}
class None implements Option<never> {
    public flatMap<_>(): Option<_> {
        return this;
    }

    public getOrElse<_>(value: _): _ {
        return value;
    }
}

function Option<T>(value: null | undefined): None;
function Option<T>(value: T): Some<T>;
function Option<T>(value: T): Option<T> {
    if (value == null) {
        return new None();
    }

    return new Some(value);
}

function someBoolean(): boolean {
    return false;
}

const res = Option(10)
    .flatMap(_ => new Some(new Date()))
    .flatMap(_ => new Some(_.getDate()))
    .flatMap(_ => new Some(_.toFixed()))
    .getOrElse();
