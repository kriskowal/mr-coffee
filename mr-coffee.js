
var parser = require("coffee-script/lib/coffee-script/parser").parser;
var Lexer = require("coffee-script/lib/coffee-script/lexer").Lexer;
var nodes = require("coffee-script/lib/coffee-script/nodes");
var lexer = new Lexer;

parser.lexer = {
    lex: function () {
        var tag, token;
        token = this.tokens[this.pos++];
        if (token) {
            tag = token[0], this.yytext = token[1], this.yylloc = token[2];
            this.yylineno = this.yylloc.first_line;
        } else {
            tag = '';
        }
        return tag;
    },
    setInput: function(tokens) {
        this.tokens = tokens;
        return this.pos = 0;
    },
    upcomingInput: function() {
        return "";
    }
};
parser.yy = nodes;

var options = {};

module.exports = function (code) {
    var fragments = parser.parse(lexer.tokenize(code, options)).compileToFragments(options);
    return fragments.map(function (fragment) {
        return fragment.code;
    }).join("");
};

