import * as chai from "chai";

const expect = {
    name: "kim",
    test: {
        id: 2
    }
};

const actual = {
    name: "kim",
    test: {
        id: 2
    }
};

// Deep primitive referencial equality (===)
// https://www.chaijs.com/api/bdd/
// .eql(obj[, msg])
chai.expect(expect).to.eql(actual);