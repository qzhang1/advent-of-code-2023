"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_TRIE_SIZE = 26; // size of standard alphabet
var TrieNode = /** @class */ (function () {
    function TrieNode(char, isEndOfWord) {
        this.nodes = new Map();
        this.isEndOfWord = false;
        this.value = char;
        this.isEndOfWord = isEndOfWord;
    }
    return TrieNode;
}());
var Trie = /** @class */ (function () {
    function Trie() {
        this.rootNode = new TrieNode("", false);
    }
    // insert word into trie
    Trie.prototype.insert = function (word) {
        word = (word || "").toLowerCase();
        var currNode = this.rootNode;
        for (var i = 0; i < word.length; i++) {
            var char = word[i];
            if (!currNode.nodes.has(char)) {
                currNode.nodes.set(char, new TrieNode(char, false));
            }
            currNode = currNode.nodes.get(char);
        }
        currNode.isEndOfWord = true;
    };
    Trie.prototype.internalSearch = function (prefix, isFullMatch) {
        prefix = (prefix || "").toLowerCase();
        var currNode = this.rootNode;
        for (var _i = 0, prefix_1 = prefix; _i < prefix_1.length; _i++) {
            var char = prefix_1[_i];
            if (!currNode.nodes.has(char)) {
                return false;
            }
            currNode = currNode.nodes.get(char);
        }
        return isFullMatch ? currNode.isEndOfWord : true;
    };
    Trie.prototype.hasWord = function (word) {
        return this.internalSearch(word, true);
    };
    // returns true if there's a word that contains the prefix
    Trie.prototype.startsWith = function (prefix) {
        return this.internalSearch(prefix, false);
    };
    return Trie;
}());
exports.default = Trie;
