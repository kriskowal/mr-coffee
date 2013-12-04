
# Mr Coffee

> Yes. I always have my coffee when I watch radar, you know that.
> — Dark Helmet

Mr Coffee provides support for [CoffeeScript][] modules with [Mr][].

[CoffeeScript]: http://coffeescript.org/
[Mr]: https://github.com/montagejs/mr/

To make use of Mr Coffee, install it in your project.  All files bearing
the a name like `*.coffee` will be translated on the fly with Mr (no
build step in development) and bundled by Mrs.

```
npm install mr mr-coffee --save
```

```html
<html>
    <head>
        <sript src="node_modules/mr/boot.js" data-module="hello.coffee">
        </script>
    </head>
    <body>
        <div id="greeting" data-who="World!"></div>
    </body>
</html>
```

```
greeting = document.querySelector("#foo")
who = greeting.dataset.who
greeting.innerHTML = "Hello, #{who}"
```

Use `mrs` (part of Mr) to build the a bundle, with just the compiled
JavaScript.

```
./node_modules/.bin/mrs demo/hello.coffee
```

Produces a bundle, similar to one generated by [Browserify][]. Philosophically,
the difference is that your translators, compilers, and optimizers are
configured in `package.json` and used both with Mr (development) and Mrs
(production).

[Browserify]: https://github.com/substack/node-browserify

```js
(function (modules) {

    // unpack module tuples into module objects
    for (var i = 0; i < modules.length; i++) {
        modules[i] = new Module(modules[i][0], modules[i][1]);
    }

    function Module(dependencies, factory) {
        this.dependencies = dependencies;
        this.factory = factory;
    }

    Module.prototype.getExports = function () {
        var module = this;
        if (!module.exports) {
            module.exports = {};
            var require = function (id) {
                var index = module.dependencies[id];
                var dependency = modules[index];
                if (!dependency)
                    throw new Error("Bundle is missing a dependency: " + id);
                return dependency.getExports();
            }
            module.exports = module.factory(require, module.exports, module) || module.exports;
        }
        return module.exports;
    };

    return modules[0].getExports();
})((function (global){return[[{},function (require, exports, module){

// mr-coffee demo/hello.coffee
// ---------------------------

(function() {
  var greeting, who;

  greeting = document.querySelector("#greeting");

  who = greeting.dataset.who;

  greeting.innerHTML = "Hello, " + who;

}).call(this);
}]]})(this))
```

