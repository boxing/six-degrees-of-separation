import { foo, fooAsync } from "../server/foo";
import { expect as chaiexpect } from "chai";

describe("it runs test suite in /src/__test__/", () => {

    it("tests sync function", () => {
        expect(foo()).toEqual("foo!");
    });

    it("tests async function", async done => {
        expect(await fooAsync()).toEqual("foo!?");
        done();
    });
});
