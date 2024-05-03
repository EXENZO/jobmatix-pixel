var J = function() {
  return J = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, J.apply(this, arguments);
};
function re(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, a; r < o; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Hr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Kn = { exports: {} }, Nt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (Nt) {
  var Ut = new Uint8Array(16);
  Kn.exports = function() {
    return Nt(Ut), Ut;
  };
} else {
  var Rt = new Array(16);
  Kn.exports = function() {
    for (var t = 0, n; t < 16; t++)
      t & 3 || (n = Math.random() * 4294967296), Rt[t] = n >>> ((t & 3) << 3) & 255;
    return Rt;
  };
}
var Zt = Kn.exports, Kt = [];
for (var yn = 0; yn < 256; ++yn)
  Kt[yn] = (yn + 256).toString(16).substr(1);
function Mr(e, t) {
  var n = t || 0, r = Kt;
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
var qt = Mr, zr = Zt, Fr = qt, jt, zn, Fn = 0, Jn = 0;
function Jr(e, t, n) {
  var r = t && n || 0, o = t || [];
  e = e || {};
  var a = e.node || jt, s = e.clockseq !== void 0 ? e.clockseq : zn;
  if (a == null || s == null) {
    var f = zr();
    a == null && (a = jt = [
      f[0] | 1,
      f[1],
      f[2],
      f[3],
      f[4],
      f[5]
    ]), s == null && (s = zn = (f[6] << 8 | f[7]) & 16383);
  }
  var u = e.msecs !== void 0 ? e.msecs : (/* @__PURE__ */ new Date()).getTime(), l = e.nsecs !== void 0 ? e.nsecs : Jn + 1, d = u - Fn + (l - Jn) / 1e4;
  if (d < 0 && e.clockseq === void 0 && (s = s + 1 & 16383), (d < 0 || u > Fn) && e.nsecs === void 0 && (l = 0), l >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  Fn = u, Jn = l, zn = s, u += 122192928e5;
  var w = ((u & 268435455) * 1e4 + l) % 4294967296;
  o[r++] = w >>> 24 & 255, o[r++] = w >>> 16 & 255, o[r++] = w >>> 8 & 255, o[r++] = w & 255;
  var h = u / 4294967296 * 1e4 & 268435455;
  o[r++] = h >>> 8 & 255, o[r++] = h & 255, o[r++] = h >>> 24 & 15 | 16, o[r++] = h >>> 16 & 255, o[r++] = s >>> 8 | 128, o[r++] = s & 255;
  for (var b = 0; b < 6; ++b)
    o[r + b] = a[b];
  return t || Fr(o);
}
var Xr = Jr, Qr = Zt, Wr = qt;
function Yr(e, t, n) {
  var r = t && n || 0;
  typeof e == "string" && (t = e === "binary" ? new Array(16) : null, e = null), e = e || {};
  var o = e.random || (e.rng || Qr)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, t)
    for (var a = 0; a < 16; ++a)
      t[r + a] = o[a];
  return t || Wr(o);
}
var Gr = Yr, $r = Xr, er = Gr, rt = er;
rt.v1 = $r;
rt.v4 = er;
var oe = rt;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.19.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Zr = "3.19.0";
function Kr(e) {
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
  return no(n);
}
function qr(e) {
  if (!e)
    return e;
  var t = eo(e);
  return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
var ve = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function eo(e) {
  var t, n, r, o, a, s, f, u, l = 0, d = 0, w = [];
  if (!e)
    return e;
  e = unescape(encodeURIComponent(e));
  do
    t = e.charCodeAt(l++), n = e.charCodeAt(l++), r = e.charCodeAt(l++), u = t << 16 | n << 8 | r, o = u >> 18 & 63, a = u >> 12 & 63, s = u >> 6 & 63, f = u & 63, w[d++] = ve.charAt(o) + ve.charAt(a) + ve.charAt(s) + ve.charAt(f);
  while (l < e.length);
  var h = w.join(""), b = e.length % 3;
  return (b ? h.slice(0, b - 3) : h) + "===".slice(b || 3);
}
function no(e) {
  var t = function(A) {
    return decodeURIComponent(A.split("").map(function(p) {
      return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  }, n, r, o, a, s, f, u, l, d = 0, w = 0, h = "", b = [];
  if (!e)
    return e;
  e += "";
  do
    a = ve.indexOf(e.charAt(d++)), s = ve.indexOf(e.charAt(d++)), f = ve.indexOf(e.charAt(d++)), u = ve.indexOf(e.charAt(d++)), l = a << 18 | s << 12 | f << 6 | u, n = l >> 16 & 255, r = l >> 8 & 255, o = l & 255, f === 64 ? b[w++] = String.fromCharCode(n) : u === 64 ? b[w++] = String.fromCharCode(n, r) : b[w++] = String.fromCharCode(n, r, o);
  while (d < e.length);
  return h = b.join(""), t(h.replace(/\0+$/, ""));
}
function ot() {
  var e = {}, t = [], n = [], r = [], o, a = function(l, d) {
    d != null && d !== "" && (e[l] = d);
  }, s = function(l) {
    for (var d in l)
      Object.prototype.hasOwnProperty.call(l, d) && a(d, l[d]);
  }, f = function(l, d, w) {
    if (w && nr(w)) {
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
function to(e) {
  return function(t, n, r) {
    for (var o = function(h, b, A) {
      var p = JSON.stringify(h);
      e ? t.add(b, qr(p)) : t.add(A, p);
    }, a = function() {
      var h = t.getPayload();
      if (e ? h.cx : h.co)
        return JSON.parse(e ? Kr(h.cx) : h.co);
    }, s = function(h, b) {
      var A = h || a();
      return A ? A.data = A.data.concat(b.data) : A = b, A;
    }, f = void 0, u = 0, l = n; u < l.length; u++) {
      var d = l[u];
      d.keyIfEncoded === "cx" ? f = s(f, d.json) : o(d.json, d.keyIfEncoded, d.keyIfNotEncoded);
    }
    if (n.length = 0, r.length) {
      var w = {
        schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
        data: re([], r, !0)
      };
      f = s(f, w), r.length = 0;
    }
    f && o(f, "cx", "co");
  };
}
function nr(e) {
  if (!tr(e))
    return !1;
  for (var t in e)
    if (Object.prototype.hasOwnProperty.call(e, t))
      return !0;
  return !1;
}
function tr(e) {
  return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor);
}
var xn = "Snowplow: ", te;
(function(e) {
  e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info";
})(te || (te = {}));
var ne = ro();
function ro(e) {
  e === void 0 && (e = te.warn);
  function t(s) {
    te[s] ? e = s : e = te.warn;
  }
  function n(s, f) {
    for (var u = [], l = 2; l < arguments.length; l++)
      u[l - 2] = arguments[l];
    if (e >= te.error && typeof console < "u") {
      var d = xn + s + `
`;
      f ? console.error.apply(console, re([d + `
`, f], u, !1)) : console.error.apply(console, re([d], u, !1));
    }
  }
  function r(s, f) {
    for (var u = [], l = 2; l < arguments.length; l++)
      u[l - 2] = arguments[l];
    if (e >= te.warn && typeof console < "u") {
      var d = xn + s;
      f ? console.warn.apply(console, re([d + `
`, f], u, !1)) : console.warn.apply(console, re([d], u, !1));
    }
  }
  function o(s) {
    for (var f = [], u = 1; u < arguments.length; u++)
      f[u - 1] = arguments[u];
    e >= te.debug && typeof console < "u" && console.debug.apply(console, re([xn + s], f, !1));
  }
  function a(s) {
    for (var f = [], u = 1; u < arguments.length; u++)
      f[u - 1] = arguments[u];
    e >= te.info && typeof console < "u" && console.info.apply(console, re([xn + s], f, !1));
  }
  return { setLogLevel: t, warn: r, error: n, debug: o, info: a };
}
function oo() {
  var e = [], t = [], n = function(r) {
    var o = go(r), a = mo(r), s = [], f = et(e, r, a, o);
    s.push.apply(s, f);
    var u = yo(t, r, a, o);
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
        Bt(u) ? o.push(u) : ze(u) && a.push(u);
      }
      e = e.concat(a), t = t.concat(o);
    },
    clearGlobalContexts: function() {
      t = [], e = [];
    },
    removeGlobalContexts: function(r) {
      for (var o = function(u) {
        Bt(u) ? t = t.filter(function(l) {
          return JSON.stringify(l) !== JSON.stringify(u);
        }) : ze(u) && (e = e.filter(function(l) {
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
function io(e) {
  return {
    addPluginContexts: function(t) {
      var n = t ? re([], t, !0) : [];
      return e.forEach(function(r) {
        try {
          r.contexts && n.push.apply(n, r.contexts());
        } catch (o) {
          ne.error("Error adding plugin contexts", o);
        }
      }), n;
    }
  };
}
function ao(e) {
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
function so(e) {
  var t = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"), n = t.exec(e);
  if (n !== null)
    return n.slice(1, 6);
}
function uo(e) {
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
function rr(e) {
  var t = e.split(".");
  return t && t.length > 1 ? uo(t) : !1;
}
function or(e) {
  var t = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"), n = t.exec(e);
  if (n !== null && rr(n[1]))
    return n.slice(1, 6);
}
function qn(e) {
  var t = or(e);
  if (t) {
    var n = t[0];
    return t.length === 5 && rr(n);
  }
  return !1;
}
function fo(e) {
  return Array.isArray(e) && e.every(function(t) {
    return typeof t == "string";
  });
}
function Vt(e) {
  return fo(e) ? e.every(function(t) {
    return qn(t);
  }) : typeof e == "string" ? qn(e) : !1;
}
function en(e) {
  var t = e;
  return nr(t) && "schema" in t && "data" in t ? typeof t.schema == "string" && typeof t.data == "object" : !1;
}
function lo(e) {
  var t = e, n = 0;
  if (e != null && typeof e == "object" && !Array.isArray(e)) {
    if (Object.prototype.hasOwnProperty.call(t, "accept"))
      if (Vt(t.accept))
        n += 1;
      else
        return !1;
    if (Object.prototype.hasOwnProperty.call(t, "reject"))
      if (Vt(t.reject))
        n += 1;
      else
        return !1;
    return n > 0 && n <= 2;
  }
  return !1;
}
function bn(e) {
  return typeof e == "function" && e.length <= 1;
}
function ze(e) {
  return bn(e) || en(e);
}
function ir(e) {
  return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? bn(e[0]) && e[1].every(ze) : bn(e[0]) && ze(e[1]) : !1;
}
function ar(e) {
  return Array.isArray(e) && e.length === 2 && lo(e[0]) ? Array.isArray(e[1]) ? e[1].every(ze) : ze(e[1]) : !1;
}
function Bt(e) {
  return ir(e) || ar(e);
}
function co(e, t) {
  var n = 0, r = 0, o = e.accept;
  Array.isArray(o) ? e.accept.some(function(s) {
    return Tn(s, t);
  }) && r++ : typeof o == "string" && Tn(o, t) && r++;
  var a = e.reject;
  return Array.isArray(a) ? e.reject.some(function(s) {
    return Tn(s, t);
  }) && n++ : typeof a == "string" && Tn(a, t) && n++, r > 0 && n === 0 ? !0 : (r === 0 && n > 0, !1);
}
function Tn(e, t) {
  if (!qn(e))
    return !1;
  var n = or(e), r = so(t);
  if (n && r) {
    if (!vo(n[0], r[0]))
      return !1;
    for (var o = 1; o < 5; o++)
      if (!sr(n[o], r[o]))
        return !1;
    return !0;
  }
  return !1;
}
function vo(e, t) {
  var n = t.split("."), r = e.split(".");
  if (n && r) {
    if (n.length !== r.length)
      return !1;
    for (var o = 0; o < r.length; o++)
      if (!sr(n[o], r[o]))
        return !1;
    return !0;
  }
  return !1;
}
function sr(e, t) {
  return e && t && e === "*" || e === t;
}
function go(e) {
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
function mo(e) {
  var t = e.getPayload().e;
  return typeof t == "string" ? t : "";
}
function po(e, t, n, r) {
  var o = void 0;
  try {
    var a = {
      event: t.getPayload(),
      eventType: n,
      eventSchema: r
    };
    return o = e(a), Array.isArray(o) && o.every(en) || en(o) ? o : void 0;
  } catch {
    o = void 0;
  }
  return o;
}
function ur(e) {
  return Array.isArray(e) ? e : Array.of(e);
}
function et(e, t, n, r) {
  var o, a = ur(e), s = function(u) {
    var l = ho(u, t, n, r);
    if (l && l.length !== 0)
      return l;
  }, f = a.map(s);
  return (o = []).concat.apply(o, f.filter(function(u) {
    return u != null && u.filter(Boolean);
  }));
}
function ho(e, t, n, r) {
  if (en(e))
    return [e];
  if (bn(e)) {
    var o = po(e, t, n, r);
    if (en(o))
      return [o];
    if (Array.isArray(o))
      return o;
  }
}
function wo(e, t, n, r) {
  if (ir(e)) {
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
      return et(e[1], t, n, r);
  } else if (ar(e) && co(e[0], r))
    return et(e[1], t, n, r);
  return [];
}
function yo(e, t, n, r) {
  var o, a = ur(e), s = function(u) {
    var l = wo(u, t, n, r);
    if (l && l.length !== 0)
      return l;
  }, f = a.map(s);
  return (o = []).concat.apply(o, f.filter(function(u) {
    return u != null && u.filter(Boolean);
  }));
}
function xo(e) {
  return e == null ? { type: "dtm", value: (/* @__PURE__ */ new Date()).getTime() } : typeof e == "number" ? { type: "dtm", value: e } : e.type === "ttm" ? { type: "ttm", value: e.value } : { type: "dtm", value: e.value || (/* @__PURE__ */ new Date()).getTime() };
}
function To(e) {
  e === void 0 && (e = {});
  function t(u, l, d) {
    var w = io(l), h = oo(), b = u, A = {};
    function p(v) {
      if (v && v.length)
        return {
          schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
          data: v
        };
    }
    function K(v, C) {
      var S = h.getApplicableContexts(v), R = [];
      return C && C.length && R.push.apply(R, C), S && S.length && R.push.apply(R, S), R;
    }
    function B(v, C, S) {
      v.withJsonProcessor(to(b)), v.add("eid", oe.v4()), v.addDict(A);
      var R = xo(S);
      v.add(R.type, R.value.toString());
      var q = K(v, w.addPluginContexts(C)), ae = p(q);
      ae !== void 0 && v.addJson("cx", "co", ae), l.forEach(function(X) {
        try {
          X.beforeTrack && X.beforeTrack(v);
        } catch (M) {
          ne.error("Plugin beforeTrack", M);
        }
      }), typeof d == "function" && d(v);
      var se = v.build();
      return l.forEach(function(X) {
        try {
          X.afterTrack && X.afterTrack(se);
        } catch (M) {
          ne.error("Plugin afterTrack", M);
        }
      }), se;
    }
    function P(v, C) {
      A[v] = C;
    }
    var D = {
      track: B,
      addPayloadPair: P,
      getBase64Encoding: function() {
        return b;
      },
      setBase64Encoding: function(v) {
        b = v;
      },
      addPayloadDict: function(v) {
        for (var C in v)
          Object.prototype.hasOwnProperty.call(v, C) && (A[C] = v[C]);
      },
      resetPayloadPairs: function(v) {
        A = tr(v) ? v : {};
      },
      setTrackerVersion: function(v) {
        P("tv", v);
      },
      setTrackerNamespace: function(v) {
        P("tna", v);
      },
      setAppId: function(v) {
        P("aid", v);
      },
      setPlatform: function(v) {
        P("p", v);
      },
      setUserId: function(v) {
        P("uid", v);
      },
      setScreenResolution: function(v, C) {
        P("res", v + "x" + C);
      },
      setViewport: function(v, C) {
        P("vp", v + "x" + C);
      },
      setColorDepth: function(v) {
        P("cd", v);
      },
      setTimezone: function(v) {
        P("tz", v);
      },
      setLang: function(v) {
        P("lang", v);
      },
      setIpAddress: function(v) {
        P("ip", v);
      },
      setUseragent: function(v) {
        P("ua", v);
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
    return D;
  }
  var n = e.base64, r = e.corePlugins, o = e.callback, a = r ?? [], s = t(n ?? !0, a, o), f = J(J({}, s), { addPlugin: function(u) {
    var l, d, w = u.plugin;
    a.push(w), (l = w.logger) === null || l === void 0 || l.call(w, ne), (d = w.activateCorePlugin) === null || d === void 0 || d.call(w, f);
  } });
  return a == null || a.forEach(function(u) {
    var l, d;
    (l = u.logger) === null || l === void 0 || l.call(u, ne), (d = u.activateCorePlugin) === null || d === void 0 || d.call(u, f);
  }), f;
}
function fr(e) {
  var t = e.event, n = t.schema, r = t.data, o = ot(), a = {
    schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
    data: { schema: n, data: r }
  };
  return o.add("e", "ue"), o.addJson("ue_px", "ue_pr", a), o;
}
function So(e) {
  var t = e.pageUrl, n = e.pageTitle, r = e.referrer, o = ot();
  return o.add("e", "pv"), o.add("url", t), o.add("page", n), o.add("refr", r), o;
}
function bo(e) {
  var t = e.pageUrl, n = e.pageTitle, r = e.referrer, o = e.minXOffset, a = e.maxXOffset, s = e.minYOffset, f = e.maxYOffset, u = ot();
  return u.add("e", "pp"), u.add("url", t), u.add("page", n), u.add("refr", r), o && !isNaN(Number(o)) && u.add("pp_mix", o.toString()), a && !isNaN(Number(a)) && u.add("pp_max", a.toString()), s && !isNaN(Number(s)) && u.add("pp_miy", s.toString()), f && !isNaN(Number(f)) && u.add("pp_may", f.toString()), u;
}
function Io(e) {
  var t = e.targetUrl, n = e.elementId, r = e.elementClasses, o = e.elementTarget, a = e.elementContent, s = {
    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
    data: Co({ targetUrl: t, elementId: n, elementClasses: r, elementTarget: o, elementContent: a })
  };
  return fr({ event: s });
}
function Co(e, t) {
  t === void 0 && (t = {});
  var n = {};
  for (var r in e)
    (t[r] || e[r] !== null && typeof e[r] < "u") && (n[r] = e[r]);
  return n;
}
var Po = Zr, lr = { exports: {} }, cr = { exports: {} };
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
  cr.exports = t;
})();
var Ao = cr.exports, nt = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(e) {
      return nt.bin.stringToBytes(unescape(encodeURIComponent(e)));
    },
    // Convert a byte array to a string
    bytesToString: function(e) {
      return decodeURIComponent(escape(nt.bin.bytesToString(e)));
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
}, Lt = nt;
(function() {
  var e = Ao, t = Lt.utf8, n = Lt.bin, r = function(a) {
    a.constructor == String ? a = t.stringToBytes(a) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(a) ? a = Array.prototype.slice.call(a, 0) : Array.isArray(a) || (a = a.toString());
    var s = e.bytesToWords(a), f = a.length * 8, u = [], l = 1732584193, d = -271733879, w = -1732584194, h = 271733878, b = -1009589776;
    s[f >> 5] |= 128 << 24 - f % 32, s[(f + 64 >>> 9 << 4) + 15] = f;
    for (var A = 0; A < s.length; A += 16) {
      for (var p = l, K = d, B = w, P = h, D = b, v = 0; v < 80; v++) {
        if (v < 16)
          u[v] = s[A + v];
        else {
          var C = u[v - 3] ^ u[v - 8] ^ u[v - 14] ^ u[v - 16];
          u[v] = C << 1 | C >>> 31;
        }
        var S = (l << 5 | l >>> 27) + b + (u[v] >>> 0) + (v < 20 ? (d & w | ~d & h) + 1518500249 : v < 40 ? (d ^ w ^ h) + 1859775393 : v < 60 ? (d & w | d & h | w & h) - 1894007588 : (d ^ w ^ h) - 899497514);
        b = h, h = w, w = d << 30 | d >>> 2, d = l, l = S;
      }
      l += p, d += K, w += B, h += P, b += D;
    }
    return [l, d, w, h, b];
  }, o = function(a, s) {
    var f = e.wordsToBytes(r(a));
    return s && s.asBytes ? f : s && s.asString ? n.bytesToString(f) : e.bytesToHex(f);
  };
  o._blocksize = 16, o._digestsize = 20, lr.exports = o;
})();
var ko = lr.exports;
const Oo = /* @__PURE__ */ Hr(ko);
/*!
 * Core functionality for Snowplow Browser trackers v3.19.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Eo(e) {
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
function Sn(e, t, n) {
  n === void 0 && (n = 63072e3);
  try {
    var r = window.localStorage, o = Date.now() + n * 1e3;
    return r.setItem("".concat(e, ".expires"), o.toString()), r.setItem(e, t), !0;
  } catch {
    return !1;
  }
}
function Ht(e) {
  try {
    var t = window.localStorage;
    return t.removeItem(e), t.removeItem(e + ".expires"), !0;
  } catch {
    return !1;
  }
}
function Mt(e) {
  try {
    return window.sessionStorage.getItem(e);
  } catch {
    return;
  }
}
function Do(e, t) {
  try {
    return window.sessionStorage.setItem(e, t), !0;
  } catch {
    return !1;
  }
}
function dr(e) {
  return !!(e && typeof e.valueOf() == "string");
}
function zt(e) {
  return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
function Ft(e) {
  if (!dr(e)) {
    e = e.text || "";
    var t = document.getElementsByTagName("title");
    t && t[0] != null && (e = t[0].text);
  }
  return e;
}
function In(e) {
  var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), n = t.exec(e);
  return n ? n[1] : e;
}
function Jt(e) {
  var t = e.length;
  return e.charAt(--t) === "." && (e = e.slice(0, t)), e.slice(0, 2) === "*." && (e = e.slice(1)), e;
}
function Xn(e) {
  var t = window, n = nn("referrer", t.location.href) || nn("referer", t.location.href);
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
function nn(e, t) {
  var n = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(t);
  return n ? decodeURIComponent(n[1].replace(/\+/g, " ")) : null;
}
function _o(e, t, n) {
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
function No(e, t) {
  for (var n = window.location.hostname, r = "_sp_root_domain_test_", o = r + (/* @__PURE__ */ new Date()).getTime(), a = "_test_value_" + (/* @__PURE__ */ new Date()).getTime(), s = n.split("."), f = s.length - 2; f >= 0; f--) {
    var u = s.slice(f).join(".");
    if (be(o, a, 0, "/", u, e, t), be(o) === a) {
      Cn(o, u, e, t);
      for (var l = Uo(r), d = 0; d < l.length; d++)
        Cn(l[d], u, e, t);
      return u;
    }
  }
  return n;
}
function Cn(e, t, n, r) {
  be(e, "", -1, "/", t, n, r);
}
function Uo(e) {
  for (var t = document.cookie.split("; "), n = [], r = 0; r < t.length; r++)
    t[r].substring(0, e.length) === e && n.push(t[r]);
  return n;
}
function be(e, t, n, r, o, a, s) {
  return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(t ?? "") + (n ? "; Expires=" + new Date(+/* @__PURE__ */ new Date() + n * 1e3).toUTCString() : "") + (r ? "; Path=" + r : "") + (o ? "; Domain=" + o : "") + (a ? "; SameSite=" + a : "") + (s ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0]);
}
function Ro(e) {
  if (e == null || typeof e != "object" || Array.isArray(e))
    return function() {
      return !0;
    };
  var t = Object.prototype.hasOwnProperty.call(e, "allowlist"), n = Bo(e);
  return Vo(e, function(r) {
    return jo(r, n) === t;
  });
}
function vr(e) {
  return e.className.match(/\S+/g) || [];
}
function jo(e, t) {
  for (var n = vr(e), r = 0, o = n; r < o.length; r++) {
    var a = o[r];
    if (t[a])
      return !0;
  }
  return !1;
}
function Vo(e, t) {
  return e.hasOwnProperty("filter") && e.filter ? e.filter : t;
}
function Bo(e) {
  var t = {}, n = e.allowlist || e.denylist;
  if (n) {
    Array.isArray(n) || (n = [n]);
    for (var r = 0; r < n.length; r++)
      t[n[r]] = !0;
  }
  return t;
}
function Lo() {
  try {
    return !!window.localStorage;
  } catch {
    return !0;
  }
}
function Ho() {
  var e = "modernizr";
  if (!Lo())
    return !1;
  try {
    var t = window.localStorage;
    return t.setItem(e, e), t.removeItem(e), !0;
  } catch {
    return !1;
  }
}
var Mo = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0", zo = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/2-0-0", Fo = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2", Jo = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";
function Xo(e, t, n, r, o, a, s, f, u, l, d, w, h, b, A, p, K, B, P, D) {
  B === void 0 && (B = !0);
  var v = !1, C, S = [], R = !1;
  r = typeof r == "string" ? r.toLowerCase() : r;
  var q = r === !0 || r === "beacon" || r === "true", ae = !!(q && window.navigator && window.navigator.sendBeacon && !kn(window.navigator.userAgent)), se = ae && q, X = r === "get", M = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest()), ue = !X && M && (r === "post" || q), ke = ue ? o : "/i", fe = "snowplowOutQueue_".concat(e, "_").concat(ue ? "post2" : "get");
  if (q && (h = {}), a = n && Ho() && ue && a || 1, n)
    try {
      var Oe = window.localStorage.getItem(fe);
      S = Oe ? JSON.parse(Oe) : [];
    } catch {
    }
  Array.isArray(S) || (S = []), t.outQueues.push(S), M && a > 1 && t.bufferFlushers.push(function(g) {
    v || z(g);
  });
  function Fe(g) {
    var y = "?", T = { co: !0, cx: !0 }, x = !0;
    for (var k in g)
      g.hasOwnProperty(k) && !T.hasOwnProperty(k) && (x ? x = !1 : y += "&", y += encodeURIComponent(k) + "=" + encodeURIComponent(g[k]));
    for (var I in T)
      g.hasOwnProperty(I) && T.hasOwnProperty(I) && (y += "&" + I + "=" + encodeURIComponent(g[I]));
    return y;
  }
  function Ee(g) {
    var y = Object.keys(g).map(function(T) {
      return [T, g[T]];
    }).reduce(function(T, x) {
      var k = x[0], I = x[1];
      return T[k] = I.toString(), T;
    }, {});
    return {
      evt: y,
      bytes: De(JSON.stringify(y))
    };
  }
  function De(g) {
    for (var y = 0, T = 0; T < g.length; T++) {
      var x = g.charCodeAt(T);
      x <= 127 ? y += 1 : x <= 2047 ? y += 2 : x >= 55296 && x <= 57343 ? (y += 4, T++) : x < 65535 ? y += 3 : y += 4;
    }
    return y;
  }
  var pe = function(g) {
    return typeof g[0] == "object" && "evt" in g[0];
  };
  function _e(g, y) {
    var T = we(y, !0, !1), x = Re([g.evt]);
    T.onreadystatechange = function() {
      T.readyState === 4 && (he(T.status) ? P == null || P(x) : D == null || D({
        status: T.status,
        message: T.statusText,
        events: x,
        willRetry: !1
      }));
    }, T.send(Ue(x));
  }
  function le(g) {
    for (var y = 0; y < g; y++)
      S.shift();
    n && Sn(fe, JSON.stringify(S.slice(0, l)));
  }
  function Ne(g, y, T) {
    g.onreadystatechange = function() {
      if (g.readyState === 4)
        if (clearTimeout(x), he(g.status))
          le(y), P == null || P(T), z();
        else {
          var k = Xe(g.status);
          k || (ne.error("Status ".concat(g.status, ", will not retry.")), le(y)), D == null || D({
            status: g.status,
            message: g.statusText,
            events: T,
            willRetry: k
          }), v = !1;
        }
    };
    var x = setTimeout(function() {
      g.abort(), B || le(y), D == null || D({
        status: 0,
        message: "timeout",
        events: T,
        willRetry: B
      }), v = !1;
    }, d);
  }
  function Je(g, y) {
    C = y + ke;
    var T = function(ye, Ve) {
      return ne.warn("Event (" + ye + "B) too big, max is " + Ve);
    };
    if (ue) {
      var x = Ee(g);
      if (x.bytes >= s) {
        T(x.bytes, s), _e(x, C);
        return;
      } else
        S.push(x);
    } else {
      var k = Fe(g);
      if (f > 0) {
        var I = je(k), _ = De(I);
        if (_ >= f) {
          if (T(_, f), M) {
            var x = Ee(g), N = y + o;
            _e(x, N);
          }
          return;
        }
      }
      S.push(k);
    }
    var L = !1;
    n && (L = Sn(fe, JSON.stringify(S.slice(0, l)))), !v && (!L || S.length >= a) && z();
  }
  function z(g) {
    for (g === void 0 && (g = !1); S.length && typeof S[0] != "string" && typeof S[0] != "object"; )
      S.shift();
    if (!S.length) {
      v = !1;
      return;
    }
    if (!dr(C))
      throw "No collector configured";
    if (v = !0, K && !R) {
      var y = we(K, !1, g);
      R = !0, y.timeout = d, y.onreadystatechange = function() {
        y.readyState === 4 && z();
      }, y.send();
      return;
    }
    if (M) {
      var T = function(F) {
        for (var ee = 0, on = 0; ee < F.length && (on += F[ee].bytes, !(on >= s)); )
          ee += 1;
        return ee;
      }, x = void 0, k = void 0, I = void 0;
      if (pe(S) ? (x = C, k = we(x, !0, g), I = T(S)) : (x = je(S[0]), k = we(x, !1, g), I = 1), !pe(S))
        Ne(k, I, [x]), k.send();
      else {
        var _ = S.slice(0, I);
        if (_.length > 0) {
          var N = !1, L = _.map(function(F) {
            return F.evt;
          });
          if (se) {
            var ye = new Blob([Ue(Re(L))], {
              type: "application/json"
            });
            try {
              N = navigator.sendBeacon(x, ye);
            } catch {
              N = !1;
            }
          }
          if (N === !0)
            le(I), P == null || P(_), z();
          else {
            var Ve = Re(L);
            Ne(k, I, Ve), k.send(Ue(Ve));
          }
        }
      }
    } else if (!w && !pe(S)) {
      var Qe = new Image(1, 1), Q = !0;
      Qe.onload = function() {
        Q && (Q = !1, S.shift(), n && Sn(fe, JSON.stringify(S.slice(0, l))), z());
      }, Qe.onerror = function() {
        Q && (Q = !1, v = !1);
      }, Qe.src = je(S[0]), setTimeout(function() {
        Q && v && (Q = !1, z());
      }, d);
    } else
      v = !1;
  }
  function he(g) {
    return g >= 200 && g < 300;
  }
  function Xe(g) {
    return he(g) || !B ? !1 : A.includes(g) ? !0 : !p.includes(g);
  }
  function we(g, y, T) {
    var x = new XMLHttpRequest();
    y ? (x.open("POST", g, !T), x.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : x.open("GET", g, !T), x.withCredentials = b, w && x.setRequestHeader("SP-Anonymous", "*");
    for (var k in h)
      Object.prototype.hasOwnProperty.call(h, k) && x.setRequestHeader(k, h[k]);
    return x;
  }
  function Ue(g) {
    return JSON.stringify({
      schema: Jo,
      data: g
    });
  }
  function Re(g) {
    for (var y = (/* @__PURE__ */ new Date()).getTime().toString(), T = 0; T < g.length; T++)
      g[T].stm = y;
    return g;
  }
  function je(g) {
    return u ? C + g.replace("?", "?stm=" + (/* @__PURE__ */ new Date()).getTime() + "&") : C + g;
  }
  return {
    enqueueRequest: Je,
    executeQueue: function() {
      v || z();
    },
    setUseLocalStorage: function(g) {
      n = g;
    },
    setAnonymousTracking: function(g) {
      w = g;
    },
    setCollectorUrl: function(g) {
      C = g + ke;
    },
    setBufferSize: function(g) {
      a = g;
    }
  };
  function kn(g) {
    return y(13, g) || T(10, 15, g) && x(g);
    function y(I, _) {
      var N = _.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
      return N && N.length ? parseInt(N[0]) <= I : !1;
    }
    function T(I, _, N) {
      var L = N.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
      return L && L.length ? parseInt(L[0]) <= I || parseInt(L[0]) === I && parseInt(L[1]) <= _ : !1;
    }
    function x(I) {
      return I.match("Version/.* Safari/") && !k(I);
    }
    function k(I) {
      return I.match("Chrom(e|ium)");
    }
  }
}
function Qo(e, t) {
  var n = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"), r = n.exec(e);
  return r && (r == null ? void 0 : r.length) > 1 ? nn(t, r[1]) : null;
}
function Xt(e, t, n) {
  var r;
  return e === "translate.googleusercontent.com" ? (n === "" && (n = t), t = (r = Qo(t, "u")) !== null && r !== void 0 ? r : "", e = In(t)) : (e === "cc.bingj.com" || // Bing & Yahoo
  e === "webcache.googleusercontent.com") && (t = document.links[0].href, e = In(t)), [e, t, n];
}
var gr = 0, ge = 1, Wo = 2, tn = 3, it = 4, mr = 5, me = 6, Ie = 7, Ce = 8, Pe = 9, ie = 10;
function Yo() {
  var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
  return e;
}
function Go(e, t, n, r) {
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
  ], (!s[me] || s[me] === "undefined") && (s[me] = oe.v4()), (!s[Ie] || s[Ie] === "undefined") && (s[Ie] = ""), (!s[Ce] || s[Ce] === "undefined") && (s[Ce] = ""), (!s[Pe] || s[Pe] === "undefined") && (s[Pe] = ""), (!s[ie] || s[ie] === "undefined") && (s[ie] = 0);
  var f = function(d, w) {
    var h = parseInt(d);
    return isNaN(h) ? w : h;
  }, u = function(d) {
    return d ? f(d, void 0) : void 0;
  }, l = [
    s[gr],
    s[ge],
    f(s[Wo], a),
    f(s[tn], r),
    f(s[it], a),
    u(s[mr]),
    s[me],
    s[Ie],
    s[Ce],
    u(s[Pe]),
    f(s[ie], 0)
  ];
  return l;
}
function $o(e, t) {
  var n;
  return e[ge] ? n = e[ge] : t ? (n = "", e[ge] = n) : (n = oe.v4(), e[ge] = n), n;
}
function Ke(e, t) {
  t === void 0 && (t = { memorizedVisitCount: 1 });
  var n = t.memorizedVisitCount;
  tt(e) ? (e[Ie] = e[me], e[mr] = e[it], e[tn]++) : e[tn] = n;
  var r = oe.v4();
  return e[me] = r, e[ie] = 0, e[Ce] = "", e[Pe] = void 0, r;
}
function Qn(e) {
  e[it] = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
}
function Zo(e, t) {
  if (e[ie] === 0) {
    var n = t.build();
    e[Ce] = n.eid;
    var r = n.dtm || n.ttm;
    e[Pe] = r ? parseInt(r) : void 0;
  }
}
function Ko(e) {
  e[ie] += 1;
}
function qo(e, t) {
  var n = re([], e, !0);
  return t && (n[ge] = "", n[Ie] = ""), n.shift(), n.join(".");
}
function Qt(e, t, n) {
  var r = e[Pe], o = {
    userId: n ? "00000000-0000-0000-0000-000000000000" : e[ge],
    sessionId: e[me],
    eventIndex: e[ie],
    sessionIndex: e[tn],
    previousSessionId: n ? null : e[Ie] || null,
    storageMechanism: t == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
    firstEventId: e[Ce] || null,
    firstEventTimestamp: r ? new Date(r).toISOString() : null
  };
  return o;
}
function Wn(e) {
  return e[me];
}
function ei(e) {
  return e[ge];
}
function Yn(e) {
  return e[tn];
}
function tt(e) {
  return e[gr] === "0";
}
function ni(e) {
  return e[ie];
}
var rn = "x";
function Gn() {
  return {
    viewport: $n(ti()),
    documentSize: $n(ri()),
    resolution: $n(oi()),
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
function ti() {
  var e, t;
  if ("innerWidth" in window)
    e = window.innerWidth, t = window.innerHeight;
  else {
    var n = document.documentElement || document.body;
    e = n.clientWidth, t = n.clientHeight;
  }
  return e >= 0 && t >= 0 ? e + rn + t : null;
}
function ri() {
  var e = document.documentElement, t = document.body, n = t ? Math.max(t.offsetHeight, t.scrollHeight) : 0, r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth), o = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, n);
  return isNaN(r) || isNaN(o) ? "" : r + rn + o;
}
function oi() {
  return screen.width + rn + screen.height;
}
function $n(e) {
  return e && e.split(rn).map(function(t) {
    return Math.floor(Number(t));
  }).join(rn);
}
function ii(e, t, n, r, o, a) {
  a === void 0 && (a = {});
  var s = [], f = function(d, w, h, b, A, p) {
    var K, B, P, D, v, C, S, R, q, ae, se, X, M, ue, ke, fe, Oe, Fe, Ee, De, pe, _e, le, Ne, Je, z, he, Xe;
    p.eventMethod = (K = p.eventMethod) !== null && K !== void 0 ? K : "post";
    var we = function(i) {
      var c;
      return (c = i.stateStorageStrategy) !== null && c !== void 0 ? c : "cookieAndLocalStorage";
    }, Ue = function(i) {
      var c, m;
      return typeof i.anonymousTracking == "boolean" ? !1 : (m = ((c = i.anonymousTracking) === null || c === void 0 ? void 0 : c.withSessionTracking) === !0) !== null && m !== void 0 ? m : !1;
    }, Re = function(i) {
      var c, m;
      return typeof i.anonymousTracking == "boolean" ? !1 : (m = ((c = i.anonymousTracking) === null || c === void 0 ? void 0 : c.withServerAnonymisation) === !0) !== null && m !== void 0 ? m : !1;
    }, je = function(i) {
      return !!i.anonymousTracking;
    }, kn = (P = (B = p == null ? void 0 : p.contexts) === null || B === void 0 ? void 0 : B.browser) !== null && P !== void 0 ? P : !1, g = (v = (D = p == null ? void 0 : p.contexts) === null || D === void 0 ? void 0 : D.webPage) !== null && v !== void 0 ? v : !0;
    s.push(Dr()), g && s.push(Or()), kn && s.push(Er()), s.push.apply(s, (C = p.plugins) !== null && C !== void 0 ? C : []);
    var y = To({
      base64: p.encodeBase64,
      corePlugins: s,
      callback: Pr
    }), T = document.characterSet || document.charset, x = Xt(window.location.hostname, window.location.href, Xn()), k = Jt(x[0]), I = x[1], _ = x[2], N, L = (S = p.platform) !== null && S !== void 0 ? S : "web", ye = Ct(b), Ve = (R = p.postPath) !== null && R !== void 0 ? R : "/com.snowplowanalytics.snowplow/tp2", Qe = (q = p.appId) !== null && q !== void 0 ? q : "", Q, F = document.title, ee, on = (ae = p.resetActivityTrackingOnPageView) !== null && ae !== void 0 ? ae : !0, at, st, yr = (se = p.cookieName) !== null && se !== void 0 ? se : "_sp_", We = (X = p.cookieDomain) !== null && X !== void 0 ? X : void 0, On = "/", an = (M = p.cookieSameSite) !== null && M !== void 0 ? M : "None", sn = (ue = p.cookieSecure) !== null && ue !== void 0 ? ue : !0, ut = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack, ft = typeof p.respectDoNotTrack < "u" ? p.respectDoNotTrack && (ut === "yes" || ut === "1") : !1, En, lt = (ke = p.cookieLifetime) !== null && ke !== void 0 ? ke : 63072e3, ct = (fe = p.sessionCookieTimeout) !== null && fe !== void 0 ? fe : 1800, Be = Ue(p), Dn = Re(p), W = je(p), O = we(p), un, _n = (/* @__PURE__ */ new Date()).getTime(), fn, ln, cn, dn, dt, vn, Y, G = 1, xe, ce = Xo(d, A, O == "localStorage" || O == "cookieAndLocalStorage", p.eventMethod, Ve, (Oe = p.bufferSize) !== null && Oe !== void 0 ? Oe : 1, (Fe = p.maxPostBytes) !== null && Fe !== void 0 ? Fe : 4e4, (Ee = p.maxGetBytes) !== null && Ee !== void 0 ? Ee : 0, (De = p.useStm) !== null && De !== void 0 ? De : !0, (pe = p.maxLocalStorageQueueSize) !== null && pe !== void 0 ? pe : 1e3, (_e = p.connectionTimeout) !== null && _e !== void 0 ? _e : 5e3, Dn, (le = p.customHeaders) !== null && le !== void 0 ? le : {}, (Ne = p.withCredentials) !== null && Ne !== void 0 ? Ne : !0, (Je = p.retryStatusCodes) !== null && Je !== void 0 ? Je : [], ((z = p.dontRetryStatusCodes) !== null && z !== void 0 ? z : []).concat([400, 401, 403, 410, 422]), p.idService, p.retryFailedRequests, p.onRequestSuccess, p.onRequestFailure), vt = !1, gt = !1, V = {
      enabled: !1,
      installed: !1,
      configurations: {}
    }, xr = (Xe = (he = p.contexts) === null || he === void 0 ? void 0 : he.session) !== null && Xe !== void 0 ? Xe : !1, gn, mn = p.onSessionUpdateCallback, Nn = !1;
    p.hasOwnProperty("discoverRootDomain") && p.discoverRootDomain && (We = No(an, sn));
    var pn = Gn(), Tr = pn.browserLanguage, Sr = pn.resolution, br = pn.colorDepth, Ir = pn.cookiesEnabled;
    y.setTrackerVersion(h), y.setTrackerNamespace(w), y.setAppId(Qe), y.setPlatform(L), y.addPayloadPair("cookie", Ir ? "1" : "0"), y.addPayloadPair("cs", T), y.addPayloadPair("lang", Tr), y.addPayloadPair("res", Sr), y.addPayloadPair("cd", br), wt(), It(), p.crossDomainLinker && pt(p.crossDomainLinker);
    function Te() {
      x = Xt(window.location.hostname, window.location.href, Xn()), x[1] !== I && (_ = Xn(I)), k = Jt(x[0]), I = x[1];
    }
    function mt(i) {
      var c = (/* @__PURE__ */ new Date()).getTime(), m = i.currentTarget;
      m != null && m.href && (m.href = _o(m.href, "_sp", vn + "." + c));
    }
    function pt(i) {
      for (var c = 0; c < document.links.length; c++) {
        var m = document.links[c];
        !m.spDecorationEnabled && i(m) && (Z(m, "click", mt, !0), Z(m, "mousedown", mt, !0), m.spDecorationEnabled = !0);
      }
    }
    function Se(i) {
      var c;
      return at && (c = new RegExp("#.*"), i = i.replace(c, "")), st && (c = new RegExp("[{}]", "g"), i = i.replace(c, "")), i;
    }
    function ht(i) {
      var c = new RegExp("^([a-z]+):"), m = c.exec(i);
      return m ? m[1] : null;
    }
    function Cr(i, c) {
      var m = ht(c), U;
      return m ? c : c.slice(0, 1) === "/" ? ht(i) + "://" + In(i) + c : (i = Se(i), (U = i.indexOf("?")) >= 0 && (i = i.slice(0, U)), (U = i.lastIndexOf("/")) !== i.length - 1 && (i = i.slice(0, U + 1)), i + c);
    }
    function Pr(i) {
      ft || gn || ce.enqueueRequest(i.build(), ye);
    }
    function Le(i) {
      return yr + i + "." + dt;
    }
    function Un(i) {
      var c = Le(i);
      if (O == "localStorage")
        return Eo(c);
      if (O == "cookie" || O == "cookieAndLocalStorage")
        return be(c);
    }
    function wt() {
      Te(), dt = Oo((We || k) + (On || "/")).slice(0, 4);
    }
    function Ye() {
      var i = /* @__PURE__ */ new Date();
      un = i.getTime();
    }
    function Ar() {
      kr(), Ye();
    }
    function yt() {
      var i = document.documentElement;
      return i ? [i.scrollLeft || window.pageXOffset, i.scrollTop || window.pageYOffset] : [0, 0];
    }
    function xt() {
      var i = yt(), c = i[0];
      fn = c, ln = c;
      var m = i[1];
      cn = m, dn = m;
    }
    function kr() {
      var i = yt(), c = i[0];
      c < fn ? fn = c : c > ln && (ln = c);
      var m = i[1];
      m < cn ? cn = m : m > dn && (dn = m);
    }
    function hn(i) {
      return Math.round(i);
    }
    function Rn() {
      var i = Le("ses"), c = "*";
      return Tt(i, c, ct);
    }
    function jn(i) {
      var c = Le("id"), m = qo(i, W);
      return Tt(c, m, lt);
    }
    function Tt(i, c, m) {
      return W && !Be ? !1 : O == "localStorage" ? Sn(i, c, m) : O == "cookie" || O == "cookieAndLocalStorage" ? (be(i, c, m, On, We, an, sn), document.cookie.indexOf("".concat(i, "=")) !== -1) : !1;
    }
    function St(i) {
      var c = Le("id"), m = Le("ses");
      Ht(c), Ht(m), Cn(c, We, an, sn), Cn(m, We, an, sn), i != null && i.preserveSession || (Y = oe.v4(), G = 1), i != null && i.preserveUser || (vn = W ? "" : oe.v4(), xe = null);
    }
    function bt(i) {
      i && i.stateStorageStrategy && (p.stateStorageStrategy = i.stateStorageStrategy, O = we(p)), W = je(p), Be = Ue(p), Dn = Re(p), ce.setUseLocalStorage(O == "localStorage" || O == "cookieAndLocalStorage"), ce.setAnonymousTracking(Dn);
    }
    function It() {
      if (!(W && !Be)) {
        var i = O != "none" && !!Un("ses"), c = Ge();
        vn = $o(c, W), i ? Y = Wn(c) : Y = Ke(c), G = Yn(c), O != "none" && (Rn(), Qn(c), jn(c));
      }
    }
    function Ge() {
      if (O == "none")
        return Yo();
      var i = Un("id") || void 0;
      return Go(i, vn, Y, G);
    }
    function Ct(i) {
      return i.indexOf("http") === 0 ? i : (document.location.protocol === "https:" ? "https" : "http") + "://" + i;
    }
    function Pt() {
      (!vt || A.pageViewId == null) && (A.pageViewId = oe.v4());
    }
    function Vn() {
      return A.pageViewId == null && (A.pageViewId = oe.v4()), A.pageViewId;
    }
    function At() {
      if (O === "none" || W || !g)
        return null;
      var i = "_sp_tab_id", c = Mt(i);
      return c || (Do(i, oe.v4()), c = Mt(i)), c || null;
    }
    function Or() {
      return {
        contexts: function() {
          return [
            {
              schema: Mo,
              data: {
                id: Vn()
              }
            }
          ];
        }
      };
    }
    function Er() {
      return {
        contexts: function() {
          return [
            {
              schema: zo,
              data: J(J({}, Gn()), { tabId: At() })
            }
          ];
        }
      };
    }
    function Dr() {
      var i = function(m) {
        return W ? null : m;
      }, c = function(m) {
        return Be ? m : i(m);
      };
      return {
        beforeTrack: function(m) {
          var U = Un("ses"), E = Ge(), de = ni(E) === 0;
          if (En ? gn = !!be(En) : gn = !1, ft || gn) {
            St();
            return;
          }
          tt(E) ? (!U && O != "none" ? Y = Ke(E) : Y = Wn(E), G = Yn(E)) : (/* @__PURE__ */ new Date()).getTime() - _n > ct * 1e3 && (G++, Y = Ke(E, {
            memorizedVisitCount: G
          })), Qn(E), Zo(E, m), Ko(E);
          var H = Gn(), He = H.viewport, $e = H.documentSize;
          m.add("vp", He), m.add("ds", $e), m.add("vid", c(G)), m.add("sid", c(Y)), m.add("duid", i(ei(E))), m.add("uid", i(xe)), Te(), m.add("refr", Se(N || _)), m.add("url", Se(Q || I));
          var Ze = Qt(E, O, W);
          if (xr && (!W || Be) && _r(m, Ze), O != "none") {
            jn(E);
            var Ln = Rn();
            (!U || de) && Ln && mn && !Nn && (mn(Ze), Nn = !1);
          }
          _n = (/* @__PURE__ */ new Date()).getTime();
        }
      };
    }
    function _r(i, c) {
      var m = {
        schema: Fo,
        data: c
      };
      i.addContextEntity(m);
    }
    function Nr() {
      var i = Ge();
      if (tt(i) ? (O != "none" ? Y = Ke(i) : Y = Wn(i), G = Yn(i)) : (G++, Y = Ke(i, {
        memorizedVisitCount: G
      })), Qn(i), O != "none") {
        var c = Qt(i, O, W);
        jn(i);
        var m = Rn();
        m && mn && (Nn = !0, mn(c));
      }
      _n = (/* @__PURE__ */ new Date()).getTime();
    }
    function Bn(i, c) {
      return (i || []).concat(c ? c() : []);
    }
    function Ur(i) {
      var c = i.title, m = i.context, U = i.timestamp, E = i.contextCallback;
      Te(), gt && Pt(), gt = !0, F = document.title, ee = c;
      var de = Ft(ee || F);
      y.track(So({
        pageUrl: Se(Q || I),
        pageTitle: de,
        referrer: Se(N || _)
      }), Bn(m, E), U);
      var H = /* @__PURE__ */ new Date(), He = !1;
      if (V.enabled && !V.installed) {
        V.installed = !0, He = !0;
        var $e = {
          update: function() {
            if (typeof window < "u" && typeof window.addEventListener == "function") {
              var Me = !1, wn = Object.defineProperty({}, "passive", {
                get: function() {
                  Me = !0;
                },
                set: function() {
                }
              }), Dt = function() {
              };
              window.addEventListener("testPassiveEventSupport", Dt, wn), window.removeEventListener("testPassiveEventSupport", Dt, wn), $e.hasSupport = Me;
            }
          }
        };
        $e.update();
        var Ze = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
        Object.prototype.hasOwnProperty.call($e, "hasSupport") ? Z(document, Ze, Ye, { passive: !0 }) : Z(document, Ze, Ye), xt();
        var Ln = [
          "click",
          "mouseup",
          "mousedown",
          "mousemove",
          "keypress",
          "keydown",
          "keyup",
          "touchend",
          "touchstart"
        ], Br = ["resize", "focus", "blur"], Hn = function(Lr, Me) {
          return Me === void 0 && (Me = Ye), function(wn) {
            return Z(document, wn, Me);
          };
        };
        Ln.forEach(Hn(document)), Br.forEach(Hn(window)), Hn(window, Ar)("scroll");
      }
      if (V.enabled && (on || He)) {
        un = H.getTime();
        var Et = void 0;
        for (Et in V.configurations) {
          var Mn = V.configurations[Et];
          Mn && (window.clearInterval(Mn.activityInterval), Rr(Mn, m, E));
        }
      }
    }
    function Rr(i, c, m) {
      var U = function(H, He) {
        Te(), H({ context: He, pageViewId: Vn(), minXOffset: fn, minYOffset: cn, maxXOffset: ln, maxYOffset: dn }), xt();
      }, E = function() {
        var H = /* @__PURE__ */ new Date();
        un + i.configMinimumVisitLength > H.getTime() && U(i.callback, Bn(c, m)), i.activityInterval = window.setInterval(de, i.configHeartBeatTimer);
      }, de = function() {
        var H = /* @__PURE__ */ new Date();
        un + i.configHeartBeatTimer > H.getTime() && U(i.callback, Bn(c, m));
      };
      i.configMinimumVisitLength === 0 ? i.activityInterval = window.setInterval(de, i.configHeartBeatTimer) : i.activityInterval = window.setTimeout(E, i.configMinimumVisitLength);
    }
    function kt(i) {
      var c = i.minimumVisitLength, m = i.heartbeatDelay, U = i.callback;
      if (zt(c) && zt(m))
        return {
          configMinimumVisitLength: c * 1e3,
          configHeartBeatTimer: m * 1e3,
          callback: U
        };
      ne.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers");
    }
    function jr(i) {
      var c = i.context, m = i.minXOffset, U = i.minYOffset, E = i.maxXOffset, de = i.maxYOffset, H = document.title;
      H !== F && (F = H, ee = void 0), y.track(bo({
        pageUrl: Se(Q || I),
        pageTitle: Ft(ee || F),
        referrer: Se(N || _),
        minXOffset: hn(m),
        maxXOffset: hn(E),
        minYOffset: hn(U),
        maxYOffset: hn(de)
      }), c);
    }
    function Ot(i) {
      var c = V.configurations[i];
      (c == null ? void 0 : c.configMinimumVisitLength) === 0 ? window.clearTimeout(c == null ? void 0 : c.activityInterval) : window.clearInterval(c == null ? void 0 : c.activityInterval), V.configurations[i] = void 0;
    }
    var Vr = {
      getDomainSessionIndex: function() {
        return G;
      },
      getPageViewId: Vn,
      getTabId: At,
      newSession: Nr,
      getCookieName: function(i) {
        return Le(i);
      },
      getUserId: function() {
        return xe;
      },
      getDomainUserId: function() {
        return Ge()[1];
      },
      getDomainUserInfo: function() {
        return Ge();
      },
      setReferrerUrl: function(i) {
        N = i;
      },
      setCustomUrl: function(i) {
        Te(), Q = Cr(I, i);
      },
      setDocumentTitle: function(i) {
        F = document.title, ee = i;
      },
      discardHashTag: function(i) {
        at = i;
      },
      discardBrace: function(i) {
        st = i;
      },
      setCookiePath: function(i) {
        On = i, wt();
      },
      setVisitorCookieTimeout: function(i) {
        lt = i;
      },
      crossDomainLinker: function(i) {
        pt(i);
      },
      enableActivityTracking: function(i) {
        V.configurations.pagePing || (V.enabled = !0, V.configurations.pagePing = kt(J(J({}, i), { callback: jr })));
      },
      enableActivityTrackingCallback: function(i) {
        V.configurations.callback || (V.enabled = !0, V.configurations.callback = kt(i));
      },
      disableActivityTracking: function() {
        Ot("pagePing");
      },
      disableActivityTrackingCallback: function() {
        Ot("callback");
      },
      updatePageActivity: function() {
        Ye();
      },
      setOptOutCookie: function(i) {
        En = i;
      },
      setUserId: function(i) {
        xe = i;
      },
      setUserIdFromLocation: function(i) {
        Te(), xe = nn(i, I);
      },
      setUserIdFromReferrer: function(i) {
        Te(), xe = nn(i, _);
      },
      setUserIdFromCookie: function(i) {
        xe = be(i);
      },
      setCollectorUrl: function(i) {
        ye = Ct(i), ce.setCollectorUrl(ye);
      },
      setBufferSize: function(i) {
        ce.setBufferSize(i);
      },
      flushBuffer: function(i) {
        i === void 0 && (i = {}), ce.executeQueue(), i.newBufferSize && ce.setBufferSize(i.newBufferSize);
      },
      trackPageView: function(i) {
        i === void 0 && (i = {}), Ur(i);
      },
      preservePageViewId: function() {
        vt = !0;
      },
      disableAnonymousTracking: function(i) {
        p.anonymousTracking = !1, bt(i), It(), ce.executeQueue();
      },
      enableAnonymousTracking: function(i) {
        var c;
        p.anonymousTracking = (c = i && (i == null ? void 0 : i.options)) !== null && c !== void 0 ? c : !0, bt(i), Be || Pt();
      },
      clearUserData: St
    };
    return J(J({}, Vr), { id: d, namespace: w, core: y, sharedState: A });
  }, u = f(e, t, n, r, o, a), l = J(J({}, u), { addPlugin: function(d) {
    var w, h;
    l.core.addPlugin(d), (h = (w = d.plugin).activateBrowserPlugin) === null || h === void 0 || h.call(w, l);
  } });
  return s.forEach(function(d) {
    var w;
    (w = d.activateBrowserPlugin) === null || w === void 0 || w.call(d, l);
  }), l;
}
var qe = {};
function Pn(e, t) {
  try {
    si(e ?? ui()).forEach(t);
  } catch (n) {
    ne.error("Function failed", n);
  }
}
function ai(e, t, n, r, o, a) {
  return qe.hasOwnProperty(e) ? null : (qe[e] = ii(e, t, n, r, o, a), qe[e]);
}
function si(e) {
  return fi(e, qe);
}
function ui() {
  return Object.keys(qe);
}
function fi(e, t) {
  for (var n = [], r = 0, o = e; r < o.length; r++) {
    var a = o[r];
    t.hasOwnProperty(a) ? n.push(t[a]) : ne.warn(a + " not configured");
  }
  return n;
}
var li = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = [];
    }
    return e;
  }()
);
function ci() {
  var e = new li(), t = document, n = window;
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
    }), Z(n, "load", a, !1);
  }
  return t.visibilityState && Z(t, "visibilitychange", r, !1), Z(n, "beforeunload", o, !1), document.readyState === "loading" ? s() : a(), e;
}
/*!
 * Browser tracker for Snowplow v3.19.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function di(e, t) {
  Pn(t, function(n) {
    n.setReferrerUrl(e);
  });
}
function vi(e, t) {
  Pn(t, function(n) {
    n.enableActivityTracking(e);
  });
}
function gi(e, t) {
  Pn(t, function(n) {
    n.trackPageView(e);
  });
}
function pr(e, t) {
  Pn(t, function(n) {
    n.core.track(fr({ event: e.event }), e.context, e.timestamp);
  });
}
var Wt = typeof window < "u" ? ci() : void 0;
function mi(e, t, n) {
  if (n === void 0 && (n = {}), Wt)
    return ai(e, e, "js-".concat(Po), t, Wt, n);
}
/*!
 * Link Click tracking for Snowplow v3.19.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Ae = {}, j = {};
function pi() {
  return {
    activateBrowserPlugin: function(e) {
      Ae[e.id] = e;
    }
  };
}
function hi(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = Object.keys(Ae)), t.forEach(function(n) {
    Ae[n] && (Ae[n].sharedState.hasLoaded ? (Gt(e, n), $t(n)) : Ae[n].sharedState.registeredOnLoadHandlers.push(function() {
      Gt(e, n), $t(n);
    }));
  });
}
function Yt(e, t, n) {
  for (var r, o, a, s, f, u; (r = t.parentElement) !== null && r != null && (o = t.tagName.toUpperCase()) !== "A" && o !== "AREA"; )
    t = r;
  var l = t;
  if (l.href != null) {
    var d = l.hostname || In(l.href), w = d.toLowerCase(), h = l.href.replace(d, w), b = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript):", "i");
    b.test(h) || (a = l.id, s = vr(l), f = l.target, u = j[e.id].linkTrackingContent ? l.innerHTML : void 0, h = unescape(h), e.core.track(Io({
      targetUrl: h,
      elementId: a,
      elementClasses: s,
      elementTarget: f,
      elementContent: u
    }), ao(n, t)));
  }
}
function Zn(e, t) {
  return function(n) {
    var r, o;
    n = n || window.event, r = n.which || n.button, o = n.target || n.srcElement, n.type === "click" ? o && Yt(Ae[e], o, t) : n.type === "mousedown" ? (r === 1 || r === 2) && o ? (j[e].lastButton = r, j[e].lastTarget = o) : j[e].lastButton = j[e].lastTarget = null : n.type === "mouseup" && (r === j[e].lastButton && o === j[e].lastTarget && Yt(Ae[e], o, t), j[e].lastButton = j[e].lastTarget = null);
  };
}
function wi(e, t) {
  j[e].linkTrackingPseudoClicks ? (Z(t, "mouseup", Zn(e, j[e].linkTrackingContext), !1), Z(t, "mousedown", Zn(e, j[e].linkTrackingContext), !1)) : Z(t, "click", Zn(e, j[e].linkTrackingContext), !1);
}
function Gt(e, t) {
  var n = e === void 0 ? {} : e, r = n.options, o = n.pseudoClicks, a = n.trackContent, s = n.context;
  j[t] = {
    linkTrackingContent: a,
    linkTrackingContext: s,
    linkTrackingPseudoClicks: o,
    linkTrackingFilter: Ro(r)
  };
}
function $t(e) {
  var t, n, r = document.links, o;
  for (o = 0; o < r.length; o++)
    !((n = (t = j[e]).linkTrackingFilter) === null || n === void 0) && n.call(t, r[o]) && !r[o][e] && (wi(e, r[o]), r[o][e] = !0);
}
const $ = window.jobmatix.p || {}, hr = window.jobmatix.q || [], yi = "https://jmi.jobmatix.com", xi = ["production", "local", "development", "demo", "uat"], Ti = ["applicant", "apply_start", "job_alert", "resume", "register"], Si = {
  type: "conversion_type"
}, bi = {
  enableActivityTracking: vi,
  setReferrerUrl: di,
  trackPageView: gi,
  trackSelfDescribingEvent: pr,
  enableLinkClickTracking: hi,
  conversion: Ci
};
(() => {
  if ($ != null && $.environment || ($.environment = "production"), !($ != null && $.pixel_id))
    throw new Error("Pixel ID not found");
  if (!xi.includes($ == null ? void 0 : $.environment))
    throw new Error("Environment not accepted");
})();
const wr = "jm", Ii = `_${wr}_`;
mi(wr, yi, {
  appId: "jobmatix-platform-pixel",
  plugins: [pi()],
  eventMethod: "post",
  platform: "web",
  cookieName: Ii,
  cookieSameSite: "Lax",
  contexts: {
    webPage: !0,
    performanceTiming: !0
  }
});
window.jobmatix = (e, ...t) => {
  try {
    const n = bi[e];
    n(...t);
  } catch {
    console.error(`Function ${e} not found`);
  }
};
hr.forEach((e) => {
  jobmatix(...e);
});
function An(...e) {
  hr.some((n) => n[0] === e[0]) || jobmatix(...e);
}
An("enableActivityTracking", { minimumVisitLength: 10, heartbeatDelay: 10 });
An("enableLinkClickTracking");
An("setReferrerUrl", document.referrer);
An("trackPageView", {
  context: [{
    schema: "iglu:com.jobmatix/jobmatix_platform_pixel/jsonschema/1-0-0",
    data: $
  }]
});
function Ci(e) {
  try {
    if (!(e != null && e.type))
      throw new Error("Conversion type not found");
    if (!Ti.includes(e.type))
      throw new Error("Conversion type not accepted");
    const t = {};
    Object.keys(e).forEach((n) => {
      const r = Si[n] || n;
      e[n] && (t[r] = String(e[n]));
    }), pr({
      event: {
        schema: "iglu:com.jobmatix/jobmatix_platform_conversion/jsonschema/1-0-0",
        data: t
      }
    });
  } catch (t) {
    console.error(t);
  }
}
