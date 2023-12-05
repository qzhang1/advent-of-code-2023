import Trie from "./trie";

describe("test trie class and methods", () => {
  test("it should create trie nodes for each letter once inserted", () => {
    const t = new Trie();
    t.insert("test");
    let currNode = t.rootNode;
    let nodeCount = 0;
    const expectedValues = ["", "t", "e", "s", "t"];
    for (let i = 0; i < expectedValues.length - 1; i++) {
      expect(currNode).toBeDefined();
      expect(currNode.value).toBe(expectedValues[i]);
      expect(currNode.isEndOfWord).toBeFalsy();
      expect(currNode.nodes.size).toBe(1);
      currNode = currNode.nodes.get(expectedValues[i + 1]);
      nodeCount++;
    }

    // last node
    expect(currNode.value).toBe("t");
    expect(currNode.isEndOfWord).toBeTruthy();
    expect(currNode.nodes.size).toBe(0);
    nodeCount++;
    expect(nodeCount).toBe(5);
  });

  test("it should share trie nodes for two closely related words", () => {
    const t = new Trie();
    t.insert("cat");
    t.insert("car");
    let nodeCount = 0;
    let currNode = t.rootNode;
    const expectedValues = ["", "c", "a"];
    for (let i = 0; i < expectedValues.length; i++) {
      nodeCount += currNode.nodes.size;
      currNode = currNode.nodes.get(expectedValues[i + 1]);
    }

    expect(nodeCount).toBe(4);
  });

  test("it should return true for words with same prefix", () => {
    const t = new Trie();
    t.insert("cat");
    t.insert("car");
    expect(t.hasPrefix("ca")).toBeTruthy();
  });
});
