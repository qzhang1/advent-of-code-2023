const MAX_TRIE_SIZE = 26; // size of standard alphabet

class TrieNode {
  value: string;
  nodes: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;

  constructor(char: string, isEndOfWord: boolean) {
    this.value = char;
    this.isEndOfWord = isEndOfWord;
  }
}

export default class Trie {
  rootNode: TrieNode;
  constructor() {
    this.rootNode = new TrieNode("", false);
  }

  // insert word into trie
  insert(word: string): void {
    word = (word || "").toLowerCase();
    let currNode = this.rootNode;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currNode.nodes.has(char)) {
        currNode.nodes.set(char, new TrieNode(char, false));
      }
      currNode = currNode.nodes.get(char);
    }
    currNode.isEndOfWord = true;
  }

  private internalSearch(prefix: string, isFullMatch: boolean): boolean {
    prefix = (prefix || "").toLowerCase();
    let currNode = this.rootNode;
    for (let char of prefix) {
      if (!currNode.nodes.has(char)) {
        return false;
      }
      currNode = currNode.nodes.get(char);
    }

    return isFullMatch ? currNode.isEndOfWord : true;
  }

  hasWord(word: string): boolean {
    return this.internalSearch(word, true);
  }

  // returns true if there's a word that contains the prefix
  startsWith(prefix: string): boolean {
    return this.internalSearch(prefix, false);
  }
}
