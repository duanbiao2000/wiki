/* PrismJS 1.11.0
http://prismjs.com/download.html?themes=prism-dark&languages=markup+css+clike+javascript+c+bash+basic+cpp+csharp+arduino+ruby+elixir+fsharp+go+graphql+handlebars+haskell+ini+java+json+kotlin+latex+less+makefile+markdown+matlab+nginx+objectivec+perl+php+powershell+pug+python+typescript+rust+scss+scala+smalltalk+sql+stylus+swift+vbnet+yaml&plugins=line-numbers */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function () {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler:
          _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (e) {
            return e instanceof r
              ? new r(e.type, n.util.encode(e.content), e.alias)
              : "Array" === n.util.type(e)
              ? e.map(n.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            );
          },
          clone: function (e) {
            var t = n.util.type(e);
            switch (t) {
              case "Object":
                var r = {};
                for (var a in e)
                  e.hasOwnProperty(a) && (r[a] = n.util.clone(e[a]));
                return r;
              case "Array":
                return e.map(function (e) {
                  return n.util.clone(e);
                });
            }
            return e;
          },
        },
        languages: {
          extend: function (e, t) {
            var r = n.util.clone(n.languages[e]);
            for (var a in t) r[a] = t[a];
            return r;
          },
          insertBefore: function (e, t, r, a) {
            a = a || n.languages;
            var l = a[e];
            if (2 == arguments.length) {
              r = arguments[1];
              for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
              return l;
            }
            var o = {};
            for (var s in l)
              if (l.hasOwnProperty(s)) {
                if (s == t)
                  for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                o[s] = l[s];
              }
            return (
              n.languages.DFS(n.languages, function (t, n) {
                n === a[e] && t != e && (this[t] = o);
              }),
              (a[e] = o)
            );
          },
          DFS: function (e, t, r, a) {
            a = a || {};
            for (var l in e)
              e.hasOwnProperty(l) &&
                (t.call(e, l, e[l], r || l),
                "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])]
                  ? "Array" !== n.util.type(e[l]) ||
                    a[n.util.objId(e[l])] ||
                    ((a[n.util.objId(e[l])] = !0),
                    n.languages.DFS(e[l], t, l, a))
                  : ((a[n.util.objId(e[l])] = !0),
                    n.languages.DFS(e[l], t, null, a)));
          },
        },
        plugins: {},
        highlightAll: function (e, t) {
          n.highlightAllUnder(document, e, t);
        },
        highlightAllUnder: function (e, t, r) {
          var a = {
            callback: r,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run("before-highlightall", a);
          for (
            var l, i = a.elements || e.querySelectorAll(a.selector), o = 0;
            (l = i[o++]);

          )
            n.highlightElement(l, t === !0, a.callback);
        },
        highlightElement: function (t, r, a) {
          for (var l, i, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o &&
            ((l = (o.className.match(e) || [, ""])[1].toLowerCase()),
            (i = n.languages[l])),
            (t.className =
              t.className.replace(e, "").replace(/\s+/g, " ") +
              " language-" +
              l),
            t.parentNode &&
              ((o = t.parentNode),
              /pre/i.test(o.nodeName) &&
                (o.className =
                  o.className.replace(e, "").replace(/\s+/g, " ") +
                  " language-" +
                  l));
          var s = t.textContent,
            g = { element: t, language: l, grammar: i, code: s };
          if ((n.hooks.run("before-sanity-check", g), !g.code || !g.grammar))
            return (
              g.code &&
                (n.hooks.run("before-highlight", g),
                (g.element.textContent = g.code),
                n.hooks.run("after-highlight", g)),
              n.hooks.run("complete", g),
              void 0
            );
          if ((n.hooks.run("before-highlight", g), r && _self.Worker)) {
            var u = new Worker(n.filename);
            (u.onmessage = function (e) {
              (g.highlightedCode = e.data),
                n.hooks.run("before-insert", g),
                (g.element.innerHTML = g.highlightedCode),
                a && a.call(g.element),
                n.hooks.run("after-highlight", g),
                n.hooks.run("complete", g);
            }),
              u.postMessage(
                JSON.stringify({
                  language: g.language,
                  code: g.code,
                  immediateClose: !0,
                })
              );
          } else
            (g.highlightedCode = n.highlight(g.code, g.grammar, g.language)),
              n.hooks.run("before-insert", g),
              (g.element.innerHTML = g.highlightedCode),
              a && a.call(t),
              n.hooks.run("after-highlight", g),
              n.hooks.run("complete", g);
        },
        highlight: function (e, t, a) {
          var l = n.tokenize(e, t);
          return r.stringify(n.util.encode(l), a);
        },
        matchGrammar: function (e, t, r, a, l, i, o) {
          var s = n.Token;
          for (var g in r)
            if (r.hasOwnProperty(g) && r[g]) {
              if (g == o) return;
              var u = r[g];
              u = "Array" === n.util.type(u) ? u : [u];
              for (var c = 0; c < u.length; ++c) {
                var h = u[c],
                  f = h.inside,
                  d = !!h.lookbehind,
                  m = !!h.greedy,
                  p = 0,
                  y = h.alias;
                if (m && !h.pattern.global) {
                  var v = h.pattern.toString().match(/[imuy]*$/)[0];
                  h.pattern = RegExp(h.pattern.source, v + "g");
                }
                h = h.pattern || h;
                for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                  var w = t[b];
                  if (t.length > e.length) return;
                  if (!(w instanceof s)) {
                    h.lastIndex = 0;
                    var _ = h.exec(w),
                      P = 1;
                    if (!_ && m && b != t.length - 1) {
                      if (((h.lastIndex = k), (_ = h.exec(e)), !_)) break;
                      for (
                        var A = _.index + (d ? _[1].length : 0),
                          j = _.index + _[0].length,
                          x = b,
                          O = k,
                          N = t.length;
                        N > x && (j > O || (!t[x].type && !t[x - 1].greedy));
                        ++x
                      )
                        (O += t[x].length), A >= O && (++b, (k = O));
                      if (t[b] instanceof s || t[x - 1].greedy) continue;
                      (P = x - b), (w = e.slice(k, O)), (_.index -= k);
                    }
                    if (_) {
                      d && (p = _[1].length);
                      var A = _.index + p,
                        _ = _[0].slice(p),
                        j = A + _.length,
                        S = w.slice(0, A),
                        C = w.slice(j),
                        M = [b, P];
                      S && (++b, (k += S.length), M.push(S));
                      var E = new s(g, f ? n.tokenize(_, f) : _, y, _, m);
                      if (
                        (M.push(E),
                        C && M.push(C),
                        Array.prototype.splice.apply(t, M),
                        1 != P && n.matchGrammar(e, t, r, b, k, !0, g),
                        i)
                      )
                        break;
                    } else if (i) break;
                  }
                }
              }
            }
        },
        tokenize: function (e, t) {
          var r = [e],
            a = t.rest;
          if (a) {
            for (var l in a) t[l] = a[l];
            delete t.rest;
          }
          return n.matchGrammar(e, r, t, 0, 0, !1), r;
        },
        hooks: {
          all: {},
          add: function (e, t) {
            var r = n.hooks.all;
            (r[e] = r[e] || []), r[e].push(t);
          },
          run: function (e, t) {
            var r = n.hooks.all[e];
            if (r && r.length) for (var a, l = 0; (a = r[l++]); ) a(t);
          },
        },
      }),
      r = (n.Token = function (e, t, n, r, a) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (r || "").length),
          (this.greedy = !!a);
      });
    if (
      ((r.stringify = function (e, t, a) {
        if ("string" == typeof e) return e;
        if ("Array" === n.util.type(e))
          return e
            .map(function (n) {
              return r.stringify(n, t, e);
            })
            .join("");
        var l = {
          type: e.type,
          content: r.stringify(e.content, t, a),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: a,
        };
        if (e.alias) {
          var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(l.classes, i);
        }
        n.hooks.run("wrap", l);
        var o = Object.keys(l.attributes)
          .map(function (e) {
            return (
              e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            );
          })
          .join(" ");
        return (
          "<" +
          l.tag +
          ' class="' +
          l.classes.join(" ") +
          '"' +
          (o ? " " + o : "") +
          ">" +
          l.content +
          "</" +
          l.tag +
          ">"
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (n.disableWorkerMessageHandler ||
            _self.addEventListener(
              "message",
              function (e) {
                var t = JSON.parse(e.data),
                  r = t.language,
                  a = t.code,
                  l = t.immediateClose;
                _self.postMessage(n.highlight(a, n.languages[r], r)),
                  l && _self.close();
              },
              !1
            ),
          _self.Prism)
        : _self.Prism;
    var a =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName("script")).pop();
    return (
      a &&
        ((n.filename = a.src),
        n.manual ||
          a.hasAttribute("data-manual") ||
          ("loading" !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener("DOMContentLoaded", n.highlightAll))),
      _self.Prism
    );
  })();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
(Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: { rule: /@[\w-]+/ },
  },
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/,
}),
  (Prism.languages.css.atrule.inside.rest = Prism.util.clone(
    Prism.languages.css
  )),
  Prism.languages.markup &&
    (Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0,
      },
    }),
    Prism.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside,
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: "language-css",
        },
      },
      Prism.languages.markup.tag
    ));
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword:
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number:
    /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
  function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  operator:
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern:
        /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function",
    },
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore("markup", "tag", {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.c = Prism.languages.extend("clike", {
  keyword:
    /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  operator: /-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/]/,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i,
})),
  Prism.languages.insertBefore("c", "string", {
    macro: {
      pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      alias: "property",
      inside: {
        string: {
          pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
          lookbehind: !0,
        },
        directive: {
          pattern:
            /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
          lookbehind: !0,
          alias: "keyword",
        },
      },
    },
    constant:
      /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c["class-name"],
  delete Prism.languages.c["boolean"];
!(function (e) {
  var t = {
    variable: [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        inside: {
          variable: [
            { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
            /^\$\(\(/,
          ],
          number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
          operator:
            /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          punctuation: /\(\(?|\)\)?|,|;/,
        },
      },
      {
        pattern: /\$\([^)]+\)|`[^`]+`/,
        inside: { variable: /^\$\(|^`|\)$|`$/ },
      },
      /\$(?:[\w#?*!@]+|\{[^}]+\})/i,
    ],
  };
  e.languages.bash = {
    shebang: {
      pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
      alias: "important",
    },
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    string: [
      {
        pattern: /((?:^|[^<])<<\s*)["']?(\w+?)["']?\s*\r?\n(?:[\s\S])*?\r?\n\2/,
        lookbehind: !0,
        greedy: !0,
        inside: t,
      },
      { pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0, inside: t },
    ],
    variable: t.variable,
    function: {
      pattern:
        /(^|[\s;|&])(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|[\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern:
        /(^|[\s;|&])(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|[\s;|&])/,
      lookbehind: !0,
    },
    boolean: {
      pattern: /(^|[\s;|&])(?:true|false)(?=$|[\s;|&])/,
      lookbehind: !0,
    },
    operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/,
  };
  var a = t.variable[1].inside;
  (a["function"] = e.languages.bash["function"]),
    (a.keyword = e.languages.bash.keyword),
    (a.boolean = e.languages.bash.boolean),
    (a.operator = e.languages.bash.operator),
    (a.punctuation = e.languages.bash.punctuation);
})(Prism);
Prism.languages.basic = {
  comment: { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
  string: {
    pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
    greedy: !0,
  },
  number: /(?:\b|\B[.-])(?:\d+\.?\d*)(?:E[+-]?\d+)?/i,
  keyword:
    /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
  function:
    /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
  operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
  punctuation: /[,;:()]/,
};
(Prism.languages.cpp = Prism.languages.extend("c", {
  keyword:
    /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  boolean: /\b(?:true|false)\b/,
  operator:
    /--?|\+\+?|!=?|<{1,2}=?|>{1,2}=?|->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|\|?|\?|\*|\/|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
})),
  Prism.languages.insertBefore("cpp", "keyword", {
    "class-name": { pattern: /(class\s+)\w+/i, lookbehind: !0 },
  }),
  Prism.languages.insertBefore("cpp", "string", {
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: "string",
      greedy: !0,
    },
  });
(Prism.languages.csharp = Prism.languages.extend("clike", {
  keyword:
    /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
  string: [
    { pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/, greedy: !0 },
  ],
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+f?)\b/i,
})),
  Prism.languages.insertBefore("csharp", "keyword", {
    "generic-method": {
      pattern: /[a-z0-9_]+\s*<[^>\r\n]+?>\s*(?=\()/i,
      alias: "function",
      inside: {
        keyword: Prism.languages.csharp.keyword,
        punctuation: /[<>(),.:]/,
      },
    },
    preprocessor: {
      pattern: /(^\s*)#.*/m,
      lookbehind: !0,
      alias: "property",
      inside: {
        directive: {
          pattern:
            /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
          lookbehind: !0,
          alias: "keyword",
        },
      },
    },
  });
Prism.languages.arduino = Prism.languages.extend("cpp", {
  keyword:
    /\b(?:setup|if|else|while|do|for|return|in|instanceof|default|function|loop|goto|switch|case|new|try|throw|catch|finally|null|break|continue|boolean|bool|void|byte|word|string|String|array|int|long|integer|double)\b/,
  builtin:
    /\b(?:KeyboardController|MouseController|SoftwareSerial|EthernetServer|EthernetClient|LiquidCrystal|LiquidCrystal_I2C|RobotControl|GSMVoiceCall|EthernetUDP|EsploraTFT|HttpClient|RobotMotor|WiFiClient|GSMScanner|FileSystem|Scheduler|GSMServer|YunClient|YunServer|IPAddress|GSMClient|GSMModem|Keyboard|Ethernet|Console|GSMBand|Esplora|Stepper|Process|WiFiUDP|GSM_SMS|Mailbox|USBHost|Firmata|PImage|Client|Server|GSMPIN|FileIO|Bridge|Serial|EEPROM|Stream|Mouse|Audio|Servo|File|Task|GPRS|WiFi|Wire|TFT|GSM|SPI|SD|runShellCommandAsynchronously|analogWriteResolution|retrieveCallingNumber|printFirmwareVersion|analogReadResolution|sendDigitalPortPair|noListenOnLocalhost|readJoystickButton|setFirmwareVersion|readJoystickSwitch|scrollDisplayRight|getVoiceCallStatus|scrollDisplayLeft|writeMicroseconds|delayMicroseconds|beginTransmission|getSignalStrength|runAsynchronously|getAsynchronously|listenOnLocalhost|getCurrentCarrier|readAccelerometer|messageAvailable|sendDigitalPorts|lineFollowConfig|countryNameWrite|runShellCommand|readStringUntil|rewindDirectory|readTemperature|setClockDivider|readLightSensor|endTransmission|analogReference|detachInterrupt|countryNameRead|attachInterrupt|encryptionType|readBytesUntil|robotNameWrite|readMicrophone|robotNameRead|cityNameWrite|userNameWrite|readJoystickY|readJoystickX|mouseReleased|openNextFile|scanNetworks|noInterrupts|digitalWrite|beginSpeaker|mousePressed|isActionDone|mouseDragged|displayLogos|noAutoscroll|addParameter|remoteNumber|getModifiers|keyboardRead|userNameRead|waitContinue|processInput|parseCommand|printVersion|readNetworks|writeMessage|blinkVersion|cityNameRead|readMessage|setDataMode|parsePacket|isListening|setBitOrder|beginPacket|isDirectory|motorsWrite|drawCompass|digitalRead|clearScreen|serialEvent|rightToLeft|setTextSize|leftToRight|requestFrom|keyReleased|compassRead|analogWrite|interrupts|WiFiServer|disconnect|playMelody|parseFloat|autoscroll|getPINUsed|setPINUsed|setTimeout|sendAnalog|readSlider|analogRead|beginWrite|createChar|motorsStop|keyPressed|tempoWrite|readButton|subnetMask|debugPrint|macAddress|writeGreen|randomSeed|attachGPRS|readString|sendString|remotePort|releaseAll|mouseMoved|background|getXChange|getYChange|answerCall|getResult|voiceCall|endPacket|constrain|getSocket|writeJSON|getButton|available|connected|findUntil|readBytes|exitValue|readGreen|writeBlue|startLoop|IPAddress|isPressed|sendSysex|pauseMode|gatewayIP|setCursor|getOemKey|tuneWrite|noDisplay|loadImage|switchPIN|onRequest|onReceive|changePIN|playFile|noBuffer|parseInt|overflow|checkPIN|knobRead|beginTFT|bitClear|updateIR|bitWrite|position|writeRGB|highByte|writeRed|setSpeed|readBlue|noStroke|remoteIP|transfer|shutdown|hangCall|beginSMS|endWrite|attached|maintain|noCursor|checkReg|checkPUK|shiftOut|isValid|shiftIn|pulseIn|connect|println|localIP|pinMode|getIMEI|display|noBlink|process|getBand|running|beginSD|drawBMP|lowByte|setBand|release|bitRead|prepare|pointTo|readRed|setMode|noFill|remove|listen|stroke|detach|attach|noTone|exists|buffer|height|bitSet|circle|config|cursor|random|IRread|setDNS|endSMS|getKey|micros|millis|begin|print|write|ready|flush|width|isPIN|blink|clear|press|mkdir|rmdir|close|point|yield|image|BSSID|click|delay|read|text|move|peek|beep|rect|line|open|seek|fill|size|turn|stop|home|find|step|tone|sqrt|RSSI|SSID|end|bit|tan|cos|sin|pow|map|abs|max|min|get|run|put)\b/,
  constant:
    /\b(?:DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG|INPUT_PULLUP|SET_PIN_MODE|INTERNAL2V56|SYSTEM_RESET|LED_BUILTIN|INTERNAL1V1|SYSEX_START|INTERNAL|EXTERNAL|DEFAULT|OUTPUT|INPUT|HIGH|LOW)\b/,
});
!(function (e) {
  e.languages.ruby = e.languages.extend("clike", {
    comment: [
      /#(?!\{[^\r\n]*?\}).*/,
      /^=begin(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?=end/m,
    ],
    keyword:
      /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
  });
  var n = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
      rest: e.util.clone(e.languages.ruby),
    },
  };
  e.languages.insertBefore("ruby", "keyword", {
    regex: [
      {
        pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern:
          /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0,
      },
    ],
    variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    symbol: /:[a-zA-Z_]\w*(?:[?!]|\b)/,
  }),
    e.languages.insertBefore("ruby", "number", {
      builtin:
        /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
      constant: /\b[A-Z]\w*(?:[?!]|\b)/,
    }),
    (e.languages.ruby.string = [
      {
        pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
    ]);
})(Prism);
(Prism.languages.elixir = {
  comment: { pattern: /(^|[^#])#(?![{#]).*/m, lookbehind: !0 },
  regex:
    /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
  string: [
    {
      pattern:
        /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
      greedy: !0,
      inside: {},
    },
    { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
    {
      pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
      inside: {},
    },
  ],
  atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: "symbol" },
  "attr-name": /\w+:(?!:)/,
  capture: {
    pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
    lookbehind: !0,
    alias: "function",
  },
  argument: { pattern: /(^|[^&])&\d+/, lookbehind: !0, alias: "variable" },
  attribute: { pattern: /@[\S]+/, alias: "variable" },
  number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
  keyword:
    /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
  boolean: /\b(?:true|false|nil)\b/,
  operator: [
    /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
    { pattern: /([^<])<(?!<)/, lookbehind: !0 },
    { pattern: /([^>])>(?!>)/, lookbehind: !0 },
  ],
  punctuation: /<<|>>|[.,%\[\]{}()]/,
}),
  Prism.languages.elixir.string.forEach(function (e) {
    e.inside = {
      interpolation: {
        pattern: /#\{[^}]+\}/,
        inside: {
          delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
          rest: Prism.util.clone(Prism.languages.elixir),
        },
      },
    };
  });
(Prism.languages.fsharp = Prism.languages.extend("clike", {
  comment: [
    { pattern: /(^|[^\\])\(\*[\s\S]*?\*\)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  keyword:
    /\b(?:let|return|use|yield)(?:!\B|\b)|\b(abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
  string: {
    pattern:
      /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1)B?/,
    greedy: !0,
  },
  number: [
    /\b-?0x[\da-fA-F]+(?:un|lf|LF)?\b/,
    /\b-?0b[01]+(?:y|uy)?\b/,
    /\b-?(?:\d*\.?\d+|\d+\.)(?:[fFmM]|[eE][+-]?\d+)?\b/,
    /\b-?\d+(?:y|uy|s|us|l|u|ul|L|UL|I)?\b/,
  ],
})),
  Prism.languages.insertBefore("fsharp", "keyword", {
    preprocessor: {
      pattern: /^[^\r\n\S]*#.*/m,
      alias: "property",
      inside: {
        directive: {
          pattern: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/,
          lookbehind: !0,
          alias: "keyword",
        },
      },
    },
  });
(Prism.languages.go = Prism.languages.extend("clike", {
  keyword:
    /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  builtin:
    /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
  boolean: /\b(?:_|iota|nil|true|false)\b/,
  operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
  string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
})),
  delete Prism.languages.go["class-name"];
Prism.languages.graphql = {
  comment: /#.*/,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  boolean: /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
  "attr-name": /[a-z_]\w*(?=\s*:)/i,
  keyword: [
    { pattern: /(fragment\s+(?!on)[a-z_]\w*\s+|\.{3}\s*)on\b/, lookbehind: !0 },
    /\b(?:query|fragment|mutation)\b/,
  ],
  operator: /!|=|\.{3}/,
  punctuation: /[!(){}\[\]:=,]/,
};
!(function (e) {
  var a = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/;
  (e.languages.handlebars = e.languages.extend("markup", {
    handlebars: {
      pattern: a,
      inside: {
        delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
        string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,
        boolean: /\b(?:true|false)\b/,
        block: {
          pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
          lookbehind: !0,
          alias: "keyword",
        },
        brackets: {
          pattern: /\[[^\]]+\]/,
          inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
        },
        punctuation: /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
        variable: /[^!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~\s]+/,
      },
    },
  })),
    e.languages.insertBefore("handlebars", "tag", {
      "handlebars-comment": {
        pattern: /\{\{![\s\S]*?\}\}/,
        alias: ["handlebars", "comment"],
      },
    }),
    e.hooks.add("before-highlight", function (e) {
      "handlebars" === e.language &&
        ((e.tokenStack = []),
        (e.backupCode = e.code),
        (e.code = e.code.replace(a, function (a) {
          for (
            var n = e.tokenStack.length;
            -1 !== e.backupCode.indexOf("___HANDLEBARS" + n + "___");

          )
            ++n;
          return (e.tokenStack[n] = a), "___HANDLEBARS" + n + "___";
        })));
    }),
    e.hooks.add("before-insert", function (e) {
      "handlebars" === e.language &&
        ((e.code = e.backupCode), delete e.backupCode);
    }),
    e.hooks.add("after-highlight", function (a) {
      if ("handlebars" === a.language) {
        for (var n = 0, t = Object.keys(a.tokenStack); n < t.length; ++n) {
          var r = t[n],
            o = a.tokenStack[r];
          a.highlightedCode = a.highlightedCode.replace(
            "___HANDLEBARS" + r + "___",
            e.highlight(o, a.grammar, "handlebars").replace(/\$/g, "$$$$")
          );
        }
        a.element.innerHTML = a.highlightedCode;
      }
    });
})(Prism);
Prism.languages.haskell = {
  comment: {
    pattern:
      /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
    lookbehind: !0,
  },
  char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
  string: {
    pattern:
      /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
    greedy: !0,
  },
  keyword:
    /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
  import_statement: {
    pattern:
      /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
    lookbehind: !0,
    inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
  },
  builtin:
    /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
  number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
  operator:
    /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][\w']*\.)*[_a-z][\w']*`/,
  hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
  constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
  punctuation: /[{}[\];(),.:]/,
};
Prism.languages.ini = {
  comment: /^[ \t]*;.*$/m,
  selector: /^[ \t]*\[.*?\]/m,
  constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
  "attr-value": { pattern: /=.*/, inside: { punctuation: /^[=]/ } },
};
(Prism.languages.java = Prism.languages.extend("clike", {
  keyword:
    /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  number:
    /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
  operator: {
    pattern:
      /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: !0,
  },
})),
  Prism.languages.insertBefore("java", "function", {
    annotation: {
      alias: "punctuation",
      pattern: /(^|[^.])@\w+/,
      lookbehind: !0,
    },
  });
(Prism.languages.json = {
  property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee][+-]?\d+)?)\b/,
  punctuation: /[{}[\]);,]/,
  operator: /:/g,
  boolean: /\b(?:true|false)\b/i,
  null: /\bnull\b/i,
}),
  (Prism.languages.jsonp = Prism.languages.json);
!(function (n) {
  (n.languages.kotlin = n.languages.extend("clike", {
    keyword: {
      pattern:
        /(^|[^.])\b(?:abstract|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|else|enum|final|finally|for|fun|get|if|import|in|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|out|override|package|private|protected|public|reified|return|sealed|set|super|tailrec|this|throw|to|try|val|var|when|where|while)\b/,
      lookbehind: !0,
    },
    function: [/\w+(?=\s*\()/, { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 }],
    number: /\b(?:0[bx][\da-fA-F]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?[fFL]?)\b/,
    operator:
      /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
  })),
    delete n.languages.kotlin["class-name"],
    n.languages.insertBefore("kotlin", "string", {
      "raw-string": { pattern: /("""|''')[\s\S]*?\1/, alias: "string" },
    }),
    n.languages.insertBefore("kotlin", "keyword", {
      annotation: {
        pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
        alias: "builtin",
      },
    }),
    n.languages.insertBefore("kotlin", "function", {
      label: { pattern: /\w+@|@\w+/, alias: "symbol" },
    });
  var e = [
    {
      pattern: /\$\{[^}]+\}/,
      inside: {
        delimiter: { pattern: /^\$\{|\}$/, alias: "variable" },
        rest: n.util.clone(n.languages.kotlin),
      },
    },
    { pattern: /\$\w+/, alias: "variable" },
  ];
  n.languages.kotlin.string.inside = n.languages.kotlin["raw-string"].inside = {
    interpolation: e,
  };
})(Prism);
!(function (a) {
  var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    n = { "equation-command": { pattern: e, alias: "regex" } };
  a.languages.latex = {
    comment: /%.*/m,
    cdata: {
      pattern:
        /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
      lookbehind: !0,
    },
    equation: [
      {
        pattern: /\$(?:\\[\s\S]|[^\\$])*\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
        inside: n,
        alias: "string",
      },
      {
        pattern:
          /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
        inside: n,
        alias: "string",
      },
    ],
    keyword: {
      pattern:
        /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0,
    },
    url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
    headline: {
      pattern:
        /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
      lookbehind: !0,
      alias: "class-name",
    },
    function: { pattern: e, alias: "selector" },
    punctuation: /[[\]{}&]/,
  };
})(Prism);
(Prism.languages.less = Prism.languages.extend("css", {
  comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
  atrule: {
    pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
    inside: { punctuation: /[:()]/ },
  },
  selector: {
    pattern:
      /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
    inside: { variable: /@+[\w-]+/ },
  },
  property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  punctuation: /[{}();:,]/,
  operator: /[+\-*\/]/,
})),
  Prism.languages.insertBefore("less", "punctuation", {
    function: Prism.languages.less.function,
  }),
  Prism.languages.insertBefore("less", "property", {
    variable: [
      { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
      /@@?[\w-]+/,
    ],
    "mixin-usage": {
      pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
      lookbehind: !0,
      alias: "function",
    },
  });
Prism.languages.makefile = {
  comment: {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: !0,
  },
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
  symbol: {
    pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
    inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ },
  },
  variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  keyword: [
    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
    {
      pattern:
        /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
      lookbehind: !0,
    },
  ],
  operator: /(?:::|[?:+!])?=|[|@]/,
  punctuation: /[:;(){}]/,
};
(Prism.languages.markdown = Prism.languages.extend("markup", {})),
  Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
    code: [
      { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
      { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" },
    ],
    title: [
      {
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: "important",
        inside: { punctuation: /==+$|--+$/ },
      },
      {
        pattern: /(^\s*)#+.+/m,
        lookbehind: !0,
        alias: "important",
        inside: { punctuation: /^#+|#+$/ },
      },
    ],
    hr: {
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: "punctuation",
    },
    list: {
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: "punctuation",
    },
    "url-reference": {
      pattern:
        /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: "url",
    },
    bold: {
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^[*_]|[*_]$/ },
    },
    url: {
      pattern:
        /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
      },
    },
  }),
  (Prism.languages.markdown.bold.inside.url = Prism.util.clone(
    Prism.languages.markdown.url
  )),
  (Prism.languages.markdown.italic.inside.url = Prism.util.clone(
    Prism.languages.markdown.url
  )),
  (Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
    Prism.languages.markdown.italic
  )),
  (Prism.languages.markdown.italic.inside.bold = Prism.util.clone(
    Prism.languages.markdown.bold
  ));
Prism.languages.matlab = {
  comment: [/%\{[\s\S]*?\}%/, /%.+/],
  string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
  number: /\b-?(?:\d*\.?\d+(?:[eE][+-]?\d+)?(?:[ij])?|[ij])\b/,
  keyword:
    /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  function: /(?!\d)\w+(?=\s*\()/,
  operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  punctuation: /\.{3}|[.,;\[\](){}!]/,
};
(Prism.languages.nginx = Prism.languages.extend("clike", {
  comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
  keyword:
    /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i,
})),
  Prism.languages.insertBefore("nginx", "keyword", { variable: /\$[a-z_]+/i });
Prism.languages.objectivec = Prism.languages.extend("c", {
  keyword:
    /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  string:
    /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
  operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
});
Prism.languages.perl = {
  comment: [
    { pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m, lookbehind: !0 },
    { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
  ],
  string: [
    {
      pattern:
        /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
      greedy: !0,
    },
    {
      pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
      greedy: !0,
    },
    { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
    { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
    { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
  ],
  regex: [
    {
      pattern:
        /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern:
        /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
      lookbehind: !0,
      greedy: !0,
    },
    {
      pattern:
        /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
      greedy: !0,
    },
  ],
  variable: [
    /[&*$@%]\{\^[A-Z]+\}/,
    /[&*$@%]\^[A-Z_]/,
    /[&*$@%]#?(?=\{)/,
    /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
    /[&*$@%]\d+/,
    /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
  ],
  filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: "symbol" },
  vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: "string" },
  function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
  keyword:
    /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
  number:
    /\b-?(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
  operator:
    /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
  punctuation: /[{}[\];(),:]/,
};
(Prism.languages.php = Prism.languages.extend("clike", {
  string: { pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
  keyword:
    /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
})),
  Prism.languages.insertBefore("php", "class-name", {
    "shell-comment": {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0,
      alias: "comment",
    },
  }),
  Prism.languages.insertBefore("php", "keyword", {
    delimiter: { pattern: /\?>|<\?(?:php|=)?/i, alias: "important" },
    variable: /\$\w+\b/i,
    package: {
      pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
  }),
  Prism.languages.insertBefore("php", "operator", {
    property: { pattern: /(->)[\w]+/, lookbehind: !0 },
  }),
  Prism.languages.markup &&
    (Prism.hooks.add("before-highlight", function (e) {
      "php" === e.language &&
        /(?:<\?php|<\?)/gi.test(e.code) &&
        ((e.tokenStack = []),
        (e.backupCode = e.code),
        (e.code = e.code.replace(
          /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi,
          function (a) {
            for (
              var n = e.tokenStack.length;
              -1 !== e.backupCode.indexOf("___PHP" + n + "___");

            )
              ++n;
            return (e.tokenStack[n] = a), "___PHP" + n + "___";
          }
        )),
        (e.grammar = Prism.languages.markup));
    }),
    Prism.hooks.add("before-insert", function (e) {
      "php" === e.language &&
        e.backupCode &&
        ((e.code = e.backupCode), delete e.backupCode);
    }),
    Prism.hooks.add("after-highlight", function (e) {
      if ("php" === e.language && e.tokenStack) {
        e.grammar = Prism.languages.php;
        for (var a = 0, n = Object.keys(e.tokenStack); a < n.length; ++a) {
          var t = n[a],
            r = e.tokenStack[t];
          e.highlightedCode = e.highlightedCode.replace(
            "___PHP" + t + "___",
            '<span class="token php language-php">' +
              Prism.highlight(r, e.grammar, "php").replace(/\$/g, "$$$$") +
              "</span>"
          );
        }
        e.element.innerHTML = e.highlightedCode;
      }
    }));
(Prism.languages.powershell = {
  comment: [
    { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
    { pattern: /(^|[^`])#.*/, lookbehind: !0 },
  ],
  string: [
    {
      pattern: /"(?:`[\s\S]|[^`"])*"/,
      greedy: !0,
      inside: { function: { pattern: /[^`]\$\(.*?\)/, inside: {} } },
    },
    { pattern: /'(?:[^']|'')*'/, greedy: !0 },
  ],
  namespace: /\[[a-z][\s\S]*?\]/i,
  boolean: /\$(?:true|false)\b/i,
  variable: /\$\w+\b/i,
  function: [
    /\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
    /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
  ],
  keyword:
    /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
  operator: {
    pattern:
      /(\W?)(?:!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
    lookbehind: !0,
  },
  punctuation: /[|{}[\];(),.]/,
}),
  (Prism.languages.powershell.string[0].inside.boolean =
    Prism.languages.powershell.boolean),
  (Prism.languages.powershell.string[0].inside.variable =
    Prism.languages.powershell.variable),
  (Prism.languages.powershell.string[0].inside.function.inside =
    Prism.util.clone(Prism.languages.powershell));
!(function (e) {
  e.languages.pug = {
    comment: {
      pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
      lookbehind: !0,
    },
    "multiline-script": {
      pattern:
        /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
      lookbehind: !0,
      inside: { rest: e.languages.javascript },
    },
    filter: {
      pattern:
        /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
      lookbehind: !0,
      inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
    },
    "multiline-plain-text": {
      pattern:
        /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
      lookbehind: !0,
    },
    markup: {
      pattern: /(^[\t ]*)<.+/m,
      lookbehind: !0,
      inside: { rest: e.languages.markup },
    },
    doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
    "flow-control": {
      pattern:
        /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
      lookbehind: !0,
      inside: {
        each: {
          pattern: /^each .+? in\b/,
          inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ },
        },
        branch: {
          pattern: /^(?:if|unless|else|case|when|default|while)\b/,
          alias: "keyword",
        },
        rest: e.languages.javascript,
      },
    },
    keyword: {
      pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
      lookbehind: !0,
    },
    mixin: [
      {
        pattern: /(^[\t ]*)mixin .+/m,
        lookbehind: !0,
        inside: {
          keyword: /^mixin/,
          function: /\w+(?=\s*\(|\s*$)/,
          punctuation: /[(),.]/,
        },
      },
      {
        pattern: /(^[\t ]*)\+.+/m,
        lookbehind: !0,
        inside: {
          name: { pattern: /^\+\w+/, alias: "function" },
          rest: e.languages.javascript,
        },
      },
    ],
    script: {
      pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
      lookbehind: !0,
      inside: { rest: e.languages.javascript },
    },
    "plain-text": {
      pattern:
        /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
      lookbehind: !0,
    },
    tag: {
      pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
      lookbehind: !0,
      inside: {
        attributes: [
          {
            pattern: /&[^(]+\([^)]+\)/,
            inside: { rest: e.languages.javascript },
          },
          {
            pattern: /\([^)]+\)/,
            inside: {
              "attr-value": {
                pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                lookbehind: !0,
                inside: { rest: e.languages.javascript },
              },
              "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
              punctuation: /[!=(),]+/,
            },
          },
        ],
        punctuation: /:/,
      },
    },
    code: [
      {
        pattern: /(^[\t ]*(?:-|!?=)).+/m,
        lookbehind: !0,
        inside: { rest: e.languages.javascript },
      },
    ],
    punctuation: /[.\-!=|]+/,
  };
  for (
    var t =
        "(^([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+",
      n = [
        { filter: "atpl", language: "twig" },
        { filter: "coffee", language: "coffeescript" },
        "ejs",
        "handlebars",
        "hogan",
        "less",
        "livescript",
        "markdown",
        "mustache",
        "plates",
        { filter: "sass", language: "scss" },
        "stylus",
        "swig",
      ],
      a = {},
      i = 0,
      r = n.length;
    r > i;
    i++
  ) {
    var s = n[i];
    (s = "string" == typeof s ? { filter: s, language: s } : s),
      e.languages[s.language] &&
        (a["filter-" + s.filter] = {
          pattern: RegExp(t.replace("{{filter_name}}", s.filter), "m"),
          lookbehind: !0,
          inside: {
            "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
            rest: e.languages[s.language],
          },
        });
  }
  e.languages.insertBefore("pug", "filter", a);
})(Prism);
Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  "triple-quoted-string": {
    pattern: /("""|''')[\s\S]+?\1/,
    greedy: !0,
    alias: "string",
  },
  string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  keyword:
    /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number:
    /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator:
    /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.typescript = Prism.languages.extend("javascript", {
  keyword:
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|false|true|module|declare|constructor|namespace|abstract|require|type)\b/,
  builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/,
})),
  (Prism.languages.ts = Prism.languages.typescript);
Prism.languages.rust = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  string: [
    { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
    { pattern: /b?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  ],
  keyword:
    /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|struct|super|true|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\b/,
  attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: "attr-name" },
  function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
  "macro-rules": { pattern: /\w+!/, alias: "function" },
  number:
    /\b-?(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
  "closure-params": {
    pattern: /\|[^|]*\|(?=\s*[{-])/,
    inside: { punctuation: /[|:,]/, operator: /[&*]/ },
  },
  punctuation: /[{}[\];(),:]|\.+|->/,
  operator: /[-+*\/%!^=]=?|@|&[&=]?|\|[|=]?|<<?=?|>>?=?/,
};
(Prism.languages.scss = Prism.languages.extend("css", {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  atrule: {
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: { rule: /@[\w-]+/ },
  },
  url: /(?:[-a-z]+-)*url(?=\()/i,
  selector: {
    pattern:
      /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: {
      parent: { pattern: /&/, alias: "important" },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
  },
})),
  Prism.languages.insertBefore("scss", "atrule", {
    keyword: [
      /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
      { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
    ],
  }),
  (Prism.languages.scss.property = {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
    inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
  }),
  Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/,
  }),
  Prism.languages.insertBefore("scss", "function", {
    placeholder: { pattern: /%[-\w]+/, alias: "selector" },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
    boolean: /\b(?:true|false)\b/,
    null: /\bnull\b/,
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: !0,
    },
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.util.clone(
    Prism.languages.scss
  ));
(Prism.languages.scala = Prism.languages.extend("java", {
  keyword:
    /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
  string: [
    { pattern: /"""[\s\S]*?"""/, greedy: !0 },
    { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  ],
  builtin:
    /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
  number: /\b(?:0x[\da-f]*\.?[\da-f]+|\d*\.?\d+e?\d*[dfl]?)\b/i,
  symbol: /'[^\d\s\\]\w*/,
})),
  delete Prism.languages.scala["class-name"],
  delete Prism.languages.scala["function"];
Prism.languages.smalltalk = {
  comment: /"(?:""|[^"])+"/,
  string: /'(?:''|[^'])+'/,
  symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
  "block-arguments": {
    pattern: /(\[\s*):[^\[|]*\|/,
    lookbehind: !0,
    inside: { variable: /:[\da-z]+/i, punctuation: /\|/ },
  },
  "temporary-variables": {
    pattern: /\|[^|]+\|/,
    inside: { variable: /[\da-z]+/i, punctuation: /\|/ },
  },
  keyword: /\b(?:nil|true|false|self|super|new)\b/,
  character: { pattern: /\$./, alias: "string" },
  number: [
    /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
    /(?:\B-|\b)\d+(?:\.\d+)?(?:e-?\d+)?/,
  ],
  operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
  punctuation: /[.;:?\[\](){}]/,
};
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0,
  },
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,
    greedy: !0,
    lookbehind: !0,
  },
  variable: /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
  function:
    /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
  keyword:
    /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATE(?:TIME)?|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITER(?:S)?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
  boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
  operator:
    /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
};
!(function (n) {
  var t = {
    url: /url\((["']?).*?\1\)/i,
    string: {
      pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
      greedy: !0,
    },
    interpolation: null,
    func: null,
    important: /\B!(?:important|optional)\b/i,
    keyword: {
      pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
      lookbehind: !0,
    },
    hexcode: /#[\da-f]{3,6}/i,
    number: /\b\d+(?:\.\d+)?%?/,
    boolean: /\b(?:true|false)\b/,
    operator: [
      /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
    ],
    punctuation: /[{}()\[\];:,]/,
  };
  (t.interpolation = {
    pattern: /\{[^\r\n}:]+\}/,
    alias: "variable",
    inside: n.util.clone(t),
  }),
    (t.func = {
      pattern: /[\w-]+\([^)]*\).*/,
      inside: { function: /^[^(]+/, rest: n.util.clone(t) },
    }),
    (n.languages.stylus = {
      comment: {
        pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
      },
      "atrule-declaration": {
        pattern: /(^\s*)@.+/m,
        lookbehind: !0,
        inside: { atrule: /^@[\w-]+/, rest: t },
      },
      "variable-declaration": {
        pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
        lookbehind: !0,
        inside: { variable: /^\S+/, rest: t },
      },
      statement: {
        pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
        lookbehind: !0,
        inside: { keyword: /^\S+/, rest: t },
      },
      "property-declaration": {
        pattern:
          /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
        lookbehind: !0,
        inside: {
          property: {
            pattern: /^[^\s:]+/,
            inside: { interpolation: t.interpolation },
          },
          rest: t,
        },
      },
      selector: {
        pattern:
          /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
        lookbehind: !0,
        inside: { interpolation: t.interpolation, punctuation: /[{},]/ },
      },
      func: t.func,
      string: t.string,
      interpolation: t.interpolation,
      punctuation: /[{}()\[\];:.]/,
    });
})(Prism);
(Prism.languages.swift = Prism.languages.extend("clike", {
  string: {
    pattern:
      /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
        inside: { delimiter: { pattern: /^\\\(|\)$/, alias: "variable" } },
      },
    },
  },
  keyword:
    /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|Protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
  number:
    /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  atrule:
    /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
  builtin:
    /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
})),
  (Prism.languages.swift.string.inside.interpolation.inside.rest =
    Prism.util.clone(Prism.languages.swift));
Prism.languages.vbnet = Prism.languages.extend("basic", {
  keyword:
    /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDEC|CDBL|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEFAULT|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LINE INPUT|LET|LIB|LIKE|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPERATOR|OPEN|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHORT|SINGLE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|SWAP|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
  comment: [
    { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
    { pattern: /(^|[^\\:])'.*/, lookbehind: !0 },
  ],
});
Prism.languages.yaml = {
  scalar: {
    pattern:
      /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
    lookbehind: !0,
    alias: "string",
  },
  comment: /#.*/,
  key: {
    pattern:
      /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
    lookbehind: !0,
    alias: "atrule",
  },
  directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" },
  datetime: {
    pattern:
      /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: !0,
    alias: "number",
  },
  boolean: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
    alias: "important",
  },
  null: {
    pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
    alias: "important",
  },
  string: {
    pattern:
      /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}))/m,
    lookbehind: !0,
    greedy: !0,
  },
  number: {
    pattern:
      /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+\-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
    lookbehind: !0,
  },
  tag: /![^\s]+/,
  important: /[&*][\w]+/,
  punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
};
!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var e = "line-numbers",
      t = /\n(?!$)/g,
      n = function (e) {
        var n = r(e),
          s = n["white-space"];
        if ("pre-wrap" === s || "pre-line" === s) {
          var l = e.querySelector("code"),
            i = e.querySelector(".line-numbers-rows"),
            a = e.querySelector(".line-numbers-sizer"),
            o = l.textContent.split(t);
          a ||
            ((a = document.createElement("span")),
            (a.className = "line-numbers-sizer"),
            l.appendChild(a)),
            (a.style.display = "block"),
            o.forEach(function (e, t) {
              a.textContent = e || "\n";
              var n = a.getBoundingClientRect().height;
              i.children[t].style.height = n + "px";
            }),
            (a.textContent = ""),
            (a.style.display = "none");
        }
      },
      r = function (e) {
        return e
          ? window.getComputedStyle
            ? getComputedStyle(e)
            : e.currentStyle || null
          : null;
      };
    window.addEventListener("resize", function () {
      Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n);
    }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var r = e.element.parentNode,
            s = /\s*\bline-numbers\b\s*/;
          if (
            r &&
            /pre/i.test(r.nodeName) &&
            (s.test(r.className) || s.test(e.element.className)) &&
            !e.element.querySelector(".line-numbers-rows")
          ) {
            s.test(e.element.className) &&
              (e.element.className = e.element.className.replace(s, " ")),
              s.test(r.className) || (r.className += " line-numbers");
            var l,
              i = e.code.match(t),
              a = i ? i.length + 1 : 1,
              o = new Array(a + 1);
            (o = o.join("<span></span>")),
              (l = document.createElement("span")),
              l.setAttribute("aria-hidden", "true"),
              (l.className = "line-numbers-rows"),
              (l.innerHTML = o),
              r.hasAttribute("data-start") &&
                (r.style.counterReset =
                  "linenumber " +
                  (parseInt(r.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(l),
              n(r),
              Prism.hooks.run("line-numbers", e);
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function (t, n) {
          if ("PRE" === t.tagName && t.classList.contains(e)) {
            var r = t.querySelector(".line-numbers-rows"),
              s = parseInt(t.getAttribute("data-start"), 10) || 1,
              l = s + (r.children.length - 1);
            s > n && (n = s), n > l && (n = l);
            var i = n - s;
            return r.children[i];
          }
        },
      });
  }
})();
