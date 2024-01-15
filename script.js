var Q = function() {
  return Q = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Q.apply(this, arguments);
};
function ce(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, a; r < o; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}

function Br(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}

var Yn = { exports: {} },
  Ot = typeof crypto < 'u' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < 'u' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto)
if (Ot) {
  var Et = new Uint8Array(16)
  Yn.exports = function() {
    return Ot(Et), Et
  };
} else {
  var Dt = new Array(16)
  Yn.exports = function() {
    for (var t = 0, n; t < 16; t++)
      t & 3 || (n = Math.random() * 4294967296), Dt[t] = n >>> ((t & 3) << 3) & 255
    return Dt
  };
}
var Wt = Yn.exports, Qt = []
for (var pn = 0; pn < 256; ++pn)
  Qt[pn] = (pn + 256).toString(16).substr(1)

function Lr(e, t) {
  var n = t || 0, r = Qt
  return [
    r[e[n++]],
    r[e[n++]],
    r[e[n++]],
    r[e[n++]],
    "-",
    r[e[n++]],
    r[e[n++]],
    "-",
    r[e[n++]],
    r[e[n++]],
    "-",
    r[e[n++]],
    r[e[n++]],
    "-",
    r[e[n++]],
    r[e[n++]],
    r[e[n++]],
    r[e[n++]],
    r[e[n++]],
    r[e[n++]]
  ].join("");
}

var Yt = Lr, Hr = Wt, Fr = Yt, Rt, Ln, Hn = 0, Fn = 0

function Mr(e, t, n) {
  var r = t && n || 0, o = t || [];
  e = e || {};
  var a = e.node || Rt, s = e.clockseq !== void 0 ? e.clockseq : Ln
  if (a == null || s == null) {
    var f = Hr()
    a == null && (a = Rt = [
      f[0] | 1,
      f[1],
      f[2],
      f[3],
      f[4],
      f[5]
    ]), s == null && (s = Ln = (f[6] << 8 | f[7]) & 16383);
  }
  var u = e.msecs !== void 0 ? e.msecs : (/* @__PURE__ */ new Date()).getTime(),
    l = e.nsecs !== void 0 ? e.nsecs : Fn + 1, d = u - Hn + (l - Fn) / 1e4
  if (d < 0 && e.clockseq === void 0 && (s = s + 1 & 16383), (d < 0 || u > Hn) && e.nsecs === void 0 && (l = 0), l >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  Hn = u, Fn = l, Ln = s, u += 122192928e5
  var w = ((u & 268435455) * 1e4 + l) % 4294967296;
  o[r++] = w >>> 24 & 255, o[r++] = w >>> 16 & 255, o[r++] = w >>> 8 & 255, o[r++] = w & 255;
  var h = u / 4294967296 * 1e4 & 268435455;
  o[r++] = h >>> 8 & 255, o[r++] = h & 255, o[r++] = h >>> 24 & 15 | 16, o[r++] = h >>> 16 & 255, o[r++] = s >>> 8 | 128, o[r++] = s & 255;
  for (var T = 0; T < 6; ++T)
    o[r + T] = a[T];
  return t || Fr(o)
}

var zr = Mr, Jr = Wt, Xr = Yt

function qr(e, t, n) {
  var r = t && n || 0;
  typeof e == "string" && (t = e === "binary" ? new Array(16) : null, e = null), e = e || {};
  var o = e.random || (e.rng || Jr)()
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, t)
    for (var a = 0; a < 16; ++a)
      t[r + a] = o[a];
  return t || Xr(o)
}

var Wr = qr, Qr = zr, Gt = Wr, et = Gt
et.v1 = Qr
et.v4 = Gt
var se = et
/*!
 * Core functionality for Snowplow JavaScript trackers v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Yr = '3.13.1'

function Gr(e) {
  if (!e)
    return e;
  var t = 4 - e.length % 4;
  switch (t) {
    case 2:
      e += "==";
      break;
    case 3:
      e += "=";
      break;
  }
  var n = e.replace(/-/g, "+").replace(/_/g, "/");
  return Kr(n)
}

function $r(e) {
  if (!e)
    return e;
  var t = Zr(e)
  return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

var de = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

function Zr(e) {
  var t, n, r, o, a, s, f, u, l = 0, d = 0, w = [];
  if (!e)
    return e;
  e = unescape(encodeURIComponent(e));
  do
    t = e.charCodeAt(l++), n = e.charCodeAt(l++), r = e.charCodeAt(l++), u = t << 16 | n << 8 | r, o = u >> 18 & 63, a = u >> 12 & 63, s = u >> 6 & 63, f = u & 63, w[d++] = de.charAt(o) + de.charAt(a) + de.charAt(s) + de.charAt(f)
  while (l < e.length);
  var h = w.join(""), T = e.length % 3;
  return (T ? h.slice(0, T - 3) : h) + "===".slice(T || 3);
}

function Kr(e) {
  var t = function(C) {
    return decodeURIComponent(C.split('').map(function(m) {
      return '%' + ('00' + m.charCodeAt(0).toString(16)).slice(-2)
    }).join(""));
  }, n, r, o, a, s, f, u, l, d = 0, w = 0, h = "", T = [];
  if (!e)
    return e;
  e += "";
  do
    a = de.indexOf(e.charAt(d++)), s = de.indexOf(e.charAt(d++)), f = de.indexOf(e.charAt(d++)), u = de.indexOf(e.charAt(d++)), l = a << 18 | s << 12 | f << 6 | u, n = l >> 16 & 255, r = l >> 8 & 255, o = l & 255, f === 64 ? T[w++] = String.fromCharCode(n) : u === 64 ? T[w++] = String.fromCharCode(n, r) : T[w++] = String.fromCharCode(n, r, o)
  while (d < e.length);
  return h = T.join(""), t(h.replace(/\0+$/, ""));
}

function nt() {
  var e = {}, t = [], n = [], r = [], o, a = function(l, d) {
    d != null && d !== "" && (e[l] = d);
  }, s = function(l) {
    for (var d in l)
      Object.prototype.hasOwnProperty.call(l, d) && a(d, l[d]);
  }, f = function(l, d, w) {
    if (w && $t(w)) {
      var h = { keyIfEncoded: l, keyIfNotEncoded: d, json: w };
      n.push(h), t.push(h);
    }
  }, u = function(l) {
    r.push(l);
  };
  return {
    add: a,
    addDict: s,
    addJson: f,
    addContextEntity: u,
    getPayload: function() {
      return e;
    },
    getJson: function() {
      return t;
    },
    withJsonProcessor: function(l) {
      o = l;
    },
    build: function() {
      return o == null || o(this, n, r), e;
    }
  };
}

function eo(e) {
  return function(t, n, r) {
    for (var o = function(h, T, C) {
      var m = JSON.stringify(h)
      e ? t.add(T, $r(m)) : t.add(C, m)
    }, a = function() {
      var h = t.getPayload();
      if (e ? h.cx : h.co)
        return JSON.parse(e ? Gr(h.cx) : h.co)
    }, s = function(h, T) {
      var C = h || a()
      return C ? C.data = C.data.concat(T.data) : C = T, C
    }, f = void 0, u = 0, l = n; u < l.length; u++) {
      var d = l[u];
      d.keyIfEncoded === "cx" ? f = s(f, d.json) : o(d.json, d.keyIfEncoded, d.keyIfNotEncoded);
    }
    if (n.length = 0, r.length) {
      var w = {
        schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
        data: ce([], r, !0),
      };
      f = s(f, w), r.length = 0;
    }
    f && o(f, "cx", "co");
  };
}

function $t(e) {
  if (!Zt(e))
    return !1;
  for (var t in e)
    if (Object.prototype.hasOwnProperty.call(e, t))
      return !0;
  return !1;
}

function Zt(e) {
  return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor);
}

var hn = 'Snowplow: ', ae;
(function(e) {
  e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info";
})(ae || (ae = {}));
var te = no()

function no(e) {
  e === void 0 && (e = ae.warn)
  function t(s) {
    ae[s] ? e = s : e = ae.warn
  }
  function n(s, f) {
    for (var u = [], l = 2; l < arguments.length; l++)
      u[l - 2] = arguments[l];
    if (e >= ae.error && typeof console < 'u') {
      var d = hn + s + `
`;
      f ? console.error.apply(console, ce([d + `
`, f], u, !1)) : console.error.apply(console, ce([d], u, !1));
    }
  }
  function r(s, f) {
    for (var u = [], l = 2; l < arguments.length; l++)
      u[l - 2] = arguments[l];
    if (e >= ae.warn && typeof console < 'u') {
      var d = hn + s
      f ? console.warn.apply(console, ce([d + `
`, f], u, !1)) : console.warn.apply(console, ce([d], u, !1));
    }
  }
  function o(s) {
    for (var f = [], u = 1; u < arguments.length; u++)
      f[u - 1] = arguments[u];
    e >= ae.debug && typeof console < 'u' && console.debug.apply(console, ce([hn + s], f, !1))
  }
  function a(s) {
    for (var f = [], u = 1; u < arguments.length; u++)
      f[u - 1] = arguments[u];
    e >= ae.info && typeof console < 'u' && console.info.apply(console, ce([hn + s], f, !1))
  }
  return { setLogLevel: t, warn: r, error: n, debug: o, info: a };
}

function to() {
  var e = [], t = [], n = function(r) {
    var o = co(r), a = vo(r), s = [], f = $n(e, r, a, o)
    s.push.apply(s, f);
    var u = ho(t, r, a, o)
    return s.push.apply(s, u), s;
  };
  return {
    getGlobalPrimitives: function() {
      return e;
    },
    getConditionalProviders: function() {
      return t;
    },
    addGlobalContexts: function(r) {
      for (var o = [], a = [], s = 0, f = r; s < f.length; s++) {
        var u = f[s];
        Ut(u) ? o.push(u) : Be(u) && a.push(u)
      }
      e = e.concat(a), t = t.concat(o);
    },
    clearGlobalContexts: function() {
      t = [], e = [];
    },
    removeGlobalContexts: function(r) {
      for (var o = function(u) {
        Ut(u) ? t = t.filter(function(l) {
          return JSON.stringify(l) !== JSON.stringify(u);
        }) : Be(u) && (e = e.filter(function(l) {
          return JSON.stringify(l) !== JSON.stringify(u);
        }));
      }, a = 0, s = r; a < s.length; a++) {
        var f = s[a];
        o(f);
      }
    },
    getApplicableContexts: function(r) {
      return n(r);
    }
  };
}

function ro(e) {
  return {
    addPluginContexts: function(t) {
      var n = t ? ce([], t, !0) : []
      return e.forEach(function(r) {
        try {
          r.contexts && n.push.apply(n, r.contexts());
        } catch (o) {
          te.error('Error adding plugin contexts', o)
        }
      }), n;
    }
  };
}

function oo(e) {
  for (var t, n = [], r = 1; r < arguments.length; r++)
    n[r - 1] = arguments[r];
  return (t = e == null ? void 0 : e.map(function(o) {
    if (typeof o == "function")
      try {
        return o.apply(void 0, n);
      } catch {
        return;
      }
    else
      return o;
  }).filter(Boolean)) !== null && t !== void 0 ? t : [];
}

function io(e) {
  var t = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"), n = t.exec(e);
  if (n !== null)
    return n.slice(1, 6);
}

function ao(e) {
  if (e[0] === "*" || e[1] === "*")
    return !1;
  if (e.slice(2).length > 0) {
    for (var t = !1, n = 0, r = e.slice(2); n < r.length; n++) {
      var o = r[n];
      if (o === "*")
        t = !0;
      else if (t)
        return !1;
    }
    return !0;
  } else if (e.length == 2)
    return !0;
  return !1;
}

function Kt(e) {
  var t = e.split(".");
  return t && t.length > 1 ? ao(t) : !1
}

function er(e) {
  var t = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"), n = t.exec(e);
  if (n !== null && Kt(n[1]))
    return n.slice(1, 6);
}

function Gn(e) {
  var t = er(e)
  if (t) {
    var n = t[0];
    return t.length === 5 && Kt(n)
  }
  return !1;
}

function so(e) {
  return Array.isArray(e) && e.every(function(t) {
    return typeof t == "string";
  });
}

function Nt(e) {
  return so(e) ? e.every(function(t) {
    return Gn(t)
  }) : typeof e == 'string' ? Gn(e) : !1
}
function Ge(e) {
  var t = e;
  return $t(t) && 'schema' in t && 'data' in t ? typeof t.schema == 'string' && typeof t.data == 'object' : !1
}

function uo(e) {
  var t = e, n = 0;
  if (e != null && typeof e == "object" && !Array.isArray(e)) {
    if (Object.prototype.hasOwnProperty.call(t, "accept"))
      if (Nt(t.accept))
        n += 1;
      else
        return !1;
    if (Object.prototype.hasOwnProperty.call(t, "reject"))
      if (Nt(t.reject))
        n += 1;
      else
        return !1;
    return n > 0 && n <= 2;
  }
  return !1;
}
function xn(e) {
  return typeof e == "function" && e.length <= 1;
}
function Be(e) {
  return xn(e) || Ge(e)
}
function nr(e) {
  return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? xn(e[0]) && e[1].every(Be) : xn(e[0]) && Be(e[1]) : !1
}

function tr(e) {
  return Array.isArray(e) && e.length === 2 && uo(e[0]) ? Array.isArray(e[1]) ? e[1].every(Be) : Be(e[1]) : !1
}

function Ut(e) {
  return nr(e) || tr(e)
}

function fo(e, t) {
  var n = 0, r = 0, o = e.accept;
  Array.isArray(o) ? e.accept.some(function(s) {
    return wn(s, t)
  }) && r++ : typeof o == 'string' && wn(o, t) && r++;
  var a = e.reject;
  return Array.isArray(a) ? e.reject.some(function(s) {
    return wn(s, t)
  }) && n++ : typeof a == 'string' && wn(a, t) && n++, r > 0 && n === 0 ? !0 : (r === 0 && n > 0, !1);
}
function wn(e, t) {
  if (!Gn(e))
    return !1;
  var n = er(e), r = io(t)
  if (n && r) {
    if (!lo(n[0], r[0]))
      return !1;
    for (var o = 1; o < 5; o++)
      if (!rr(n[o], r[o]))
        return !1;
    return !0;
  }
  return !1;
}

function lo(e, t) {
  var n = t.split("."), r = e.split(".");
  if (n && r) {
    if (n.length !== r.length)
      return !1;
    for (var o = 0; o < r.length; o++)
      if (!rr(n[o], r[o]))
        return !1;
    return !0;
  }
  return !1;
}

function rr(e, t) {
  return e && t && e === "*" || e === t;
}

function co(e) {
  for (var t = e.getJson(), n = 0, r = t; n < r.length; n++) {
    var o = r[n];
    if (o.keyIfEncoded === "ue_px" && typeof o.json.data == "object") {
      var a = o.json.data.schema;
      if (typeof a == "string")
        return a;
    }
  }
  return "";
}

function vo(e) {
  var t = e.getPayload().e;
  return typeof t == "string" ? t : "";
}

function go(e, t, n, r) {
  var o = void 0;
  try {
    var a = {
      event: t.getPayload(),
      eventType: n,
      eventSchema: r
    };
    return o = e(a), Array.isArray(o) && o.every(Ge) || Ge(o) ? o : void 0;
  } catch {
    o = void 0;
  }
  return o;
}

function or(e) {
  return Array.isArray(e) ? e : Array.of(e);
}

function $n(e, t, n, r) {
  var o, a = or(e), s = function(u) {
    var l = mo(u, t, n, r)
    if (l && l.length !== 0)
      return l;
  }, f = a.map(s);
  return (o = []).concat.apply(o, f.filter(function(u) {
    return u != null && u.filter(Boolean);
  }));
}

function mo(e, t, n, r) {
  if (Ge(e))
    return [e];
  if (xn(e)) {
    var o = go(e, t, n, r)
    if (Ge(o))
      return [o];
    if (Array.isArray(o))
      return o;
  }
}

function po(e, t, n, r) {
  if (nr(e)) {
    var o = e[0], a = !1;
    try {
      var s = {
        event: t.getPayload(),
        eventType: n,
        eventSchema: r
      };
      a = o(s);
    } catch {
      a = !1;
    }
    if (a === !0)
      return $n(e[1], t, n, r)
  } else if (tr(e) && fo(e[0], r))
    return $n(e[1], t, n, r)
  return [];
}

function ho(e, t, n, r) {
  var o, a = or(e), s = function(u) {
    var l = po(u, t, n, r)
    if (l && l.length !== 0)
      return l;
  }, f = a.map(s);
  return (o = []).concat.apply(o, f.filter(function(u) {
    return u != null && u.filter(Boolean);
  }));
}

function wo(e) {
  return e == null ? {
    type: 'dtm',
    value: (/* @__PURE__ */ new Date()).getTime(),
  } : typeof e == 'number' ? { type: 'dtm', value: e } : e.type === 'ttm' ? {
    type: 'ttm',
    value: e.value,
  } : { type: 'dtm', value: e.value || (/* @__PURE__ */ new Date()).getTime() }
}

function yo(e) {
  e === void 0 && (e = {});
  function t(u, l, d) {
    var w = ro(l), h = to(), T = u, C = {}
    function m(v) {
      if (v && v.length)
        return {
          schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
          data: v
        };
    }
    function E(v, P) {
      var H = h.getApplicableContexts(v), R = [];
      return P && P.length && R.push.apply(R, P), H && H.length && R.push.apply(R, H), R
    }

    function _(v, P, H) {
      v.withJsonProcessor(eo(T)), v.add('eid', se.v4()), v.addDict(C)
      var R = wo(H)
      v.add(R.type, R.value.toString());
      var K = E(v, w.addPluginContexts(P)), re = m(K)
      re !== void 0 && v.addJson('cx', 'co', re), l.forEach(function(z) {
        try {
          z.beforeTrack && z.beforeTrack(v)
        } catch(oe) {
          te.error('Plugin beforeTrack', oe)
        }
      }), typeof d == "function" && d(v);
      var Y = v.build();
      return l.forEach(function(z) {
        try {
          z.afterTrack && z.afterTrack(Y)
        } catch(oe) {
          te.error('Plugin afterTrack', oe)
        }
      }), Y;
    }
    function y(v, P) {
      C[v] = P
    }
    var M = {
      track: _,
      addPayloadPair: y,
      getBase64Encoding: function() {
        return T;
      },
      setBase64Encoding: function(v) {
        T = v;
      },
      addPayloadDict: function(v) {
        for (var P in v)
          Object.prototype.hasOwnProperty.call(v, P) && (C[P] = v[P])
      },
      resetPayloadPairs: function(v) {
        C = Zt(v) ? v : {}
      },
      setTrackerVersion: function(v) {
        y("tv", v);
      },
      setTrackerNamespace: function(v) {
        y("tna", v);
      },
      setAppId: function(v) {
        y("aid", v);
      },
      setPlatform: function(v) {
        y("p", v);
      },
      setUserId: function(v) {
        y("uid", v);
      },
      setScreenResolution: function(v, P) {
        y('res', v + 'x' + P)
      },
      setViewport: function(v, P) {
        y('vp', v + 'x' + P)
      },
      setColorDepth: function(v) {
        y("cd", v);
      },
      setTimezone: function(v) {
        y("tz", v);
      },
      setLang: function(v) {
        y("lang", v);
      },
      setIpAddress: function(v) {
        y("ip", v);
      },
      setUseragent: function(v) {
        y("ua", v);
      },
      addGlobalContexts: function(v) {
        h.addGlobalContexts(v);
      },
      clearGlobalContexts: function() {
        h.clearGlobalContexts();
      },
      removeGlobalContexts: function(v) {
        h.removeGlobalContexts(v);
      }
    };
    return M
  }

  var n = e.base64, r = e.corePlugins, o = e.callback, a = r ?? [], s = t(n ?? !0, a, o), f = Q(Q({}, s), {
    addPlugin: function(u) {
    var l, d, w = u.plugin;
      a.push(w), (l = w.logger) === null || l === void 0 || l.call(w, te), (d = w.activateCorePlugin) === null || d === void 0 || d.call(w, f)
  } });
  return a == null || a.forEach(function(u) {
    var l, d;
    (l = u.logger) === null || l === void 0 || l.call(u, te), (d = u.activateCorePlugin) === null || d === void 0 || d.call(u, f)
  }), f;
}

function ir(e) {
  var t = e.event, n = t.schema, r = t.data, o = nt(), a = {
    schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
    data: { schema: n, data: r }
  };
  return o.add("e", "ue"), o.addJson("ue_px", "ue_pr", a), o;
}

function xo(e) {
  var t = e.pageUrl, n = e.pageTitle, r = e.referrer, o = nt()
  return o.add("e", "pv"), o.add("url", t), o.add("page", n), o.add("refr", r), o;
}

function So(e) {
  var t = e.pageUrl, n = e.pageTitle, r = e.referrer, o = e.minXOffset, a = e.maxXOffset, s = e.minYOffset,
    f = e.maxYOffset, u = nt()
  return u.add('e', 'pp'), u.add('url', t), u.add('page', n), u.add('refr', r), o && !isNaN(Number(o)) && u.add('pp_mix', o.toString()), a && !isNaN(Number(a)) && u.add('pp_max', a.toString()), s && !isNaN(Number(s)) && u.add('pp_miy', s.toString()), f && !isNaN(Number(f)) && u.add('pp_may', f.toString()), u
}

function To(e) {
  var t = e.targetUrl, n = e.elementId, r = e.elementClasses, o = e.elementTarget, a = e.elementContent, s = {
    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
    data: bo({ targetUrl: t, elementId: n, elementClasses: r, elementTarget: o, elementContent: a }),
  };
  return ir({ event: s })
}

function bo(e, t) {
  t === void 0 && (t = {});
  var n = {};
  for (var r in e)
    (t[r] || e[r] !== null && typeof e[r] < "u") && (n[r] = e[r]);
  return n;
}

var Co = Yr, ar = { exports: {} }, sr = { exports: {} };
(function() {
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = {
    // Bit-wise rotation left
    rotl: function(n, r) {
      return n << r | n >>> 32 - r;
    },
    // Bit-wise rotation right
    rotr: function(n, r) {
      return n << 32 - r | n >>> r;
    },
    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      if (n.constructor == Number)
        return t.rotl(n, 8) & 16711935 | t.rotl(n, 24) & 4278255360;
      for (var r = 0; r < n.length; r++)
        n[r] = t.endian(n[r]);
      return n;
    },
    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var r = []; n > 0; n--)
        r.push(Math.floor(Math.random() * 256));
      return r;
    },
    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(n) {
      for (var r = [], o = 0, a = 0; o < n.length; o++, a += 8)
        r[a >>> 5] |= n[o] << 24 - a % 32;
      return r;
    },
    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(n) {
      for (var r = [], o = 0; o < n.length * 32; o += 8)
        r.push(n[o >>> 5] >>> 24 - o % 32 & 255);
      return r;
    },
    // Convert a byte array to a hex string
    bytesToHex: function(n) {
      for (var r = [], o = 0; o < n.length; o++)
        r.push((n[o] >>> 4).toString(16)), r.push((n[o] & 15).toString(16));
      return r.join("");
    },
    // Convert a hex string to a byte array
    hexToBytes: function(n) {
      for (var r = [], o = 0; o < n.length; o += 2)
        r.push(parseInt(n.substr(o, 2), 16));
      return r;
    },
    // Convert a byte array to a base-64 string
    bytesToBase64: function(n) {
      for (var r = [], o = 0; o < n.length; o += 3)
        for (var a = n[o] << 16 | n[o + 1] << 8 | n[o + 2], s = 0; s < 4; s++)
          o * 8 + s * 6 <= n.length * 8 ? r.push(e.charAt(a >>> 6 * (3 - s) & 63)) : r.push("=");
      return r.join("");
    },
    // Convert a base-64 string to a byte array
    base64ToBytes: function(n) {
      n = n.replace(/[^A-Z0-9+\/]/ig, "");
      for (var r = [], o = 0, a = 0; o < n.length; a = ++o % 4)
        a != 0 && r.push((e.indexOf(n.charAt(o - 1)) & Math.pow(2, -2 * a + 8) - 1) << a * 2 | e.indexOf(n.charAt(o)) >>> 6 - a * 2);
      return r;
    }
  };
  sr.exports = t
})();
var Io = sr.exports, Zn = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(e) {
      return Zn.bin.stringToBytes(unescape(encodeURIComponent(e)))
    },
    // Convert a byte array to a string
    bytesToString: function(e) {
      return decodeURIComponent(escape(Zn.bin.bytesToString(e)))
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(e) {
      for (var t = [], n = 0; n < e.length; n++)
        t.push(e.charCodeAt(n) & 255);
      return t;
    },
    // Convert a byte array to a string
    bytesToString: function(e) {
      for (var t = [], n = 0; n < e.length; n++)
        t.push(String.fromCharCode(e[n]));
      return t.join("");
    }
  }
}, _t = Zn;
(function() {
  var e = Io, t = _t.utf8, n = _t.bin, r = function(a) {
    a.constructor == String ? a = t.stringToBytes(a) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(a) ? a = Array.prototype.slice.call(a, 0) : Array.isArray(a) || (a = a.toString());
    var s = e.bytesToWords(a), f = a.length * 8, u = [], l = 1732584193, d = -271733879, w = -1732584194, h = 271733878, T = -1009589776;
    s[f >> 5] |= 128 << 24 - f % 32, s[(f + 64 >>> 9 << 4) + 15] = f;
    for (var C = 0; C < s.length; C += 16) {
      for (var m = l, E = d, _ = w, y = h, M = T, v = 0; v < 80; v++) {
        if (v < 16)
          u[v] = s[C + v]
        else {
          var P = u[v - 3] ^ u[v - 8] ^ u[v - 14] ^ u[v - 16]
          u[v] = P << 1 | P >>> 31
        }
        var H = (l << 5 | l >>> 27) + T + (u[v] >>> 0) + (v < 20 ? (d & w | ~d & h) + 1518500249 : v < 40 ? (d ^ w ^ h) + 1859775393 : v < 60 ? (d & w | d & h | w & h) - 1894007588 : (d ^ w ^ h) - 899497514);
        T = h, h = w, w = d << 30 | d >>> 2, d = l, l = H;
      }
      l += m, d += E, w += _, h += y, T += M
    }
    return [l, d, w, h, T];
  }, o = function(a, s) {
    var f = e.wordsToBytes(r(a));
    return s && s.asBytes ? f : s && s.asString ? n.bytesToString(f) : e.bytesToHex(f);
  };
  o._blocksize = 16, o._digestsize = 20, ar.exports = o
})();
var Po = ar.exports
const Ao = /* @__PURE__ */ Br(Po)
/*!
 * Core functionality for Snowplow Browser trackers v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function ko(e) {
  try {
    var t = window.localStorage, n = t.getItem(e + ".expires");
    if (n === null || +n > Date.now())
      return t.getItem(e);
    t.removeItem(e), t.removeItem(e + ".expires");
    return;
  } catch {
    return;
  }
}
function yn(e, t, n) {
  n === void 0 && (n = 63072e3);
  try {
    var r = window.localStorage, o = Date.now() + n * 1e3;
    return r.setItem("".concat(e, ".expires"), o.toString()), r.setItem(e, t), !0;
  } catch {
    return !1;
  }
}

function jt(e) {
  try {
    var t = window.localStorage;
    return t.removeItem(e), t.removeItem(e + ".expires"), !0;
  } catch {
    return !1;
  }
}

function Vt(e) {
  try {
    return window.sessionStorage.getItem(e);
  } catch {
    return;
  }
}

function Oo(e, t) {
  try {
    return window.sessionStorage.setItem(e, t), !0;
  } catch {
    return !1;
  }
}

function ur(e) {
  return !!(e && typeof e.valueOf() == "string");
}
function Bt(e) {
  return Number.isInteger && Number.isInteger(e) || typeof e == 'number' && isFinite(e) && Math.floor(e) === e
}

function Lt(e) {
  if (!ur(e)) {
    e = e.text || "";
    var t = document.getElementsByTagName("title");
    t && t[0] != null && (e = t[0].text);
  }
  return e;
}
function Sn(e) {
  var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), n = t.exec(e);
  return n ? n[1] : e;
}

function Ht(e) {
  var t = e.length;
  return e.charAt(--t) === "." && (e = e.slice(0, t)), e.slice(0, 2) === "*." && (e = e.slice(1)), e;
}

function Mn(e) {
  var t = window, n = $e('referrer', t.location.href) || $e('referer', t.location.href)
  if (n)
    return n;
  if (e)
    return e;
  try {
    if (t.top)
      return t.top.document.referrer;
    if (t.parent)
      return t.parent.document.referrer;
  } catch {
  }
  return document.referrer;
}
function Z(e, t, n, r) {
  if (e.addEventListener)
    return e.addEventListener(t, n, r), !0;
  if (e.attachEvent)
    return e.attachEvent("on" + t, n);
  e["on" + t] = n;
}
function $e(e, t) {
  var n = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(t);
  return n ? decodeURIComponent(n[1].replace(/\+/g, " ")) : null;
}

function Eo(e, t, n) {
  var r = t + "=" + n, o = e.split("#"), a = o[0].split("?"), s = a.shift(), f = a.join("?");
  if (!f)
    f = r;
  else {
    for (var u = !0, l = f.split("&"), d = 0; d < l.length; d++)
      if (l[d].substr(0, t.length + 1) === t + "=") {
        u = !1, l[d] = r, f = l.join("&");
        break;
      }
    u && (f = r + "&" + f);
  }
  return o[0] = s + "?" + f, o.join("#");
}

function Do(e, t) {
  for (var n = window.location.hostname, r = "_sp_root_domain_test_", o = r + (/* @__PURE__ */ new Date()).getTime(), a = "_test_value_" + (/* @__PURE__ */ new Date()).getTime(), s = n.split("."), f = s.length - 2; f >= 0; f--) {
    var u = s.slice(f).join(".");
    if (Te(o, a, 0, '/', u, e, t), Te(o) === a) {
      Tn(o, u, e, t)
      for (var l = Ro(r), d = 0; d < l.length; d++)
        Tn(l[d], u, e, t)
      return u;
    }
  }
  return n;
}
function Tn(e, t, n, r) {
  Te(e, '', -1, '/', t, n, r)
}

function Ro(e) {
  for (var t = document.cookie.split("; "), n = [], r = 0; r < t.length; r++)
    t[r].substring(0, e.length) === e && n.push(t[r]);
  return n;
}
function Te(e, t, n, r, o, a, s) {
  return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(t ?? "") + (n ? "; Expires=" + new Date(+/* @__PURE__ */ new Date() + n * 1e3).toUTCString() : "") + (r ? "; Path=" + r : "") + (o ? "; Domain=" + o : "") + (a ? "; SameSite=" + a : "") + (s ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0]);
}

function No(e) {
  if (e == null || typeof e != "object" || Array.isArray(e))
    return function() {
      return !0;
    };
  var t = Object.prototype.hasOwnProperty.call(e, 'allowlist'), n = jo(e)
  return _o(e, function(r) {
    return Uo(r, n) === t
  });
}

function fr(e) {
  return e.className.match(/\S+/g) || [];
}

function Uo(e, t) {
  for (var n = fr(e), r = 0, o = n; r < o.length; r++) {
    var a = o[r];
    if (t[a])
      return !0;
  }
  return !1;
}

function _o(e, t) {
  return e.hasOwnProperty("filter") && e.filter ? e.filter : t;
}
function jo(e) {
  var t = {}, n = e.allowlist || e.denylist;
  if (n) {
    Array.isArray(n) || (n = [n]);
    for (var r = 0; r < n.length; r++)
      t[n[r]] = !0;
  }
  return t;
}

function Vo() {
  try {
    return !!window.localStorage;
  } catch {
    return !0;
  }
}

function Bo() {
  var e = "modernizr";
  if (!Vo())
    return !1;
  try {
    var t = window.localStorage;
    return t.setItem(e, e), t.removeItem(e), !0;
  } catch {
    return !1;
  }
}

var Lo = 'iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0',
  Ho = 'iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0',
  Fo = 'iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2',
  Mo = 'iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4'

function zo(e, t, n, r, o, a, s, f, u, l, d, w, h, T, C, m) {
  var E = !1, _, y = []
  r = typeof r == "string" ? r.toLowerCase() : r;
  var M = r === !0 || r === 'beacon' || r === 'true',
    v = !!(M && window.navigator && window.navigator.sendBeacon && !Fe(window.navigator.userAgent)), P = v && M,
    H = r === 'get', R = !!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
    K = !H && R && (r === 'post' || M), re = K ? o : '/i',
    Y = 'snowplowOutQueue_'.concat(e, '_').concat(K ? 'post2' : 'get')
  if (M && (h = {}), a = n && Bo() && K && a || 1, n)
    try {
      var z = window.localStorage.getItem(Y)
      y = z ? JSON.parse(z) : []
    } catch {
    }
  Array.isArray(y) || (y = []), t.outQueues.push(y), R && a > 1 && t.bufferFlushers.push(function(p) {
    E || ee(p)
  });
  function oe(p) {
    var b = "?", S = { co: !0, cx: !0 }, x = !0;
    for (var I in p)
      p.hasOwnProperty(I) && !S.hasOwnProperty(I) && (x ? x = !1 : b += '&', b += encodeURIComponent(I) + '=' + encodeURIComponent(p[I]))
    for (var A in S)
      p.hasOwnProperty(A) && S.hasOwnProperty(A) && (b += '&' + A + '=' + encodeURIComponent(p[A]))
    return b;
  }
  function Ae(p) {
    var b = Object.keys(p).map(function(S) {
      return [S, p[S]]
    }).reduce(function(S, x) {
      var I = x[0], A = x[1]
      return S[I] = A.toString(), S
    }, {});
    return {
      evt: b,
      bytes: ke(JSON.stringify(b)),
    };
  }
  function ke(p) {
    for (var b = 0, S = 0; S < p.length; S++) {
      var x = p.charCodeAt(S)
      x <= 127 ? b += 1 : x <= 2047 ? b += 2 : x >= 55296 && x <= 57343 ? (b += 4, S++) : x < 65535 ? b += 3 : b += 4;
    }
    return b;
  }
  var ge = function(p) {
    return typeof p[0] == 'object'
  };
  function Oe(p, b) {
    var S = me(b, !0, !1)
    S.send(pe(he([p.evt])))
  }
  function Le(p, b) {
    _ = b + re
    var S = function(D, Ee) {
      return te.warn('Event (' + D + 'B) too big, max is ' + Ee)
    };
    if (K) {
      var x = Ae(p)
      if (x.bytes >= s) {
        S(x.bytes, s), Oe(x, _)
        return;
      } else
        y.push(x);
    } else {
      var I = oe(p)
      if (f > 0) {
        var A = we(I), J = ke(A)
        if (J >= f) {
          if (S(J, f), R) {
            var x = Ae(p), X = b + o
            Oe(x, X)
          }
          return;
        }
      }
      y.push(I)
    }
    var L = !1
    n && (L = yn(Y, JSON.stringify(y.slice(0, l)))), !E && (!L || y.length >= a) && ee()
  }
  function ee(p) {
    for (p === void 0 && (p = !1); y.length && typeof y[0] != "string" && typeof y[0] != "object";)
      y.shift();
    if (y.length < 1) {
      E = !1;
      return;
    }
    if (!ur(_))
      throw "No collector configured";
    if (E = !0, R) {
      var b = function(V) {
        for (var q = 0, en = 0; q < V.length && (en += V[q].bytes, !(en >= s));)
          q += 1
        return q
      }, S = void 0, x, I;
      ge(y) ? (S = _, x = me(S, !0, p), I = b(y)) : (S = we(y[0]), x = me(S, !1, p), I = 1)
      var A = setTimeout(function() {
        x.abort(), E = !1;
      }, d), J = function(V) {
        for (var q = 0; q < V; q++)
          y.shift();
        n && yn(Y, JSON.stringify(y.slice(0, l)))
      }, X = function(V) {
        J(V), ee()
      };
      if (x.onreadystatechange = function() {
        x.readyState === 4 && x.status >= 200 && (clearTimeout(A), x.status < 300 ? X(I) : (He(x.status) || (te.error('Status '.concat(x.status, ', will not retry.')), J(I)), E = !1))
      }, !ge(y))
        x.send();
      else {
        var L = y.slice(0, I)
        if (L.length > 0) {
          var D = !1, Ee = L.map(function(V) {
            return V.evt
          });
          if (P) {
            var ie = new Blob([pe(he(Ee))], {
              type: "application/json"
            });
            try {
              D = navigator.sendBeacon(S, ie)
            } catch {
              D = !1;
            }
          }
          D === !0 ? X(I) : x.send(pe(he(Ee)))
        }
      }
    } else if (!w && !ge(y)) {
      var De = new Image(1, 1), j = !0
      De.onload = function() {
        j && (j = !1, y.shift(), n && yn(Y, JSON.stringify(y.slice(0, l))), ee())
      }, De.onerror = function() {
        j && (j = !1, E = !1)
      }, De.src = we(y[0]), setTimeout(function() {
        j && E && (j = !1, ee())
      }, d);
    } else
      E = !1;
  }
  function He(p) {
    return p >= 200 && p < 300 ? !1 : C.includes(p) ? !0 : !m.includes(p)
  }
  function me(p, b, S) {
    var x = new XMLHttpRequest();
    b ? (x.open('POST', p, !S), x.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')) : x.open('GET', p, !S), x.withCredentials = T, w && x.setRequestHeader('SP-Anonymous', '*')
    for (var I in h)
      Object.prototype.hasOwnProperty.call(h, I) && x.setRequestHeader(I, h[I])
    return x;
  }
  function pe(p) {
    return JSON.stringify({
      schema: Mo,
      data: p,
    });
  }
  function he(p) {
    for (var b = (/* @__PURE__ */ new Date()).getTime().toString(), S = 0; S < p.length; S++)
      p[S].stm = b
    return p
  }
  function we(p) {
    return u ? _ + p.replace('?', '?stm=' + (/* @__PURE__ */ new Date()).getTime() + '&') : _ + p
  }
  return {
    enqueueRequest: Le,
    executeQueue: function() {
      E || ee()
    },
    setUseLocalStorage: function(p) {
      n = p
    },
    setAnonymousTracking: function(p) {
      w = p
    },
    setCollectorUrl: function(p) {
      _ = p + re
    },
    setBufferSize: function(p) {
      a = p
    }
  };
  function Fe(p) {
    return b(13, p) || S(10, 15, p) && x(p)
    function b(A, J) {
      var X = J.match('(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/')
      return X && X.length ? parseInt(X[0]) <= A : !1
    }
    function S(A, J, X) {
      var L = X.match('(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/')
      return L && L.length ? parseInt(L[0]) <= A || parseInt(L[0]) === A && parseInt(L[1]) <= J : !1
    }
    function x(A) {
      return A.match('Version/.* Safari/') && !I(A)
    }
    function I(A) {
      return A.match("Chrom(e|ium)");
    }
  }
}

function Jo(e, t) {
  var n = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"), r = n.exec(e);
  return r && (r == null ? void 0 : r.length) > 1 ? $e(t, r[1]) : null
}

function Ft(e, t, n) {
  var r;
  return e === 'translate.googleusercontent.com' ? (n === '' && (n = t), t = (r = Jo(t, 'u')) !== null && r !== void 0 ? r : '', e = Sn(t)) : (e === 'cc.bingj.com' || // Bing & Yahoo
    e === 'webcache.googleusercontent.com') && (t = document.links[0].href, e = Sn(t)), [e, t, n]
}

var lr = 0, be = 1, Xo = 2, Ze = 3, tt = 4, cr = 5, ve = 6, Ve = 7, Ce = 8, Ie = 9, ue = 10

function qo() {
  var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
  return e;
}

function Wo(e, t, n, r) {
  var o = /* @__PURE__ */ new Date(), a = Math.round(o.getTime() / 1e3), s;
  e ? (s = e.split("."), s.unshift("0")) : s = [
    // cookies disabled
    "1",
    // Domain user ID
    t,
    // Creation timestamp - seconds since Unix epoch
    a,
    // visitCount - 0 = no previous visit
    r,
    // Current visit timestamp
    a,
    // Last visit timestamp - blank meaning no previous visit
    "",
    // Session ID
    n
  ], (!s[ve] || s[ve] === 'undefined') && (s[ve] = se.v4()), (!s[Ve] || s[Ve] === 'undefined') && (s[Ve] = ''), (!s[Ce] || s[Ce] === 'undefined') && (s[Ce] = ''), (!s[Ie] || s[Ie] === 'undefined') && (s[Ie] = ''), (!s[ue] || s[ue] === 'undefined') && (s[ue] = 0);
  var f = function(d, w) {
    var h = parseInt(d);
    return isNaN(h) ? w : h;
  }, u = function(d) {
    return d ? f(d, void 0) : void 0;
  }, l = [
    s[lr],
    s[be],
    f(s[Xo], a),
    f(s[Ze], r),
    f(s[tt], a),
    u(s[cr]),
    s[ve],
    s[Ve],
    s[Ce],
    u(s[Ie]),
    f(s[ue], 0),
  ];
  return l;
}

function Qo(e, t) {
  var n;
  return e[be] ? n = e[be] : t ? (n = '', e[be] = n) : (n = se.v4(), e[be] = n), n
}
function Qe(e, t) {
  t === void 0 && (t = { memorizedVisitCount: 1 });
  var n = t.memorizedVisitCount;
  Kn(e) ? (e[Ve] = e[ve], e[cr] = e[tt], e[Ze]++) : e[Ze] = n
  var r = se.v4()
  return e[ve] = r, e[ue] = 0, e[Ce] = '', e[Ie] = void 0, r
}

function zn(e) {
  e[tt] = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)
}

function Yo(e, t) {
  if (e[ue] === 0) {
    var n = t.build();
    e[Ce] = n.eid
    var r = n.dtm || n.ttm;
    e[Ie] = r ? parseInt(r) : void 0
  }
}

function Go(e) {
  e[ue] += 1
}

function $o(e) {
  return e.shift(), e.join(".");
}

function Mt(e, t, n) {
  var r = e[Ie], o = {
    userId: n ? '00000000-0000-0000-0000-000000000000' : e[be],
    sessionId: e[ve],
    eventIndex: e[ue],
    sessionIndex: e[Ze],
    previousSessionId: n ? null : e[Ve] || null,
    storageMechanism: t == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
    firstEventId: e[Ce] || null,
    firstEventTimestamp: r ? new Date(r).toISOString() : null
  };
  return o;
}
function Jn(e) {
  return e[ve]
}

function Zo(e) {
  return e[be]
}

function Xn(e) {
  return e[Ze]
}

function Kn(e) {
  return e[lr] === '0'
}

function Ko(e) {
  return e[ue]
}

var Ke = 'x'

function qn() {
  return {
    viewport: Wn(ei()),
    documentSize: Wn(ni()),
    resolution: Wn(ti()),
    colorDepth: screen.colorDepth,
    devicePixelRatio: window.devicePixelRatio,
    cookiesEnabled: window.navigator.cookieEnabled,
    online: window.navigator.onLine,
    browserLanguage: navigator.language || navigator.userLanguage,
    documentLanguage: document.documentElement.lang,
    webdriver: window.navigator.webdriver,
    deviceMemory: window.navigator.deviceMemory,
    hardwareConcurrency: window.navigator.hardwareConcurrency
  };
}

function ei() {
  var e, t;
  if ("innerWidth" in window)
    e = window.innerWidth, t = window.innerHeight;
  else {
    var n = document.documentElement || document.body;
    e = n.clientWidth, t = n.clientHeight;
  }
  return e >= 0 && t >= 0 ? e + Ke + t : null
}

function ni() {
  var e = document.documentElement, t = document.body, n = t ? Math.max(t.offsetHeight, t.scrollHeight) : 0,
    r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
    o = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, n)
  return isNaN(r) || isNaN(o) ? '' : r + Ke + o
}

function ti() {
  return screen.width + Ke + screen.height
}

function Wn(e) {
  return e && e.split(Ke).map(function(t) {
    return Math.floor(Number(t));
  }).join(Ke);
}

function ri(e, t, n, r, o, a) {
  a === void 0 && (a = {});
  var s = [], f = function(d, w, h, T, C, m) {
    var E, _, y, M, v, P, H, R, K, re, Y, z, oe, Ae, ke, ge, Oe, Le, ee, He, me, pe, he, we, Fe, p, b, S
    m.eventMethod = (E = m.eventMethod) !== null && E !== void 0 ? E : 'post'
    var x = function(i) {
      var c;
      return (c = i.stateStorageStrategy) !== null && c !== void 0 ? c : "cookieAndLocalStorage";
      }, I = function(i) {
      var c, g;
      return typeof i.anonymousTracking == "boolean" ? !1 : (g = ((c = i.anonymousTracking) === null || c === void 0 ? void 0 : c.withSessionTracking) === !0) !== null && g !== void 0 ? g : !1;
    }, A = function(i) {
      var c, g;
      return typeof i.anonymousTracking == "boolean" ? !1 : (g = ((c = i.anonymousTracking) === null || c === void 0 ? void 0 : c.withServerAnonymisation) === !0) !== null && g !== void 0 ? g : !1;
      }, J = function(i) {
      return !!i.anonymousTracking;
      },
      X = (y = (_ = m == null ? void 0 : m.contexts) === null || _ === void 0 ? void 0 : _.browser) !== null && y !== void 0 ? y : !1,
      L = (v = (M = m == null ? void 0 : m.contexts) === null || M === void 0 ? void 0 : M.webPage) !== null && v !== void 0 ? v : !0;
    s.push(Or()), L && s.push(Ar()), X && s.push(kr()), s.push.apply(s, (P = m.plugins) !== null && P !== void 0 ? P : [])
    var D = yo({
        base64: m.encodeBase64,
      corePlugins: s,
        callback: Cr,
      }), Ee = document.characterSet || document.charset, ie = Ft(window.location.hostname, window.location.href, Mn()),
      De = Ht(ie[0]), j = ie[1], V = ie[2], q, en = (H = m.platform) !== null && H !== void 0 ? H : 'web', In = Tt(T),
      gr = (R = m.postPath) !== null && R !== void 0 ? R : '/com.snowplowanalytics.snowplow/tp2',
      mr = (K = m.appId) !== null && K !== void 0 ? K : '', nn, Re = document.title, Me,
      pr = (re = m.resetActivityTrackingOnPageView) !== null && re !== void 0 ? re : !0, rt, ot,
      hr = (Y = m.cookieName) !== null && Y !== void 0 ? Y : '_sp_',
      ze = (z = m.cookieDomain) !== null && z !== void 0 ? z : void 0, Pn = '/',
      tn = (oe = m.cookieSameSite) !== null && oe !== void 0 ? oe : 'None',
      rn = (Ae = m.cookieSecure) !== null && Ae !== void 0 ? Ae : !0,
      it = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
      at = typeof m.respectDoNotTrack < 'u' ? m.respectDoNotTrack && (it === 'yes' || it === '1') : !1, An,
      st = (ke = m.cookieLifetime) !== null && ke !== void 0 ? ke : 63072e3,
      ut = (ge = m.sessionCookieTimeout) !== null && ge !== void 0 ? ge : 1800, Ne = I(m), kn = A(m), ne = J(m),
      k = x(m), on, On = (/* @__PURE__ */ new Date()).getTime(), an, sn, un, fn, ft, ln, G, $ = 1, ye,
      fe = zo(d, C, k == 'localStorage' || k == 'cookieAndLocalStorage', m.eventMethod, gr, (Oe = m.bufferSize) !== null && Oe !== void 0 ? Oe : 1, (Le = m.maxPostBytes) !== null && Le !== void 0 ? Le : 4e4, (ee = m.maxGetBytes) !== null && ee !== void 0 ? ee : 0, (He = m.useStm) !== null && He !== void 0 ? He : !0, (me = m.maxLocalStorageQueueSize) !== null && me !== void 0 ? me : 1e3, (pe = m.connectionTimeout) !== null && pe !== void 0 ? pe : 5e3, kn, (he = m.customHeaders) !== null && he !== void 0 ? he : {}, (we = m.withCredentials) !== null && we !== void 0 ? we : !0, (Fe = m.retryStatusCodes) !== null && Fe !== void 0 ? Fe : [], ((p = m.dontRetryStatusCodes) !== null && p !== void 0 ? p : []).concat([400, 401, 403, 410, 422])),
      lt = !1, ct = !1, W = {
      enabled: !1,
      installed: !1,
      configurations: {}
      }, wr = (S = (b = m.contexts) === null || b === void 0 ? void 0 : b.session) !== null && S !== void 0 ? S : !1, cn,
      dn = m.onSessionUpdateCallback, En = !1;
    m.hasOwnProperty('discoverRootDomain') && m.discoverRootDomain && (ze = Do(tn, rn))
    var vn = qn(), yr = vn.browserLanguage, xr = vn.resolution, Sr = vn.colorDepth, Tr = vn.cookiesEnabled
    D.setTrackerVersion(h), D.setTrackerNamespace(w), D.setAppId(mr), D.setPlatform(en), D.addPayloadPair('cookie', Tr ? '1' : '0'), D.addPayloadPair('cs', Ee), D.addPayloadPair('lang', yr), D.addPayloadPair('res', xr), D.addPayloadPair('cd', Sr), mt(), St(), m.crossDomainLinker && vt(m.crossDomainLinker)
    function xe() {
      ie = Ft(window.location.hostname, window.location.href, Mn()), ie[1] !== j && (V = Mn(j)), De = Ht(ie[0]), j = ie[1]
    }
    function dt(i) {
      var c = (/* @__PURE__ */ new Date()).getTime(), g = i.currentTarget
      g != null && g.href && (g.href = Eo(g.href, '_sp', ln + '.' + c))
    }

    function vt(i) {
      for (var c = 0; c < document.links.length; c++) {
        var g = document.links[c];
        !g.spDecorationEnabled && i(g) && (Z(g, 'click', dt, !0), Z(g, 'mousedown', dt, !0), g.spDecorationEnabled = !0)
      }
    }
    function Se(i) {
      var c;
      return rt && (c = new RegExp('#.*'), i = i.replace(c, '')), ot && (c = new RegExp('[{}]', 'g'), i = i.replace(c, '')), i
    }

    function gt(i) {
      var c = new RegExp("^([a-z]+):"), g = c.exec(i);
      return g ? g[1] : null;
    }

    function br(i, c) {
      var g = gt(c), N
      return g ? c : c.slice(0, 1) === '/' ? gt(i) + '://' + Sn(i) + c : (i = Se(i), (N = i.indexOf('?')) >= 0 && (i = i.slice(0, N)), (N = i.lastIndexOf('/')) !== i.length - 1 && (i = i.slice(0, N + 1)), i + c)
    }

    function Cr(i) {
      at || cn || fe.enqueueRequest(i.build(), In)
    }

    function Ue(i) {
      return hr + i + '.' + ft
    }

    function Dn(i) {
      var c = Ue(i)
      if (k == "localStorage")
        return ko(c)
      if (k == "cookie" || k == "cookieAndLocalStorage")
        return Te(c)
    }

    function mt() {
      xe(), ft = Ao((ze || De) + (Pn || '/')).slice(0, 4)
    }
    function Je() {
      var i = /* @__PURE__ */ new Date();
      on = i.getTime()
    }

    function Ir() {
      Pr(), Je()
    }

    function pt() {
      var i = document.documentElement;
      return i ? [i.scrollLeft || window.pageXOffset, i.scrollTop || window.pageYOffset] : [0, 0];
    }

    function ht() {
      var i = pt(), c = i[0]
      an = c, sn = c
      var g = i[1];
      un = g, fn = g
    }

    function Pr() {
      var i = pt(), c = i[0]
      c < an ? an = c : c > sn && (sn = c)
      var g = i[1];
      g < un ? un = g : g > fn && (fn = g)
    }
    function gn(i) {
      return Math.round(i);
    }

    function Rn() {
      var i = Ue('ses'), c = '*'
      return wt(i, c, ut)
    }

    function Nn(i) {
      var c = Ue('id'), g = $o(i)
      return wt(c, g, st)
    }

    function wt(i, c, g) {
      return ne && !Ne ? !1 : k == 'localStorage' ? yn(i, c, g) : k == 'cookie' || k == 'cookieAndLocalStorage' ? (Te(i, c, g, Pn, ze, tn, rn), document.cookie.indexOf(''.concat(i, '=')) !== -1) : !1
    }
    function yt(i) {
      var c = Ue('id'), g = Ue('ses')
      jt(c), jt(g), Tn(c, ze, tn, rn), Tn(g, ze, tn, rn), i != null && i.preserveSession || (G = se.v4(), $ = 1), i != null && i.preserveUser || (ln = ne ? '' : se.v4(), ye = null)
    }

    function xt(i) {
      i && i.stateStorageStrategy && (m.stateStorageStrategy = i.stateStorageStrategy, k = x(m)), ne = J(m), Ne = I(m), kn = A(m), fe.setUseLocalStorage(k == 'localStorage' || k == 'cookieAndLocalStorage'), fe.setAnonymousTracking(kn)
    }

    function St() {
      if (!(ne && !Ne)) {
        var i = k != 'none' && !!Dn('ses'), c = Xe()
        ln = Qo(c, ne), i ? G = Jn(c) : G = Qe(c), $ = Xn(c), k != 'none' && (Rn(), zn(c), Nn(c))
      }
    }
    function Xe() {
      if (k == "none")
        return qo()
      var i = Dn('id') || void 0
      return Wo(i, ln, G, $)
    }

    function Tt(i) {
      return i.indexOf("http") === 0 ? i : (document.location.protocol === "https:" ? "https" : "http") + "://" + i;
    }
    function bt() {
      (!lt || C.pageViewId == null) && (C.pageViewId = se.v4())
    }

    function Un() {
      return C.pageViewId == null && (C.pageViewId = se.v4()), C.pageViewId
    }

    function Ct() {
      if (k === 'none' || ne || !L)
        return null;
      var i = '_sp_tab_id', c = Vt(i)
      return c || (Oo(i, se.v4()), c = Vt(i)), c || null
    }

    function Ar() {
      return {
        contexts: function() {
          return [
            {
              schema: Lo,
              data: {
                id: Un(),
              }
            }
          ];
        }
      };
    }

    function kr() {
      return {
        contexts: function() {
          return [
            {
              schema: Ho,
              data: Q(Q({}, qn()), { tabId: Ct() }),
            }
          ];
        }
      };
    }

    function Or() {
      var i = function(g) {
        return ne ? null : g
      }, c = function(g) {
        return Ne ? g : i(g)
      };
      return {
        beforeTrack: function(g) {
          var N = Dn('ses'), O = Xe(), le = Ko(O) === 0
          if (An ? cn = !!Te(An) : cn = !1, at || cn) {
            yt()
            return;
          }
          Kn(O) ? (!N && k != 'none' ? G = Qe(O) : G = Jn(O), $ = Xn(O)) : (/* @__PURE__ */ new Date()).getTime() - On > ut * 1e3 && ($++, G = Qe(O, {
            memorizedVisitCount: $,
          })), zn(O), Yo(O, g), Go(O)
          var F = qn(), _e = F.viewport, qe = F.documentSize
          g.add('vp', _e), g.add('ds', qe), g.add('vid', c($)), g.add('sid', c(G)), g.add('duid', i(Zo(O))), g.add('uid', i(ye)), xe(), g.add('refr', Se(q || V)), g.add('url', Se(nn || j))
          var We = Mt(O, k, ne)
          if (wr && (!ne || Ne) && Er(g, We), k != 'none') {
            Nn(O)
            var jn = Rn();
            (!N || le) && jn && dn && !En && (dn(We), En = !1)
          }
          On = (/* @__PURE__ */ new Date()).getTime()
        }
      };
    }

    function Er(i, c) {
      var g = {
        schema: Fo,
        data: c
      };
      i.addContextEntity(g);
    }

    function Dr() {
      var i = Xe()
      if (Kn(i) ? (k != 'none' ? G = Qe(i) : G = Jn(i), $ = Xn(i)) : ($++, G = Qe(i, {
        memorizedVisitCount: $,
      })), zn(i), k != 'none') {
        var c = Mt(i, k, ne)
        Nn(i)
        var g = Rn()
        g && dn && (En = !0, dn(c))
      }
      On = (/* @__PURE__ */ new Date()).getTime()
    }

    function _n(i, c) {
      return (i || []).concat(c ? c() : []);
    }

    function Rr(i) {
      var c = i.title, g = i.context, N = i.timestamp, O = i.contextCallback;
      xe(), ct && bt(), ct = !0, Re = document.title, Me = c
      var le = Lt(Me || Re)
      D.track(xo({
        pageUrl: Se(nn || j),
        pageTitle: le,
        referrer: Se(q || V),
      }), _n(g, O), N);
      var F = /* @__PURE__ */ new Date(), _e = !1
      if (W.enabled && !W.installed) {
        W.installed = !0, _e = !0
        var qe = {
          update: function() {
            if (typeof window < "u" && typeof window.addEventListener == "function") {
              var je = !1, mn = Object.defineProperty({}, 'passive', {
                get: function() {
                  je = !0
                },
                set: function() {
                }
              }), At = function() {
              };
              window.addEventListener('testPassiveEventSupport', At, mn), window.removeEventListener('testPassiveEventSupport', At, mn), qe.hasSupport = je
            }
          }
        };
        qe.update()
        var We = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== void 0 ? 'mousewheel' : 'DOMMouseScroll'
        Object.prototype.hasOwnProperty.call(qe, 'hasSupport') ? Z(document, We, Je, { passive: !0 }) : Z(document, We, Je), ht()
        var jn = [
          "click",
          "mouseup",
          "mousedown",
          "mousemove",
          "keypress",
          "keydown",
          "keyup",
          "touchend",
          "touchstart"
        ], jr = ['resize', 'focus', 'blur'], Vn = function(Vr, je) {
          return je === void 0 && (je = Je), function(mn) {
            return Z(document, mn, je)
          };
        };
        jn.forEach(Vn(document)), jr.forEach(Vn(window)), Vn(window, Ir)('scroll')
      }
      if (W.enabled && (pr || _e)) {
        on = F.getTime()
        var Pt = void 0
        for (Pt in W.configurations) {
          var Bn = W.configurations[Pt]
          Bn && (window.clearInterval(Bn.activityInterval), Nr(Bn, g, O))
        }
      }
    }

    function Nr(i, c, g) {
      var N = function(F, _e) {
        xe(), F({
          context: _e,
          pageViewId: Un(),
          minXOffset: an,
          minYOffset: un,
          maxXOffset: sn,
          maxYOffset: fn,
        }), ht()
      }, O = function() {
        var F = /* @__PURE__ */ new Date()
        on + i.configMinimumVisitLength > F.getTime() && N(i.callback, _n(c, g)), i.activityInterval = window.setInterval(le, i.configHeartBeatTimer)
      }, le = function() {
        var F = /* @__PURE__ */ new Date()
        on + i.configHeartBeatTimer > F.getTime() && N(i.callback, _n(c, g))
      };
      i.configMinimumVisitLength != 0 ? i.activityInterval = window.setTimeout(O, i.configMinimumVisitLength) : i.activityInterval = window.setInterval(le, i.configHeartBeatTimer)
    }

    function It(i) {
      var c = i.minimumVisitLength, g = i.heartbeatDelay, N = i.callback;
      if (Bt(c) && Bt(g))
        return {
          configMinimumVisitLength: c * 1e3,
          configHeartBeatTimer: g * 1e3,
          callback: N
        };
      te.error('Activity tracking minimumVisitLength & heartbeatDelay must be integers')
    }

    function Ur(i) {
      var c = i.context, g = i.minXOffset, N = i.minYOffset, O = i.maxXOffset, le = i.maxYOffset, F = document.title
      F !== Re && (Re = F, Me = void 0), D.track(So({
        pageUrl: Se(nn || j),
        pageTitle: Lt(Me || Re),
        referrer: Se(q || V),
        minXOffset: gn(g),
        maxXOffset: gn(O),
        minYOffset: gn(N),
        maxYOffset: gn(le),
      }), c);
    }

    var _r = {
      getDomainSessionIndex: function() {
        return $
      },
      getPageViewId: Un,
      getTabId: Ct,
      newSession: Dr,
      getCookieName: function(i) {
        return Ue(i)
      },
      getUserId: function() {
        return ye
      },
      getDomainUserId: function() {
        return Xe()[1]
      },
      getDomainUserInfo: function() {
        return Xe()
      },
      setReferrerUrl: function(i) {
        q = i
      },
      setCustomUrl: function(i) {
        xe(), nn = br(j, i)
      },
      setDocumentTitle: function(i) {
        Re = document.title, Me = i
      },
      discardHashTag: function(i) {
        rt = i
      },
      discardBrace: function(i) {
        ot = i
      },
      setCookiePath: function(i) {
        Pn = i, mt()
      },
      setVisitorCookieTimeout: function(i) {
        st = i
      },
      crossDomainLinker: function(i) {
        vt(i)
      },
      enableActivityTracking: function(i) {
        W.configurations.pagePing || (W.enabled = !0, W.configurations.pagePing = It(Q(Q({}, i), { callback: Ur })))
      },
      enableActivityTrackingCallback: function(i) {
        W.configurations.callback || (W.enabled = !0, W.configurations.callback = It(i))
      },
      updatePageActivity: function() {
        Je()
      },
      setOptOutCookie: function(i) {
        An = i
      },
      setUserId: function(i) {
        ye = i
      },
      setUserIdFromLocation: function(i) {
        xe(), ye = $e(i, j)
      },
      setUserIdFromReferrer: function(i) {
        xe(), ye = $e(i, V)
      },
      setUserIdFromCookie: function(i) {
        ye = Te(i)
      },
      setCollectorUrl: function(i) {
        In = Tt(i), fe.setCollectorUrl(In)
      },
      setBufferSize: function(i) {
        fe.setBufferSize(i)
      },
      flushBuffer: function(i) {
        i === void 0 && (i = {}), fe.executeQueue(), i.newBufferSize && fe.setBufferSize(i.newBufferSize)
      },
      trackPageView: function(i) {
        i === void 0 && (i = {}), Rr(i)
      },
      preservePageViewId: function() {
        lt = !0
      },
      disableAnonymousTracking: function(i) {
        m.anonymousTracking = !1, xt(i), St(), fe.executeQueue()
      },
      enableAnonymousTracking: function(i) {
        var c;
        m.anonymousTracking = (c = i && (i == null ? void 0 : i.options)) !== null && c !== void 0 ? c : !0, xt(i), Ne || bt()
      },
      clearUserData: yt,
    };
    return Q(Q({}, _r), { id: d, namespace: w, core: D, sharedState: C })
  }, u = f(e, t, n, r, o, a), l = Q(Q({}, u), {
    addPlugin: function(d) {
    var w, h;
    l.core.addPlugin(d), (h = (w = d.plugin).activateBrowserPlugin) === null || h === void 0 || h.call(w, l);
  } });
  return s.forEach(function(d) {
    var w;
    (w = d.activateBrowserPlugin) === null || w === void 0 || w.call(d, l);
  }), l;
}
var Ye = {};
function bn(e, t) {
  try {
    ii(e ?? ai()).forEach(t)
  } catch (n) {
    te.error('Function failed', n)
  }
}

function oi(e, t, n, r, o, a) {
  return Ye.hasOwnProperty(e) ? null : (Ye[e] = ri(e, t, n, r, o, a), Ye[e])
}

function ii(e) {
  return si(e, Ye)
}

function ai() {
  return Object.keys(Ye);
}

function si(e, t) {
  for (var n = [], r = 0, o = e; r < o.length; r++) {
    var a = o[r];
    t.hasOwnProperty(a) ? n.push(t[a]) : te.warn(a + ' not configured')
  }
  return n;
}

var ui = (
  /** @class */
  function() {
    function e() {
      this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = [];
    }
    return e;
  }()
);

function fi() {
  var e = new ui(), t = document, n = window
  function r() {
    t.visibilityState == "hidden" && e.bufferFlushers.forEach(function(f) {
      f(!1);
    });
  }
  function o() {
    e.bufferFlushers.forEach(function(f) {
      f(!1);
    });
  }
  function a() {
    var f;
    if (!e.hasLoaded)
      for (e.hasLoaded = !0, f = 0; f < e.registeredOnLoadHandlers.length; f++)
        e.registeredOnLoadHandlers[f]();
    return !0;
  }
  function s() {
    t.addEventListener ? t.addEventListener("DOMContentLoaded", function f() {
      t.removeEventListener("DOMContentLoaded", f, !1), a();
    }) : t.attachEvent && t.attachEvent("onreadystatechange", function f() {
      t.readyState === "complete" && (t.detachEvent("onreadystatechange", f), a());
    }), Z(n, 'load', a, !1);
  }

  return t.visibilityState && Z(t, 'visibilitychange', r, !1), Z(n, 'beforeunload', o, !1), document.readyState === 'loading' ? s() : a(), e
}
/*!
 * Browser tracker for Snowplow v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function li(e, t) {
  bn(t, function(n) {
    n.setReferrerUrl(e);
  });
}

function ci(e, t) {
  bn(t, function(n) {
    n.enableActivityTracking(e);
  });
}

function di(e, t) {
  bn(t, function(n) {
    n.trackPageView(e);
  });
}

function dr(e, t) {
  bn(t, function(n) {
    n.core.track(ir({ event: e.event }), e.context, e.timestamp)
  });
}

var zt = typeof window < 'u' ? fi() : void 0

function vi(e, t, n) {
  if (n === void 0 && (n = {}), zt)
    return oi(e, e, 'js-'.concat(Co), t, zt, n)
}
/*!
 * Link Click tracking for Snowplow v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Pe = {}, B = {}

function gi() {
  return {
    activateBrowserPlugin: function(e) {
      Pe[e.id] = e;
    }
  };
}

function mi(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = Object.keys(Pe)), t.forEach(function(n) {
    Pe[n] && (Pe[n].sharedState.hasLoaded ? (Xt(e, n), qt(n)) : Pe[n].sharedState.registeredOnLoadHandlers.push(function() {
      Xt(e, n), qt(n)
    }));
  });
}

function Jt(e, t, n) {
  for (var r, o, a, s, f, u; (r = t.parentElement) !== null && r != null && (o = t.tagName.toUpperCase()) !== "A" && o !== "AREA"; )
    t = r;
  var l = t;
  if (l.href != null) {
    var d = l.hostname || Sn(l.href), w = d.toLowerCase(), h = l.href.replace(d, w),
      T = new RegExp('^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):', 'i')
    T.test(h) || (a = l.id, s = fr(l), f = l.target, u = B[e.id].linkTrackingContent ? l.innerHTML : void 0, h = unescape(h), e.core.track(To({
      targetUrl: h,
      elementId: a,
      elementClasses: s,
      elementTarget: f,
      elementContent: u
    }), oo(n, t)));
  }
}

function Qn(e, t) {
  return function(n) {
    var r, o;
    n = n || window.event, r = n.which || n.button, o = n.target || n.srcElement, n.type === 'click' ? o && Jt(Pe[e], o, t) : n.type === 'mousedown' ? (r === 1 || r === 2) && o ? (B[e].lastButton = r, B[e].lastTarget = o) : B[e].lastButton = B[e].lastTarget = null : n.type === 'mouseup' && (r === B[e].lastButton && o === B[e].lastTarget && Jt(Pe[e], o, t), B[e].lastButton = B[e].lastTarget = null)
  };
}

function pi(e, t) {
  B[e].linkTrackingPseudoClicks ? (Z(t, 'mouseup', Qn(e, B[e].linkTrackingContext), !1), Z(t, 'mousedown', Qn(e, B[e].linkTrackingContext), !1)) : Z(t, 'click', Qn(e, B[e].linkTrackingContext), !1)
}

function Xt(e, t) {
  var n = e === void 0 ? {} : e, r = n.options, o = n.pseudoClicks, a = n.trackContent, s = n.context;
  B[t] = {
    linkTrackingContent: a,
    linkTrackingContext: s,
    linkTrackingPseudoClicks: o,
    linkTrackingFilter: No(r),
  };
}

function qt(e) {
  var t, n, r = document.links, o;
  for (o = 0; o < r.length; o++)
    !((n = (t = B[e]).linkTrackingFilter) === null || n === void 0) && n.call(t, r[o]) && !r[o][e] && (pi(e, r[o]), r[o][e] = !0)
}

const U = window.jobmatix.p || {}, vr = window.jobmatix.q || [], hi = 'https://pixel.jobmatix.app',
  wi = ['https://unpkg.com/@jobmatix.com/pixel/script.min.js', 'https://unpkg.com/@jobmatix.com/pixel/jm.min.js', './script.min.js'],
  yi = ['production', 'local', 'development', 'demo', 'uat'],
  xi = ['applicant', 'apply_start', 'job_alert', 'resume', 'register'], Si = {
    type: 'conversion_type',
  }, Ti = {
    enableActivityTracking: ci,
    setReferrerUrl: li,
    trackPageView: di,
    trackSelfDescribingEvent: dr,
    enableLinkClickTracking: mi,
    conversion: bi,
  };
(() => {
  var t
  if (U != null && U.pixel_id)
    return
  const e = wi.map((n) => document.querySelector(`script[src="${n}"]`)).filter((n) => n)
  U.pixel_id = ((t = e == null ? void 0 : e[0]) == null ? void 0 : t.getAttribute('id')) || ''
})();
(() => {
  if (U != null && U.environment || (U.environment = 'production'), !(U != null && U.pixel_id))
    throw new Error('Pixel ID not found')
  if (!yi.includes(U == null ? void 0 : U.environment))
    throw new Error('Environment not accepted')
})();
vi('jm', hi, {
  'jobmatix-platform-pixel': U.pixel_id,
  plugins: [gi()],
  eventMethod: "post",
  platform: "web",
  cookieName: '_jm_',
  cookieSameSite: "Lax",
  contexts: {
    webPage: !0,
    performanceTiming: !0
  }
});
window.jobmatix = (e, ...t) => {
  try {
    const n = Ti[e]
    n(...t)
  } catch {
    console.error(`Function ${e} not found`)
  }
};
vr.forEach((e) => {
  jobmatix(...e)
});

function Cn(...e) {
  vr.some((n) => n[0] === e[0]) || jobmatix(...e)
}

Cn('enableActivityTracking', { minimumVisitLength: 10, heartbeatDelay: 10 })
Cn('enableLinkClickTracking')
Cn('setReferrerUrl', document.referrer)
Cn('trackPageView', {
  context: [{
    schema: 'iglu:com.jobmatix/jobmatix_platform_pixel/jsonschema/1-0-0',
    params: U,
  }]
});

function bi(e) {
  try {
    if (!(e != null && e.type))
      throw new Error('Conversion type not found')
    if (!xi.includes(e.type))
      throw new Error('Conversion type not accepted')
    const t = {}
    Object.keys(e).forEach((n) => {
      const r = Si[n] || n
      e[n] && (t[r] = String(e[n]))
    }), dr({
      event: {
        schema: 'iglu:com.jobmatix/conversion/jsonschema/1-0-0',
        data: t,
      }
    });
  } catch(t) {
    console.error(t)
  }
}
