var W = function() {
  return W = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, W.apply(this, arguments);
};
function le(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, a; r < o; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function _r(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Wn = { exports: {} }, At = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (At) {
  var kt = new Uint8Array(16);
  Wn.exports = function() {
    return At(kt), kt;
  };
} else {
  var Ot = new Array(16);
  Wn.exports = function() {
    for (var t = 0, n; t < 16; t++)
      t & 3 || (n = Math.random() * 4294967296), Ot[t] = n >>> ((t & 3) << 3) & 255;
    return Ot;
  };
}
var Xt = Wn.exports, qt = [];
for (var pn = 0; pn < 256; ++pn)
  qt[pn] = (pn + 256).toString(16).substr(1);
function Br(e, t) {
  var n = t || 0, r = qt;
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
var Wt = Br, Vr = Xt, jr = Wt, Et, Vn, jn = 0, Hn = 0;
function Hr(e, t, n) {
  var r = t && n || 0, o = t || [];
  e = e || {};
  var a = e.node || Et, s = e.clockseq !== void 0 ? e.clockseq : Vn;
  if (a == null || s == null) {
    var f = Vr();
    a == null && (a = Et = [
      f[0] | 1,
      f[1],
      f[2],
      f[3],
      f[4],
      f[5]
    ]), s == null && (s = Vn = (f[6] << 8 | f[7]) & 16383);
  }
  var u = e.msecs !== void 0 ? e.msecs : (/* @__PURE__ */ new Date()).getTime(), l = e.nsecs !== void 0 ? e.nsecs : Hn + 1, d = u - jn + (l - Hn) / 1e4;
  if (d < 0 && e.clockseq === void 0 && (s = s + 1 & 16383), (d < 0 || u > jn) && e.nsecs === void 0 && (l = 0), l >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  jn = u, Hn = l, Vn = s, u += 122192928e5;
  var w = ((u & 268435455) * 1e4 + l) % 4294967296;
  o[r++] = w >>> 24 & 255, o[r++] = w >>> 16 & 255, o[r++] = w >>> 8 & 255, o[r++] = w & 255;
  var h = u / 4294967296 * 1e4 & 268435455;
  o[r++] = h >>> 8 & 255, o[r++] = h & 255, o[r++] = h >>> 24 & 15 | 16, o[r++] = h >>> 16 & 255, o[r++] = s >>> 8 | 128, o[r++] = s & 255;
  for (var T = 0; T < 6; ++T)
    o[r + T] = a[T];
  return t || jr(o);
}
var Lr = Hr, Fr = Xt, Mr = Wt;
function zr(e, t, n) {
  var r = t && n || 0;
  typeof e == "string" && (t = e === "binary" ? new Array(16) : null, e = null), e = e || {};
  var o = e.random || (e.rng || Fr)();
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, t)
    for (var a = 0; a < 16; ++a)
      t[r + a] = o[a];
  return t || Mr(o);
}
var Jr = zr, Xr = Lr, Yt = Jr, Zn = Yt;
Zn.v1 = Xr;
Zn.v4 = Yt;
var ae = Zn;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var qr = "3.13.1";
function Wr(e) {
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
  return Qr(n);
}
function Yr(e) {
  if (!e)
    return e;
  var t = Gr(e);
  return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
var ce = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Gr(e) {
  var t, n, r, o, a, s, f, u, l = 0, d = 0, w = [];
  if (!e)
    return e;
  e = unescape(encodeURIComponent(e));
  do
    t = e.charCodeAt(l++), n = e.charCodeAt(l++), r = e.charCodeAt(l++), u = t << 16 | n << 8 | r, o = u >> 18 & 63, a = u >> 12 & 63, s = u >> 6 & 63, f = u & 63, w[d++] = ce.charAt(o) + ce.charAt(a) + ce.charAt(s) + ce.charAt(f);
  while (l < e.length);
  var h = w.join(""), T = e.length % 3;
  return (T ? h.slice(0, T - 3) : h) + "===".slice(T || 3);
}
function Qr(e) {
  var t = function(I) {
    return decodeURIComponent(I.split("").map(function(p) {
      return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  }, n, r, o, a, s, f, u, l, d = 0, w = 0, h = "", T = [];
  if (!e)
    return e;
  e += "";
  do
    a = ce.indexOf(e.charAt(d++)), s = ce.indexOf(e.charAt(d++)), f = ce.indexOf(e.charAt(d++)), u = ce.indexOf(e.charAt(d++)), l = a << 18 | s << 12 | f << 6 | u, n = l >> 16 & 255, r = l >> 8 & 255, o = l & 255, f === 64 ? T[w++] = String.fromCharCode(n) : u === 64 ? T[w++] = String.fromCharCode(n, r) : T[w++] = String.fromCharCode(n, r, o);
  while (d < e.length);
  return h = T.join(""), t(h.replace(/\0+$/, ""));
}
function Kn() {
  var e = {}, t = [], n = [], r = [], o, a = function(l, d) {
    d != null && d !== "" && (e[l] = d);
  }, s = function(l) {
    for (var d in l)
      Object.prototype.hasOwnProperty.call(l, d) && a(d, l[d]);
  }, f = function(l, d, w) {
    if (w && Gt(w)) {
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
function $r(e) {
  return function(t, n, r) {
    for (var o = function(h, T, I) {
      var p = JSON.stringify(h);
      e ? t.add(T, Yr(p)) : t.add(I, p);
    }, a = function() {
      var h = t.getPayload();
      if (e ? h.cx : h.co)
        return JSON.parse(e ? Wr(h.cx) : h.co);
    }, s = function(h, T) {
      var I = h || a();
      return I ? I.data = I.data.concat(T.data) : I = T, I;
    }, f = void 0, u = 0, l = n; u < l.length; u++) {
      var d = l[u];
      d.keyIfEncoded === "cx" ? f = s(f, d.json) : o(d.json, d.keyIfEncoded, d.keyIfNotEncoded);
    }
    if (n.length = 0, r.length) {
      var w = {
        schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
        data: le([], r, !0)
      };
      f = s(f, w), r.length = 0;
    }
    f && o(f, "cx", "co");
  };
}
function Gt(e) {
  if (!Qt(e))
    return !1;
  for (var t in e)
    if (Object.prototype.hasOwnProperty.call(e, t))
      return !0;
  return !1;
}
function Qt(e) {
  return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor);
}
var mn = "Snowplow: ", ie;
(function(e) {
  e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info";
})(ie || (ie = {}));
var ne = Zr();
function Zr(e) {
  e === void 0 && (e = ie.warn);
  function t(s) {
    ie[s] ? e = s : e = ie.warn;
  }
  function n(s, f) {
    for (var u = [], l = 2; l < arguments.length; l++)
      u[l - 2] = arguments[l];
    if (e >= ie.error && typeof console < "u") {
      var d = mn + s + `
`;
      f ? console.error.apply(console, le([d + `
`, f], u, !1)) : console.error.apply(console, le([d], u, !1));
    }
  }
  function r(s, f) {
    for (var u = [], l = 2; l < arguments.length; l++)
      u[l - 2] = arguments[l];
    if (e >= ie.warn && typeof console < "u") {
      var d = mn + s;
      f ? console.warn.apply(console, le([d + `
`, f], u, !1)) : console.warn.apply(console, le([d], u, !1));
    }
  }
  function o(s) {
    for (var f = [], u = 1; u < arguments.length; u++)
      f[u - 1] = arguments[u];
    e >= ie.debug && typeof console < "u" && console.debug.apply(console, le([mn + s], f, !1));
  }
  function a(s) {
    for (var f = [], u = 1; u < arguments.length; u++)
      f[u - 1] = arguments[u];
    e >= ie.info && typeof console < "u" && console.info.apply(console, le([mn + s], f, !1));
  }
  return { setLogLevel: t, warn: r, error: n, debug: o, info: a };
}
function Kr() {
  var e = [], t = [], n = function(r) {
    var o = uo(r), a = fo(r), s = [], f = Gn(e, r, a, o);
    s.push.apply(s, f);
    var u = go(t, r, a, o);
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
        Rt(u) ? o.push(u) : Ve(u) && a.push(u);
      }
      e = e.concat(a), t = t.concat(o);
    },
    clearGlobalContexts: function() {
      t = [], e = [];
    },
    removeGlobalContexts: function(r) {
      for (var o = function(u) {
        Rt(u) ? t = t.filter(function(l) {
          return JSON.stringify(l) !== JSON.stringify(u);
        }) : Ve(u) && (e = e.filter(function(l) {
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
function eo(e) {
  return {
    addPluginContexts: function(t) {
      var n = t ? le([], t, !0) : [];
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
function no(e) {
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
function to(e) {
  var t = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"), n = t.exec(e);
  if (n !== null)
    return n.slice(1, 6);
}
function ro(e) {
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
function $t(e) {
  var t = e.split(".");
  return t && t.length > 1 ? ro(t) : !1;
}
function Zt(e) {
  var t = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"), n = t.exec(e);
  if (n !== null && $t(n[1]))
    return n.slice(1, 6);
}
function Yn(e) {
  var t = Zt(e);
  if (t) {
    var n = t[0];
    return t.length === 5 && $t(n);
  }
  return !1;
}
function oo(e) {
  return Array.isArray(e) && e.every(function(t) {
    return typeof t == "string";
  });
}
function Dt(e) {
  return oo(e) ? e.every(function(t) {
    return Yn(t);
  }) : typeof e == "string" ? Yn(e) : !1;
}
function Ge(e) {
  var t = e;
  return Gt(t) && "schema" in t && "data" in t ? typeof t.schema == "string" && typeof t.data == "object" : !1;
}
function io(e) {
  var t = e, n = 0;
  if (e != null && typeof e == "object" && !Array.isArray(e)) {
    if (Object.prototype.hasOwnProperty.call(t, "accept"))
      if (Dt(t.accept))
        n += 1;
      else
        return !1;
    if (Object.prototype.hasOwnProperty.call(t, "reject"))
      if (Dt(t.reject))
        n += 1;
      else
        return !1;
    return n > 0 && n <= 2;
  }
  return !1;
}
function yn(e) {
  return typeof e == "function" && e.length <= 1;
}
function Ve(e) {
  return yn(e) || Ge(e);
}
function Kt(e) {
  return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? yn(e[0]) && e[1].every(Ve) : yn(e[0]) && Ve(e[1]) : !1;
}
function er(e) {
  return Array.isArray(e) && e.length === 2 && io(e[0]) ? Array.isArray(e[1]) ? e[1].every(Ve) : Ve(e[1]) : !1;
}
function Rt(e) {
  return Kt(e) || er(e);
}
function ao(e, t) {
  var n = 0, r = 0, o = e.accept;
  Array.isArray(o) ? e.accept.some(function(s) {
    return hn(s, t);
  }) && r++ : typeof o == "string" && hn(o, t) && r++;
  var a = e.reject;
  return Array.isArray(a) ? e.reject.some(function(s) {
    return hn(s, t);
  }) && n++ : typeof a == "string" && hn(a, t) && n++, r > 0 && n === 0 ? !0 : (r === 0 && n > 0, !1);
}
function hn(e, t) {
  if (!Yn(e))
    return !1;
  var n = Zt(e), r = to(t);
  if (n && r) {
    if (!so(n[0], r[0]))
      return !1;
    for (var o = 1; o < 5; o++)
      if (!nr(n[o], r[o]))
        return !1;
    return !0;
  }
  return !1;
}
function so(e, t) {
  var n = t.split("."), r = e.split(".");
  if (n && r) {
    if (n.length !== r.length)
      return !1;
    for (var o = 0; o < r.length; o++)
      if (!nr(n[o], r[o]))
        return !1;
    return !0;
  }
  return !1;
}
function nr(e, t) {
  return e && t && e === "*" || e === t;
}
function uo(e) {
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
function fo(e) {
  var t = e.getPayload().e;
  return typeof t == "string" ? t : "";
}
function lo(e, t, n, r) {
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
function tr(e) {
  return Array.isArray(e) ? e : Array.of(e);
}
function Gn(e, t, n, r) {
  var o, a = tr(e), s = function(u) {
    var l = co(u, t, n, r);
    if (l && l.length !== 0)
      return l;
  }, f = a.map(s);
  return (o = []).concat.apply(o, f.filter(function(u) {
    return u != null && u.filter(Boolean);
  }));
}
function co(e, t, n, r) {
  if (Ge(e))
    return [e];
  if (yn(e)) {
    var o = lo(e, t, n, r);
    if (Ge(o))
      return [o];
    if (Array.isArray(o))
      return o;
  }
}
function vo(e, t, n, r) {
  if (Kt(e)) {
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
      return Gn(e[1], t, n, r);
  } else if (er(e) && ao(e[0], r))
    return Gn(e[1], t, n, r);
  return [];
}
function go(e, t, n, r) {
  var o, a = tr(e), s = function(u) {
    var l = vo(u, t, n, r);
    if (l && l.length !== 0)
      return l;
  }, f = a.map(s);
  return (o = []).concat.apply(o, f.filter(function(u) {
    return u != null && u.filter(Boolean);
  }));
}
function po(e) {
  return e == null ? { type: "dtm", value: (/* @__PURE__ */ new Date()).getTime() } : typeof e == "number" ? { type: "dtm", value: e } : e.type === "ttm" ? { type: "ttm", value: e.value } : { type: "dtm", value: e.value || (/* @__PURE__ */ new Date()).getTime() };
}
function mo(e) {
  e === void 0 && (e = {});
  function t(u, l, d) {
    var w = eo(l), h = Kr(), T = u, I = {};
    function p(v) {
      if (v && v.length)
        return {
          schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
          data: v
        };
    }
    function E(v, C) {
      var H = h.getApplicableContexts(v), R = [];
      return C && C.length && R.push.apply(R, C), H && H.length && R.push.apply(R, H), R;
    }
    function U(v, C, H) {
      v.withJsonProcessor($r(T)), v.add("eid", ae.v4()), v.addDict(I);
      var R = po(H);
      v.add(R.type, R.value.toString());
      var Z = E(v, w.addPluginContexts(C)), te = p(Z);
      te !== void 0 && v.addJson("cx", "co", te), l.forEach(function(M) {
        try {
          M.beforeTrack && M.beforeTrack(v);
        } catch (re) {
          ne.error("Plugin beforeTrack", re);
        }
      }), typeof d == "function" && d(v);
      var Y = v.build();
      return l.forEach(function(M) {
        try {
          M.afterTrack && M.afterTrack(Y);
        } catch (re) {
          ne.error("Plugin afterTrack", re);
        }
      }), Y;
    }
    function y(v, C) {
      I[v] = C;
    }
    var F = {
      track: U,
      addPayloadPair: y,
      getBase64Encoding: function() {
        return T;
      },
      setBase64Encoding: function(v) {
        T = v;
      },
      addPayloadDict: function(v) {
        for (var C in v)
          Object.prototype.hasOwnProperty.call(v, C) && (I[C] = v[C]);
      },
      resetPayloadPairs: function(v) {
        I = Qt(v) ? v : {};
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
      setScreenResolution: function(v, C) {
        y("res", v + "x" + C);
      },
      setViewport: function(v, C) {
        y("vp", v + "x" + C);
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
    return F;
  }
  var n = e.base64, r = e.corePlugins, o = e.callback, a = r ?? [], s = t(n ?? !0, a, o), f = W(W({}, s), { addPlugin: function(u) {
    var l, d, w = u.plugin;
    a.push(w), (l = w.logger) === null || l === void 0 || l.call(w, ne), (d = w.activateCorePlugin) === null || d === void 0 || d.call(w, f);
  } });
  return a == null || a.forEach(function(u) {
    var l, d;
    (l = u.logger) === null || l === void 0 || l.call(u, ne), (d = u.activateCorePlugin) === null || d === void 0 || d.call(u, f);
  }), f;
}
function rr(e) {
  var t = e.event, n = t.schema, r = t.data, o = Kn(), a = {
    schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
    data: { schema: n, data: r }
  };
  return o.add("e", "ue"), o.addJson("ue_px", "ue_pr", a), o;
}
function ho(e) {
  var t = e.pageUrl, n = e.pageTitle, r = e.referrer, o = Kn();
  return o.add("e", "pv"), o.add("url", t), o.add("page", n), o.add("refr", r), o;
}
function wo(e) {
  var t = e.pageUrl, n = e.pageTitle, r = e.referrer, o = e.minXOffset, a = e.maxXOffset, s = e.minYOffset, f = e.maxYOffset, u = Kn();
  return u.add("e", "pp"), u.add("url", t), u.add("page", n), u.add("refr", r), o && !isNaN(Number(o)) && u.add("pp_mix", o.toString()), a && !isNaN(Number(a)) && u.add("pp_max", a.toString()), s && !isNaN(Number(s)) && u.add("pp_miy", s.toString()), f && !isNaN(Number(f)) && u.add("pp_may", f.toString()), u;
}
function yo(e) {
  var t = e.targetUrl, n = e.elementId, r = e.elementClasses, o = e.elementTarget, a = e.elementContent, s = {
    schema: "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1",
    data: xo({ targetUrl: t, elementId: n, elementClasses: r, elementTarget: o, elementContent: a })
  };
  return rr({ event: s });
}
function xo(e, t) {
  t === void 0 && (t = {});
  var n = {};
  for (var r in e)
    (t[r] || e[r] !== null && typeof e[r] < "u") && (n[r] = e[r]);
  return n;
}
var So = qr, or = { exports: {} }, ir = { exports: {} };
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
  ir.exports = t;
})();
var To = ir.exports, Qn = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(e) {
      return Qn.bin.stringToBytes(unescape(encodeURIComponent(e)));
    },
    // Convert a byte array to a string
    bytesToString: function(e) {
      return decodeURIComponent(escape(Qn.bin.bytesToString(e)));
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
}, Nt = Qn;
(function() {
  var e = To, t = Nt.utf8, n = Nt.bin, r = function(a) {
    a.constructor == String ? a = t.stringToBytes(a) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(a) ? a = Array.prototype.slice.call(a, 0) : Array.isArray(a) || (a = a.toString());
    var s = e.bytesToWords(a), f = a.length * 8, u = [], l = 1732584193, d = -271733879, w = -1732584194, h = 271733878, T = -1009589776;
    s[f >> 5] |= 128 << 24 - f % 32, s[(f + 64 >>> 9 << 4) + 15] = f;
    for (var I = 0; I < s.length; I += 16) {
      for (var p = l, E = d, U = w, y = h, F = T, v = 0; v < 80; v++) {
        if (v < 16)
          u[v] = s[I + v];
        else {
          var C = u[v - 3] ^ u[v - 8] ^ u[v - 14] ^ u[v - 16];
          u[v] = C << 1 | C >>> 31;
        }
        var H = (l << 5 | l >>> 27) + T + (u[v] >>> 0) + (v < 20 ? (d & w | ~d & h) + 1518500249 : v < 40 ? (d ^ w ^ h) + 1859775393 : v < 60 ? (d & w | d & h | w & h) - 1894007588 : (d ^ w ^ h) - 899497514);
        T = h, h = w, w = d << 30 | d >>> 2, d = l, l = H;
      }
      l += p, d += E, w += U, h += y, T += F;
    }
    return [l, d, w, h, T];
  }, o = function(a, s) {
    var f = e.wordsToBytes(r(a));
    return s && s.asBytes ? f : s && s.asString ? n.bytesToString(f) : e.bytesToHex(f);
  };
  o._blocksize = 16, o._digestsize = 20, or.exports = o;
})();
var bo = or.exports;
const Io = /* @__PURE__ */ _r(bo);
/*!
 * Core functionality for Snowplow Browser trackers v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Po(e) {
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
function wn(e, t, n) {
  n === void 0 && (n = 63072e3);
  try {
    var r = window.localStorage, o = Date.now() + n * 1e3;
    return r.setItem("".concat(e, ".expires"), o.toString()), r.setItem(e, t), !0;
  } catch {
    return !1;
  }
}
function Ut(e) {
  try {
    var t = window.localStorage;
    return t.removeItem(e), t.removeItem(e + ".expires"), !0;
  } catch {
    return !1;
  }
}
function _t(e) {
  try {
    return window.sessionStorage.getItem(e);
  } catch {
    return;
  }
}
function Co(e, t) {
  try {
    return window.sessionStorage.setItem(e, t), !0;
  } catch {
    return !1;
  }
}
function ar(e) {
  return !!(e && typeof e.valueOf() == "string");
}
function Bt(e) {
  return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
function Vt(e) {
  if (!ar(e)) {
    e = e.text || "";
    var t = document.getElementsByTagName("title");
    t && t[0] != null && (e = t[0].text);
  }
  return e;
}
function xn(e) {
  var t = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"), n = t.exec(e);
  return n ? n[1] : e;
}
function jt(e) {
  var t = e.length;
  return e.charAt(--t) === "." && (e = e.slice(0, t)), e.slice(0, 2) === "*." && (e = e.slice(1)), e;
}
function Ln(e) {
  var t = window, n = Qe("referrer", t.location.href) || Qe("referer", t.location.href);
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
function $(e, t, n, r) {
  if (e.addEventListener)
    return e.addEventListener(t, n, r), !0;
  if (e.attachEvent)
    return e.attachEvent("on" + t, n);
  e["on" + t] = n;
}
function Qe(e, t) {
  var n = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(t);
  return n ? decodeURIComponent(n[1].replace(/\+/g, " ")) : null;
}
function Ao(e, t, n) {
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
function ko(e, t) {
  for (var n = window.location.hostname, r = "_sp_root_domain_test_", o = r + (/* @__PURE__ */ new Date()).getTime(), a = "_test_value_" + (/* @__PURE__ */ new Date()).getTime(), s = n.split("."), f = s.length - 2; f >= 0; f--) {
    var u = s.slice(f).join(".");
    if (Se(o, a, 0, "/", u, e, t), Se(o) === a) {
      Sn(o, u, e, t);
      for (var l = Oo(r), d = 0; d < l.length; d++)
        Sn(l[d], u, e, t);
      return u;
    }
  }
  return n;
}
function Sn(e, t, n, r) {
  Se(e, "", -1, "/", t, n, r);
}
function Oo(e) {
  for (var t = document.cookie.split("; "), n = [], r = 0; r < t.length; r++)
    t[r].substring(0, e.length) === e && n.push(t[r]);
  return n;
}
function Se(e, t, n, r, o, a, s) {
  return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(t ?? "") + (n ? "; Expires=" + new Date(+/* @__PURE__ */ new Date() + n * 1e3).toUTCString() : "") + (r ? "; Path=" + r : "") + (o ? "; Domain=" + o : "") + (a ? "; SameSite=" + a : "") + (s ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0]);
}
function Eo(e) {
  if (e == null || typeof e != "object" || Array.isArray(e))
    return function() {
      return !0;
    };
  var t = Object.prototype.hasOwnProperty.call(e, "allowlist"), n = No(e);
  return Ro(e, function(r) {
    return Do(r, n) === t;
  });
}
function sr(e) {
  return e.className.match(/\S+/g) || [];
}
function Do(e, t) {
  for (var n = sr(e), r = 0, o = n; r < o.length; r++) {
    var a = o[r];
    if (t[a])
      return !0;
  }
  return !1;
}
function Ro(e, t) {
  return e.hasOwnProperty("filter") && e.filter ? e.filter : t;
}
function No(e) {
  var t = {}, n = e.allowlist || e.denylist;
  if (n) {
    Array.isArray(n) || (n = [n]);
    for (var r = 0; r < n.length; r++)
      t[n[r]] = !0;
  }
  return t;
}
function Uo() {
  try {
    return !!window.localStorage;
  } catch {
    return !0;
  }
}
function _o() {
  var e = "modernizr";
  if (!Uo())
    return !1;
  try {
    var t = window.localStorage;
    return t.setItem(e, e), t.removeItem(e), !0;
  } catch {
    return !1;
  }
}
var Bo = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0", Vo = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0", jo = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2", Ho = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";
function Lo(e, t, n, r, o, a, s, f, u, l, d, w, h, T, I, p) {
  var E = !1, U, y = [];
  r = typeof r == "string" ? r.toLowerCase() : r;
  var F = r === !0 || r === "beacon" || r === "true", v = !!(F && window.navigator && window.navigator.sendBeacon && !Le(window.navigator.userAgent)), C = v && F, H = r === "get", R = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest()), Z = !H && R && (r === "post" || F), te = Z ? o : "/i", Y = "snowplowOutQueue_".concat(e, "_").concat(Z ? "post2" : "get");
  if (F && (h = {}), a = n && _o() && Z && a || 1, n)
    try {
      var M = window.localStorage.getItem(Y);
      y = M ? JSON.parse(M) : [];
    } catch {
    }
  Array.isArray(y) || (y = []), t.outQueues.push(y), R && a > 1 && t.bufferFlushers.push(function(m) {
    E || K(m);
  });
  function re(m) {
    var b = "?", S = { co: !0, cx: !0 }, x = !0;
    for (var P in m)
      m.hasOwnProperty(P) && !S.hasOwnProperty(P) && (x ? x = !1 : b += "&", b += encodeURIComponent(P) + "=" + encodeURIComponent(m[P]));
    for (var A in S)
      m.hasOwnProperty(A) && S.hasOwnProperty(A) && (b += "&" + A + "=" + encodeURIComponent(m[A]));
    return b;
  }
  function Ce(m) {
    var b = Object.keys(m).map(function(S) {
      return [S, m[S]];
    }).reduce(function(S, x) {
      var P = x[0], A = x[1];
      return S[P] = A.toString(), S;
    }, {});
    return {
      evt: b,
      bytes: Ae(JSON.stringify(b))
    };
  }
  function Ae(m) {
    for (var b = 0, S = 0; S < m.length; S++) {
      var x = m.charCodeAt(S);
      x <= 127 ? b += 1 : x <= 2047 ? b += 2 : x >= 55296 && x <= 57343 ? (b += 4, S++) : x < 65535 ? b += 3 : b += 4;
    }
    return b;
  }
  var ve = function(m) {
    return typeof m[0] == "object";
  };
  function ke(m, b) {
    var S = ge(b, !0, !1);
    S.send(pe(me([m.evt])));
  }
  function je(m, b) {
    U = b + te;
    var S = function(D, Oe) {
      return ne.warn("Event (" + D + "B) too big, max is " + Oe);
    };
    if (Z) {
      var x = Ce(m);
      if (x.bytes >= s) {
        S(x.bytes, s), ke(x, U);
        return;
      } else
        y.push(x);
    } else {
      var P = re(m);
      if (f > 0) {
        var A = he(P), z = Ae(A);
        if (z >= f) {
          if (S(z, f), R) {
            var x = Ce(m), J = b + o;
            ke(x, J);
          }
          return;
        }
      }
      y.push(P);
    }
    var j = !1;
    n && (j = wn(Y, JSON.stringify(y.slice(0, l)))), !E && (!j || y.length >= a) && K();
  }
  function K(m) {
    for (m === void 0 && (m = !1); y.length && typeof y[0] != "string" && typeof y[0] != "object"; )
      y.shift();
    if (y.length < 1) {
      E = !1;
      return;
    }
    if (!ar(U))
      throw "No collector configured";
    if (E = !0, R) {
      var b = function(B) {
        for (var X = 0, Ke = 0; X < B.length && (Ke += B[X].bytes, !(Ke >= s)); )
          X += 1;
        return X;
      }, S = void 0, x, P;
      ve(y) ? (S = U, x = ge(S, !0, m), P = b(y)) : (S = he(y[0]), x = ge(S, !1, m), P = 1);
      var A = setTimeout(function() {
        x.abort(), E = !1;
      }, d), z = function(B) {
        for (var X = 0; X < B; X++)
          y.shift();
        n && wn(Y, JSON.stringify(y.slice(0, l)));
      }, J = function(B) {
        z(B), K();
      };
      if (x.onreadystatechange = function() {
        x.readyState === 4 && x.status >= 200 && (clearTimeout(A), x.status < 300 ? J(P) : (He(x.status) || (ne.error("Status ".concat(x.status, ", will not retry.")), z(P)), E = !1));
      }, !ve(y))
        x.send();
      else {
        var j = y.slice(0, P);
        if (j.length > 0) {
          var D = !1, Oe = j.map(function(B) {
            return B.evt;
          });
          if (C) {
            var oe = new Blob([pe(me(Oe))], {
              type: "application/json"
            });
            try {
              D = navigator.sendBeacon(S, oe);
            } catch {
              D = !1;
            }
          }
          D === !0 ? J(P) : x.send(pe(me(Oe)));
        }
      }
    } else if (!w && !ve(y)) {
      var Ee = new Image(1, 1), _ = !0;
      Ee.onload = function() {
        _ && (_ = !1, y.shift(), n && wn(Y, JSON.stringify(y.slice(0, l))), K());
      }, Ee.onerror = function() {
        _ && (_ = !1, E = !1);
      }, Ee.src = he(y[0]), setTimeout(function() {
        _ && E && (_ = !1, K());
      }, d);
    } else
      E = !1;
  }
  function He(m) {
    return m >= 200 && m < 300 ? !1 : I.includes(m) ? !0 : !p.includes(m);
  }
  function ge(m, b, S) {
    var x = new XMLHttpRequest();
    b ? (x.open("POST", m, !S), x.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : x.open("GET", m, !S), x.withCredentials = T, w && x.setRequestHeader("SP-Anonymous", "*");
    for (var P in h)
      Object.prototype.hasOwnProperty.call(h, P) && x.setRequestHeader(P, h[P]);
    return x;
  }
  function pe(m) {
    return JSON.stringify({
      schema: Ho,
      data: m
    });
  }
  function me(m) {
    for (var b = (/* @__PURE__ */ new Date()).getTime().toString(), S = 0; S < m.length; S++)
      m[S].stm = b;
    return m;
  }
  function he(m) {
    return u ? U + m.replace("?", "?stm=" + (/* @__PURE__ */ new Date()).getTime() + "&") : U + m;
  }
  return {
    enqueueRequest: je,
    executeQueue: function() {
      E || K();
    },
    setUseLocalStorage: function(m) {
      n = m;
    },
    setAnonymousTracking: function(m) {
      w = m;
    },
    setCollectorUrl: function(m) {
      U = m + te;
    },
    setBufferSize: function(m) {
      a = m;
    }
  };
  function Le(m) {
    return b(13, m) || S(10, 15, m) && x(m);
    function b(A, z) {
      var J = z.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
      return J && J.length ? parseInt(J[0]) <= A : !1;
    }
    function S(A, z, J) {
      var j = J.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
      return j && j.length ? parseInt(j[0]) <= A || parseInt(j[0]) === A && parseInt(j[1]) <= z : !1;
    }
    function x(A) {
      return A.match("Version/.* Safari/") && !P(A);
    }
    function P(A) {
      return A.match("Chrom(e|ium)");
    }
  }
}
function Fo(e, t) {
  var n = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"), r = n.exec(e);
  return r && (r == null ? void 0 : r.length) > 1 ? Qe(t, r[1]) : null;
}
function Ht(e, t, n) {
  var r;
  return e === "translate.googleusercontent.com" ? (n === "" && (n = t), t = (r = Fo(t, "u")) !== null && r !== void 0 ? r : "", e = xn(t)) : (e === "cc.bingj.com" || // Bing & Yahoo
  e === "webcache.googleusercontent.com") && (t = document.links[0].href, e = xn(t)), [e, t, n];
}
var ur = 0, Te = 1, Mo = 2, $e = 3, et = 4, fr = 5, de = 6, Be = 7, be = 8, Ie = 9, se = 10;
function zo() {
  var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
  return e;
}
function Jo(e, t, n, r) {
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
  ], (!s[de] || s[de] === "undefined") && (s[de] = ae.v4()), (!s[Be] || s[Be] === "undefined") && (s[Be] = ""), (!s[be] || s[be] === "undefined") && (s[be] = ""), (!s[Ie] || s[Ie] === "undefined") && (s[Ie] = ""), (!s[se] || s[se] === "undefined") && (s[se] = 0);
  var f = function(d, w) {
    var h = parseInt(d);
    return isNaN(h) ? w : h;
  }, u = function(d) {
    return d ? f(d, void 0) : void 0;
  }, l = [
    s[ur],
    s[Te],
    f(s[Mo], a),
    f(s[$e], r),
    f(s[et], a),
    u(s[fr]),
    s[de],
    s[Be],
    s[be],
    u(s[Ie]),
    f(s[se], 0)
  ];
  return l;
}
function Xo(e, t) {
  var n;
  return e[Te] ? n = e[Te] : t ? (n = "", e[Te] = n) : (n = ae.v4(), e[Te] = n), n;
}
function We(e, t) {
  t === void 0 && (t = { memorizedVisitCount: 1 });
  var n = t.memorizedVisitCount;
  $n(e) ? (e[Be] = e[de], e[fr] = e[et], e[$e]++) : e[$e] = n;
  var r = ae.v4();
  return e[de] = r, e[se] = 0, e[be] = "", e[Ie] = void 0, r;
}
function Fn(e) {
  e[et] = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
}
function qo(e, t) {
  if (e[se] === 0) {
    var n = t.build();
    e[be] = n.eid;
    var r = n.dtm || n.ttm;
    e[Ie] = r ? parseInt(r) : void 0;
  }
}
function Wo(e) {
  e[se] += 1;
}
function Yo(e) {
  return e.shift(), e.join(".");
}
function Lt(e, t, n) {
  var r = e[Ie], o = {
    userId: n ? "00000000-0000-0000-0000-000000000000" : e[Te],
    sessionId: e[de],
    eventIndex: e[se],
    sessionIndex: e[$e],
    previousSessionId: n ? null : e[Be] || null,
    storageMechanism: t == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
    firstEventId: e[be] || null,
    firstEventTimestamp: r ? new Date(r).toISOString() : null
  };
  return o;
}
function Mn(e) {
  return e[de];
}
function Go(e) {
  return e[Te];
}
function zn(e) {
  return e[$e];
}
function $n(e) {
  return e[ur] === "0";
}
function Qo(e) {
  return e[se];
}
var Ze = "x";
function Jn() {
  return {
    viewport: Xn($o()),
    documentSize: Xn(Zo()),
    resolution: Xn(Ko()),
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
function $o() {
  var e, t;
  if ("innerWidth" in window)
    e = window.innerWidth, t = window.innerHeight;
  else {
    var n = document.documentElement || document.body;
    e = n.clientWidth, t = n.clientHeight;
  }
  return e >= 0 && t >= 0 ? e + Ze + t : null;
}
function Zo() {
  var e = document.documentElement, t = document.body, n = t ? Math.max(t.offsetHeight, t.scrollHeight) : 0, r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth), o = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, n);
  return isNaN(r) || isNaN(o) ? "" : r + Ze + o;
}
function Ko() {
  return screen.width + Ze + screen.height;
}
function Xn(e) {
  return e && e.split(Ze).map(function(t) {
    return Math.floor(Number(t));
  }).join(Ze);
}
function ei(e, t, n, r, o, a) {
  a === void 0 && (a = {});
  var s = [], f = function(d, w, h, T, I, p) {
    var E, U, y, F, v, C, H, R, Z, te, Y, M, re, Ce, Ae, ve, ke, je, K, He, ge, pe, me, he, Le, m, b, S;
    p.eventMethod = (E = p.eventMethod) !== null && E !== void 0 ? E : "post";
    var x = function(i) {
      var c;
      return (c = i.stateStorageStrategy) !== null && c !== void 0 ? c : "cookieAndLocalStorage";
    }, P = function(i) {
      var c, g;
      return typeof i.anonymousTracking == "boolean" ? !1 : (g = ((c = i.anonymousTracking) === null || c === void 0 ? void 0 : c.withSessionTracking) === !0) !== null && g !== void 0 ? g : !1;
    }, A = function(i) {
      var c, g;
      return typeof i.anonymousTracking == "boolean" ? !1 : (g = ((c = i.anonymousTracking) === null || c === void 0 ? void 0 : c.withServerAnonymisation) === !0) !== null && g !== void 0 ? g : !1;
    }, z = function(i) {
      return !!i.anonymousTracking;
    }, J = (y = (U = p == null ? void 0 : p.contexts) === null || U === void 0 ? void 0 : U.browser) !== null && y !== void 0 ? y : !1, j = (v = (F = p == null ? void 0 : p.contexts) === null || F === void 0 ? void 0 : F.webPage) !== null && v !== void 0 ? v : !0;
    s.push(Cr()), j && s.push(Ir()), J && s.push(Pr()), s.push.apply(s, (C = p.plugins) !== null && C !== void 0 ? C : []);
    var D = mo({
      base64: p.encodeBase64,
      corePlugins: s,
      callback: Sr
    }), Oe = document.characterSet || document.charset, oe = Ht(window.location.hostname, window.location.href, Ln()), Ee = jt(oe[0]), _ = oe[1], B = oe[2], X, Ke = (H = p.platform) !== null && H !== void 0 ? H : "web", bn = xt(T), cr = (R = p.postPath) !== null && R !== void 0 ? R : "/com.snowplowanalytics.snowplow/tp2", dr = (Z = p.appId) !== null && Z !== void 0 ? Z : "", en, De = document.title, Fe, vr = (te = p.resetActivityTrackingOnPageView) !== null && te !== void 0 ? te : !0, nt, tt, gr = (Y = p.cookieName) !== null && Y !== void 0 ? Y : "_sp_", Me = (M = p.cookieDomain) !== null && M !== void 0 ? M : void 0, In = "/", nn = (re = p.cookieSameSite) !== null && re !== void 0 ? re : "None", tn = (Ce = p.cookieSecure) !== null && Ce !== void 0 ? Ce : !0, rt = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack, ot = typeof p.respectDoNotTrack < "u" ? p.respectDoNotTrack && (rt === "yes" || rt === "1") : !1, Pn, it = (Ae = p.cookieLifetime) !== null && Ae !== void 0 ? Ae : 63072e3, at = (ve = p.sessionCookieTimeout) !== null && ve !== void 0 ? ve : 1800, Re = P(p), Cn = A(p), ee = z(p), k = x(p), rn, An = (/* @__PURE__ */ new Date()).getTime(), on, an, sn, un, st, fn, G, Q = 1, we, ue = Lo(d, I, k == "localStorage" || k == "cookieAndLocalStorage", p.eventMethod, cr, (ke = p.bufferSize) !== null && ke !== void 0 ? ke : 1, (je = p.maxPostBytes) !== null && je !== void 0 ? je : 4e4, (K = p.maxGetBytes) !== null && K !== void 0 ? K : 0, (He = p.useStm) !== null && He !== void 0 ? He : !0, (ge = p.maxLocalStorageQueueSize) !== null && ge !== void 0 ? ge : 1e3, (pe = p.connectionTimeout) !== null && pe !== void 0 ? pe : 5e3, Cn, (me = p.customHeaders) !== null && me !== void 0 ? me : {}, (he = p.withCredentials) !== null && he !== void 0 ? he : !0, (Le = p.retryStatusCodes) !== null && Le !== void 0 ? Le : [], ((m = p.dontRetryStatusCodes) !== null && m !== void 0 ? m : []).concat([400, 401, 403, 410, 422])), ut = !1, ft = !1, q = {
      enabled: !1,
      installed: !1,
      configurations: {}
    }, pr = (S = (b = p.contexts) === null || b === void 0 ? void 0 : b.session) !== null && S !== void 0 ? S : !1, ln, cn = p.onSessionUpdateCallback, kn = !1;
    p.hasOwnProperty("discoverRootDomain") && p.discoverRootDomain && (Me = ko(nn, tn));
    var dn = Jn(), mr = dn.browserLanguage, hr = dn.resolution, wr = dn.colorDepth, yr = dn.cookiesEnabled;
    D.setTrackerVersion(h), D.setTrackerNamespace(w), D.setAppId(dr), D.setPlatform(Ke), D.addPayloadPair("cookie", yr ? "1" : "0"), D.addPayloadPair("cs", Oe), D.addPayloadPair("lang", mr), D.addPayloadPair("res", hr), D.addPayloadPair("cd", wr), vt(), yt(), p.crossDomainLinker && ct(p.crossDomainLinker);
    function ye() {
      oe = Ht(window.location.hostname, window.location.href, Ln()), oe[1] !== _ && (B = Ln(_)), Ee = jt(oe[0]), _ = oe[1];
    }
    function lt(i) {
      var c = (/* @__PURE__ */ new Date()).getTime(), g = i.currentTarget;
      g != null && g.href && (g.href = Ao(g.href, "_sp", fn + "." + c));
    }
    function ct(i) {
      for (var c = 0; c < document.links.length; c++) {
        var g = document.links[c];
        !g.spDecorationEnabled && i(g) && ($(g, "click", lt, !0), $(g, "mousedown", lt, !0), g.spDecorationEnabled = !0);
      }
    }
    function xe(i) {
      var c;
      return nt && (c = new RegExp("#.*"), i = i.replace(c, "")), tt && (c = new RegExp("[{}]", "g"), i = i.replace(c, "")), i;
    }
    function dt(i) {
      var c = new RegExp("^([a-z]+):"), g = c.exec(i);
      return g ? g[1] : null;
    }
    function xr(i, c) {
      var g = dt(c), N;
      return g ? c : c.slice(0, 1) === "/" ? dt(i) + "://" + xn(i) + c : (i = xe(i), (N = i.indexOf("?")) >= 0 && (i = i.slice(0, N)), (N = i.lastIndexOf("/")) !== i.length - 1 && (i = i.slice(0, N + 1)), i + c);
    }
    function Sr(i) {
      ot || ln || ue.enqueueRequest(i.build(), bn);
    }
    function Ne(i) {
      return gr + i + "." + st;
    }
    function On(i) {
      var c = Ne(i);
      if (k == "localStorage")
        return Po(c);
      if (k == "cookie" || k == "cookieAndLocalStorage")
        return Se(c);
    }
    function vt() {
      ye(), st = Io((Me || Ee) + (In || "/")).slice(0, 4);
    }
    function ze() {
      var i = /* @__PURE__ */ new Date();
      rn = i.getTime();
    }
    function Tr() {
      br(), ze();
    }
    function gt() {
      var i = document.documentElement;
      return i ? [i.scrollLeft || window.pageXOffset, i.scrollTop || window.pageYOffset] : [0, 0];
    }
    function pt() {
      var i = gt(), c = i[0];
      on = c, an = c;
      var g = i[1];
      sn = g, un = g;
    }
    function br() {
      var i = gt(), c = i[0];
      c < on ? on = c : c > an && (an = c);
      var g = i[1];
      g < sn ? sn = g : g > un && (un = g);
    }
    function vn(i) {
      return Math.round(i);
    }
    function En() {
      var i = Ne("ses"), c = "*";
      return mt(i, c, at);
    }
    function Dn(i) {
      var c = Ne("id"), g = Yo(i);
      return mt(c, g, it);
    }
    function mt(i, c, g) {
      return ee && !Re ? !1 : k == "localStorage" ? wn(i, c, g) : k == "cookie" || k == "cookieAndLocalStorage" ? (Se(i, c, g, In, Me, nn, tn), document.cookie.indexOf("".concat(i, "=")) !== -1) : !1;
    }
    function ht(i) {
      var c = Ne("id"), g = Ne("ses");
      Ut(c), Ut(g), Sn(c, Me, nn, tn), Sn(g, Me, nn, tn), i != null && i.preserveSession || (G = ae.v4(), Q = 1), i != null && i.preserveUser || (fn = ee ? "" : ae.v4(), we = null);
    }
    function wt(i) {
      i && i.stateStorageStrategy && (p.stateStorageStrategy = i.stateStorageStrategy, k = x(p)), ee = z(p), Re = P(p), Cn = A(p), ue.setUseLocalStorage(k == "localStorage" || k == "cookieAndLocalStorage"), ue.setAnonymousTracking(Cn);
    }
    function yt() {
      if (!(ee && !Re)) {
        var i = k != "none" && !!On("ses"), c = Je();
        fn = Xo(c, ee), i ? G = Mn(c) : G = We(c), Q = zn(c), k != "none" && (En(), Fn(c), Dn(c));
      }
    }
    function Je() {
      if (k == "none")
        return zo();
      var i = On("id") || void 0;
      return Jo(i, fn, G, Q);
    }
    function xt(i) {
      return i.indexOf("http") === 0 ? i : (document.location.protocol === "https:" ? "https" : "http") + "://" + i;
    }
    function St() {
      (!ut || I.pageViewId == null) && (I.pageViewId = ae.v4());
    }
    function Rn() {
      return I.pageViewId == null && (I.pageViewId = ae.v4()), I.pageViewId;
    }
    function Tt() {
      if (k === "none" || ee || !j)
        return null;
      var i = "_sp_tab_id", c = _t(i);
      return c || (Co(i, ae.v4()), c = _t(i)), c || null;
    }
    function Ir() {
      return {
        contexts: function() {
          return [
            {
              schema: Bo,
              data: {
                id: Rn()
              }
            }
          ];
        }
      };
    }
    function Pr() {
      return {
        contexts: function() {
          return [
            {
              schema: Vo,
              data: W(W({}, Jn()), { tabId: Tt() })
            }
          ];
        }
      };
    }
    function Cr() {
      var i = function(g) {
        return ee ? null : g;
      }, c = function(g) {
        return Re ? g : i(g);
      };
      return {
        beforeTrack: function(g) {
          var N = On("ses"), O = Je(), fe = Qo(O) === 0;
          if (Pn ? ln = !!Se(Pn) : ln = !1, ot || ln) {
            ht();
            return;
          }
          $n(O) ? (!N && k != "none" ? G = We(O) : G = Mn(O), Q = zn(O)) : (/* @__PURE__ */ new Date()).getTime() - An > at * 1e3 && (Q++, G = We(O, {
            memorizedVisitCount: Q
          })), Fn(O), qo(O, g), Wo(O);
          var L = Jn(), Ue = L.viewport, Xe = L.documentSize;
          g.add("vp", Ue), g.add("ds", Xe), g.add("vid", c(Q)), g.add("sid", c(G)), g.add("duid", i(Go(O))), g.add("uid", i(we)), ye(), g.add("refr", xe(X || B)), g.add("url", xe(en || _));
          var qe = Lt(O, k, ee);
          if (pr && (!ee || Re) && Ar(g, qe), k != "none") {
            Dn(O);
            var Un = En();
            (!N || fe) && Un && cn && !kn && (cn(qe), kn = !1);
          }
          An = (/* @__PURE__ */ new Date()).getTime();
        }
      };
    }
    function Ar(i, c) {
      var g = {
        schema: jo,
        data: c
      };
      i.addContextEntity(g);
    }
    function kr() {
      var i = Je();
      if ($n(i) ? (k != "none" ? G = We(i) : G = Mn(i), Q = zn(i)) : (Q++, G = We(i, {
        memorizedVisitCount: Q
      })), Fn(i), k != "none") {
        var c = Lt(i, k, ee);
        Dn(i);
        var g = En();
        g && cn && (kn = !0, cn(c));
      }
      An = (/* @__PURE__ */ new Date()).getTime();
    }
    function Nn(i, c) {
      return (i || []).concat(c ? c() : []);
    }
    function Or(i) {
      var c = i.title, g = i.context, N = i.timestamp, O = i.contextCallback;
      ye(), ft && St(), ft = !0, De = document.title, Fe = c;
      var fe = Vt(Fe || De);
      D.track(ho({
        pageUrl: xe(en || _),
        pageTitle: fe,
        referrer: xe(X || B)
      }), Nn(g, O), N);
      var L = /* @__PURE__ */ new Date(), Ue = !1;
      if (q.enabled && !q.installed) {
        q.installed = !0, Ue = !0;
        var Xe = {
          update: function() {
            if (typeof window < "u" && typeof window.addEventListener == "function") {
              var _e = !1, gn = Object.defineProperty({}, "passive", {
                get: function() {
                  _e = !0;
                },
                set: function() {
                }
              }), Pt = function() {
              };
              window.addEventListener("testPassiveEventSupport", Pt, gn), window.removeEventListener("testPassiveEventSupport", Pt, gn), Xe.hasSupport = _e;
            }
          }
        };
        Xe.update();
        var qe = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
        Object.prototype.hasOwnProperty.call(Xe, "hasSupport") ? $(document, qe, ze, { passive: !0 }) : $(document, qe, ze), pt();
        var Un = [
          "click",
          "mouseup",
          "mousedown",
          "mousemove",
          "keypress",
          "keydown",
          "keyup",
          "touchend",
          "touchstart"
        ], Nr = ["resize", "focus", "blur"], _n = function(Ur, _e) {
          return _e === void 0 && (_e = ze), function(gn) {
            return $(document, gn, _e);
          };
        };
        Un.forEach(_n(document)), Nr.forEach(_n(window)), _n(window, Tr)("scroll");
      }
      if (q.enabled && (vr || Ue)) {
        rn = L.getTime();
        var It = void 0;
        for (It in q.configurations) {
          var Bn = q.configurations[It];
          Bn && (window.clearInterval(Bn.activityInterval), Er(Bn, g, O));
        }
      }
    }
    function Er(i, c, g) {
      var N = function(L, Ue) {
        ye(), L({ context: Ue, pageViewId: Rn(), minXOffset: on, minYOffset: sn, maxXOffset: an, maxYOffset: un }), pt();
      }, O = function() {
        var L = /* @__PURE__ */ new Date();
        rn + i.configMinimumVisitLength > L.getTime() && N(i.callback, Nn(c, g)), i.activityInterval = window.setInterval(fe, i.configHeartBeatTimer);
      }, fe = function() {
        var L = /* @__PURE__ */ new Date();
        rn + i.configHeartBeatTimer > L.getTime() && N(i.callback, Nn(c, g));
      };
      i.configMinimumVisitLength != 0 ? i.activityInterval = window.setTimeout(O, i.configMinimumVisitLength) : i.activityInterval = window.setInterval(fe, i.configHeartBeatTimer);
    }
    function bt(i) {
      var c = i.minimumVisitLength, g = i.heartbeatDelay, N = i.callback;
      if (Bt(c) && Bt(g))
        return {
          configMinimumVisitLength: c * 1e3,
          configHeartBeatTimer: g * 1e3,
          callback: N
        };
      ne.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers");
    }
    function Dr(i) {
      var c = i.context, g = i.minXOffset, N = i.minYOffset, O = i.maxXOffset, fe = i.maxYOffset, L = document.title;
      L !== De && (De = L, Fe = void 0), D.track(wo({
        pageUrl: xe(en || _),
        pageTitle: Vt(Fe || De),
        referrer: xe(X || B),
        minXOffset: vn(g),
        maxXOffset: vn(O),
        minYOffset: vn(N),
        maxYOffset: vn(fe)
      }), c);
    }
    var Rr = {
      getDomainSessionIndex: function() {
        return Q;
      },
      getPageViewId: Rn,
      getTabId: Tt,
      newSession: kr,
      getCookieName: function(i) {
        return Ne(i);
      },
      getUserId: function() {
        return we;
      },
      getDomainUserId: function() {
        return Je()[1];
      },
      getDomainUserInfo: function() {
        return Je();
      },
      setReferrerUrl: function(i) {
        X = i;
      },
      setCustomUrl: function(i) {
        ye(), en = xr(_, i);
      },
      setDocumentTitle: function(i) {
        De = document.title, Fe = i;
      },
      discardHashTag: function(i) {
        nt = i;
      },
      discardBrace: function(i) {
        tt = i;
      },
      setCookiePath: function(i) {
        In = i, vt();
      },
      setVisitorCookieTimeout: function(i) {
        it = i;
      },
      crossDomainLinker: function(i) {
        ct(i);
      },
      enableActivityTracking: function(i) {
        q.configurations.pagePing || (q.enabled = !0, q.configurations.pagePing = bt(W(W({}, i), { callback: Dr })));
      },
      enableActivityTrackingCallback: function(i) {
        q.configurations.callback || (q.enabled = !0, q.configurations.callback = bt(i));
      },
      updatePageActivity: function() {
        ze();
      },
      setOptOutCookie: function(i) {
        Pn = i;
      },
      setUserId: function(i) {
        we = i;
      },
      setUserIdFromLocation: function(i) {
        ye(), we = Qe(i, _);
      },
      setUserIdFromReferrer: function(i) {
        ye(), we = Qe(i, B);
      },
      setUserIdFromCookie: function(i) {
        we = Se(i);
      },
      setCollectorUrl: function(i) {
        bn = xt(i), ue.setCollectorUrl(bn);
      },
      setBufferSize: function(i) {
        ue.setBufferSize(i);
      },
      flushBuffer: function(i) {
        i === void 0 && (i = {}), ue.executeQueue(), i.newBufferSize && ue.setBufferSize(i.newBufferSize);
      },
      trackPageView: function(i) {
        i === void 0 && (i = {}), Or(i);
      },
      preservePageViewId: function() {
        ut = !0;
      },
      disableAnonymousTracking: function(i) {
        p.anonymousTracking = !1, wt(i), yt(), ue.executeQueue();
      },
      enableAnonymousTracking: function(i) {
        var c;
        p.anonymousTracking = (c = i && (i == null ? void 0 : i.options)) !== null && c !== void 0 ? c : !0, wt(i), Re || St();
      },
      clearUserData: ht
    };
    return W(W({}, Rr), { id: d, namespace: w, core: D, sharedState: I });
  }, u = f(e, t, n, r, o, a), l = W(W({}, u), { addPlugin: function(d) {
    var w, h;
    l.core.addPlugin(d), (h = (w = d.plugin).activateBrowserPlugin) === null || h === void 0 || h.call(w, l);
  } });
  return s.forEach(function(d) {
    var w;
    (w = d.activateBrowserPlugin) === null || w === void 0 || w.call(d, l);
  }), l;
}
var Ye = {};
function Tn(e, t) {
  try {
    ti(e ?? ri()).forEach(t);
  } catch (n) {
    ne.error("Function failed", n);
  }
}
function ni(e, t, n, r, o, a) {
  return Ye.hasOwnProperty(e) ? null : (Ye[e] = ei(e, t, n, r, o, a), Ye[e]);
}
function ti(e) {
  return oi(e, Ye);
}
function ri() {
  return Object.keys(Ye);
}
function oi(e, t) {
  for (var n = [], r = 0, o = e; r < o.length; r++) {
    var a = o[r];
    t.hasOwnProperty(a) ? n.push(t[a]) : ne.warn(a + " not configured");
  }
  return n;
}
var ii = (
  /** @class */
  function() {
    function e() {
      this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = [];
    }
    return e;
  }()
);
function ai() {
  var e = new ii(), t = document, n = window;
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
    }), $(n, "load", a, !1);
  }
  return t.visibilityState && $(t, "visibilitychange", r, !1), $(n, "beforeunload", o, !1), document.readyState === "loading" ? s() : a(), e;
}
/*!
 * Browser tracker for Snowplow v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function si(e, t) {
  Tn(t, function(n) {
    n.setReferrerUrl(e);
  });
}
function ui(e, t) {
  Tn(t, function(n) {
    n.enableActivityTracking(e);
  });
}
function fi(e, t) {
  Tn(t, function(n) {
    n.trackPageView(e);
  });
}
function li(e, t) {
  Tn(t, function(n) {
    n.core.track(rr({ event: e.event }), e.context, e.timestamp);
  });
}
var Ft = typeof window < "u" ? ai() : void 0;
function ci(e, t, n) {
  if (n === void 0 && (n = {}), Ft)
    return ni(e, e, "js-".concat(So), t, Ft, n);
}
/*!
 * Link Click tracking for Snowplow v3.13.1 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Pe = {}, V = {};
function di() {
  return {
    activateBrowserPlugin: function(e) {
      Pe[e.id] = e;
    }
  };
}
function vi(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = Object.keys(Pe)), t.forEach(function(n) {
    Pe[n] && (Pe[n].sharedState.hasLoaded ? (zt(e, n), Jt(n)) : Pe[n].sharedState.registeredOnLoadHandlers.push(function() {
      zt(e, n), Jt(n);
    }));
  });
}
function Mt(e, t, n) {
  for (var r, o, a, s, f, u; (r = t.parentElement) !== null && r != null && (o = t.tagName.toUpperCase()) !== "A" && o !== "AREA"; )
    t = r;
  var l = t;
  if (l.href != null) {
    var d = l.hostname || xn(l.href), w = d.toLowerCase(), h = l.href.replace(d, w), T = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):", "i");
    T.test(h) || (a = l.id, s = sr(l), f = l.target, u = V[e.id].linkTrackingContent ? l.innerHTML : void 0, h = unescape(h), e.core.track(yo({
      targetUrl: h,
      elementId: a,
      elementClasses: s,
      elementTarget: f,
      elementContent: u
    }), no(n, t)));
  }
}
function qn(e, t) {
  return function(n) {
    var r, o;
    n = n || window.event, r = n.which || n.button, o = n.target || n.srcElement, n.type === "click" ? o && Mt(Pe[e], o, t) : n.type === "mousedown" ? (r === 1 || r === 2) && o ? (V[e].lastButton = r, V[e].lastTarget = o) : V[e].lastButton = V[e].lastTarget = null : n.type === "mouseup" && (r === V[e].lastButton && o === V[e].lastTarget && Mt(Pe[e], o, t), V[e].lastButton = V[e].lastTarget = null);
  };
}
function gi(e, t) {
  V[e].linkTrackingPseudoClicks ? ($(t, "mouseup", qn(e, V[e].linkTrackingContext), !1), $(t, "mousedown", qn(e, V[e].linkTrackingContext), !1)) : $(t, "click", qn(e, V[e].linkTrackingContext), !1);
}
function zt(e, t) {
  var n = e === void 0 ? {} : e, r = n.options, o = n.pseudoClicks, a = n.trackContent, s = n.context;
  V[t] = {
    linkTrackingContent: a,
    linkTrackingContext: s,
    linkTrackingPseudoClicks: o,
    linkTrackingFilter: Eo(r)
  };
}
function Jt(e) {
  var t, n, r = document.links, o;
  for (o = 0; o < r.length; o++)
    !((n = (t = V[e]).linkTrackingFilter) === null || n === void 0) && n.call(t, r[o]) && !r[o][e] && (gi(e, r[o]), r[o][e] = !0);
}
const pi = {
  enableActivityTracking: ui,
  setReferrerUrl: si,
  trackPageView: fi,
  trackSelfDescribingEvent: li,
  enableLinkClickTracking: vi
};
function mi() {
  const e = document.querySelector(`script[src="${hi}"]`);
  return e == null ? void 0 : e.getAttribute("id");
}
const hi = "https://unpkg.com/@jobmatix.com/pixel/script.min.js", wi = "https://pixel.jobmatix.app", lr = mi();
if (!lr)
  throw new Error("App ID not found");
ci("sp", wi, {
  appId: lr,
  plugins: [di()],
  eventMethod: "post",
  platform: "web",
  cookieName: "_sp_",
  cookieSameSite: "Lax",
  contexts: {
    webPage: !0,
    performanceTiming: !0
  }
});
const yi = window.jobmatix.q || [];
window.jobmatix = (...e) => {
  const [t, ...n] = e, r = pi[t];
  r ? r(...n) : console.error(`Function ${t} not found`);
};
yi.forEach((e) => {
  window.jobmatix(...e);
});
export {
  mi as getAppId
};
