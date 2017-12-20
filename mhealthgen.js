!function(e, n) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.mhealthgen = n()
}(this, function() {
	"use strict";
	function e(e, n) {
		return n = {
				exports: {}
			}, e(n, n.exports), n.exports
	}
	function n(e, n) {
		var r = n || 0,
			t = c;
		return t[e[r++]] + t[e[r++]] + t[e[r++]] + t[e[r++]] + "-" + t[e[r++]] + t[e[r++]] + "-" + t[e[r++]] + t[e[r++]] + "-" + t[e[r++]] + t[e[r++]] + "-" + t[e[r++]] + t[e[r++]] + t[e[r++]] + t[e[r++]] + t[e[r++]] + t[e[r++]]
	}
	function r(e, n, r) {
		var t = n && r || 0;
		"string" == typeof e && (n = "binary" == e ? new Array(16) : null, e = null);var i = (e = e || {}).random || (e.rng || u)();
		if (i[6] = 15 & i[6] | 64, i[8] = 63 & i[8] | 128, n)
			for (var a = 0; a < 16; ++a) n[t + a] = i[a];
		return n || d(i)
	}
	var t,
		i = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		a = i.crypto || i.msCrypto;
	if (a && a.getRandomValues) {
		var o = new Uint8Array(16);
		t = function() {
			return a.getRandomValues(o), o
		}
	}
	if (!t) {
		var s = new Array(16);
		t = function() {
			for (var e, n = 0; n < 16; n++) 0 == (3 & n) && (e = 4294967296 * Math.random()), s[n] = e >>> ((3 & n) << 3) & 255;
			return s
		}
	}
	for (var u = t, c = [], l = 0; l < 256; ++l) c[l] = (l + 256).toString(16).substr(1);
	var d = n,
		f = r,
		p = e(function(e, n) {
			!function() {
				function r(e) {
					e || (e = Math.random), this.p = t(e), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);
					for (var n = 0; n < 512; n++) this.perm[n] = this.p[255 & n], this.permMod12[n] = this.perm[n] % 12
				}
				function t(e) {
					var n,
						r = new Uint8Array(256);
					for (n = 0; n < 256; n++) r[n] = n;
					for (n = 0; n < 255; n++) {
						var t = n + 1 + ~~(e() * (255 - n)),
							i = r[n];
						r[n] = r[t], r[t] = i
					}
					return r
				}
				var i = .5 * (Math.sqrt(3) - 1),
					a = (3 - Math.sqrt(3)) / 6,
					o = 1 / 6,
					s = (Math.sqrt(5) - 1) / 4,
					u = (5 - Math.sqrt(5)) / 20;
				r.prototype = {
					grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
					grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
					noise2D: function(e, n) {
						var r,
							t,
							o = this.permMod12,
							s = this.perm,
							u = this.grad3,
							c = 0,
							l = 0,
							d = 0,
							f = (e + n) * i,
							p = Math.floor(e + f),
							h = Math.floor(n + f),
							m = (p + h) * a,
							y = e - (p - m),
							g = n - (h - m);
						y > g ? (r = 1, t = 0) : (r = 0, t = 1);
						var v = y - r + a,
							b = g - t + a,
							w = y - 1 + 2 * a,
							M = g - 1 + 2 * a,
							x = 255 & p,
							A = 255 & h,
							S = .5 - y * y - g * g;
						if (S >= 0) {
							var D = 3 * o[x + s[A]];
							c = (S *= S) * S * (u[D] * y + u[D + 1] * g)
						}
						var H = .5 - v * v - b * b;
						if (H >= 0) {
							var P = 3 * o[x + r + s[A + t]];
							l = (H *= H) * H * (u[P] * v + u[P + 1] * b)
						}
						var B = .5 - w * w - M * M;
						if (B >= 0) {
							var C = 3 * o[x + 1 + s[A + 1]];
							d = (B *= B) * B * (u[C] * w + u[C + 1] * M)
						}
						return 70 * (c + l + d)
					},
					noise3D: function(e, n, r) {
						var t,
							i,
							a,
							s,
							u,
							c,
							l,
							d,
							f,
							p,
							h = this.permMod12,
							m = this.perm,
							y = this.grad3,
							g = (e + n + r) * (1 / 3),
							v = Math.floor(e + g),
							b = Math.floor(n + g),
							w = Math.floor(r + g),
							M = (v + b + w) * o,
							x = e - (v - M),
							A = n - (b - M),
							S = r - (w - M);
						x >= A ? A >= S ? (u = 1, c = 0, l = 0, d = 1, f = 1, p = 0) : x >= S ? (u = 1, c = 0, l = 0, d = 1, f = 0, p = 1) : (u = 0, c = 0, l = 1, d = 1, f = 0, p = 1) : A < S ? (u = 0, c = 0, l = 1, d = 0, f = 1, p = 1) : x < S ? (u = 0, c = 1, l = 0, d = 0, f = 1, p = 1) : (u = 0, c = 1, l = 0, d = 1, f = 1, p = 0);
						var D = x - u + o,
							H = A - c + o,
							P = S - l + o,
							B = x - d + 2 * o,
							C = A - f + 2 * o,
							k = S - p + 2 * o,
							T = x - 1 + .5,
							O = A - 1 + .5,
							R = S - 1 + .5,
							N = 255 & v,
							J = 255 & b,
							F = 255 & w,
							W = .6 - x * x - A * A - S * S;
						if (W < 0)
							t = 0;
						else {
							var _ = 3 * h[N + m[J + m[F]]];
							t = (W *= W) * W * (y[_] * x + y[_ + 1] * A + y[_ + 2] * S)
						}
						var Q = .6 - D * D - H * H - P * P;
						if (Q < 0)
							i = 0;
						else {
							var q = 3 * h[N + u + m[J + c + m[F + l]]];
							i = (Q *= Q) * Q * (y[q] * D + y[q + 1] * H + y[q + 2] * P)
						}
						var L = .6 - B * B - C * C - k * k;
						if (L < 0)
							a = 0;
						else {
							var E = 3 * h[N + d + m[J + f + m[F + p]]];
							a = (L *= L) * L * (y[E] * B + y[E + 1] * C + y[E + 2] * k)
						}
						var I = .6 - T * T - O * O - R * R;
						if (I < 0)
							s = 0;
						else {
							var G = 3 * h[N + 1 + m[J + 1 + m[F + 1]]];
							s = (I *= I) * I * (y[G] * T + y[G + 1] * O + y[G + 2] * R)
						}
						return 32 * (t + i + a + s)
					},
					noise4D: function(e, n, r, t) {
						var i,
							a,
							o,
							c,
							l,
							d = this.perm,
							f = this.grad4,
							p = (e + n + r + t) * s,
							h = Math.floor(e + p),
							m = Math.floor(n + p),
							y = Math.floor(r + p),
							g = Math.floor(t + p),
							v = (h + m + y + g) * u,
							b = e - (h - v),
							w = n - (m - v),
							M = r - (y - v),
							x = t - (g - v),
							A = 0,
							S = 0,
							D = 0,
							H = 0;
						b > w ? A++ : S++, b > M ? A++ : D++, b > x ? A++ : H++, w > M ? S++ : D++, w > x ? S++ : H++, M > x ? D++ : H++;
						var P,
							B,
							C,
							k,
							T,
							O,
							R,
							N,
							J,
							F,
							W,
							_,
							Q = b - (P = A >= 3 ? 1 : 0) + u,
							q = w - (B = S >= 3 ? 1 : 0) + u,
							L = M - (C = D >= 3 ? 1 : 0) + u,
							E = x - (k = H >= 3 ? 1 : 0) + u,
							I = b - (T = A >= 2 ? 1 : 0) + 2 * u,
							G = w - (O = S >= 2 ? 1 : 0) + 2 * u,
							K = M - (R = D >= 2 ? 1 : 0) + 2 * u,
							V = x - (N = H >= 2 ? 1 : 0) + 2 * u,
							j = b - (J = A >= 1 ? 1 : 0) + 3 * u,
							U = w - (F = S >= 1 ? 1 : 0) + 3 * u,
							$ = M - (W = D >= 1 ? 1 : 0) + 3 * u,
							z = x - (_ = H >= 1 ? 1 : 0) + 3 * u,
							X = b - 1 + 4 * u,
							Y = w - 1 + 4 * u,
							Z = M - 1 + 4 * u,
							ee = x - 1 + 4 * u,
							ne = 255 & h,
							re = 255 & m,
							te = 255 & y,
							ie = 255 & g,
							ae = .6 - b * b - w * w - M * M - x * x;
						if (ae < 0)
							i = 0;
						else {
							var oe = d[ne + d[re + d[te + d[ie]]]] % 32 * 4;
							i = (ae *= ae) * ae * (f[oe] * b + f[oe + 1] * w + f[oe + 2] * M + f[oe + 3] * x)
						}
						var se = .6 - Q * Q - q * q - L * L - E * E;
						if (se < 0)
							a = 0;
						else {
							var ue = d[ne + P + d[re + B + d[te + C + d[ie + k]]]] % 32 * 4;
							a = (se *= se) * se * (f[ue] * Q + f[ue + 1] * q + f[ue + 2] * L + f[ue + 3] * E)
						}
						var ce = .6 - I * I - G * G - K * K - V * V;
						if (ce < 0)
							o = 0;
						else {
							var le = d[ne + T + d[re + O + d[te + R + d[ie + N]]]] % 32 * 4;
							o = (ce *= ce) * ce * (f[le] * I + f[le + 1] * G + f[le + 2] * K + f[le + 3] * V)
						}
						var de = .6 - j * j - U * U - $ * $ - z * z;
						if (de < 0)
							c = 0;
						else {
							var fe = d[ne + J + d[re + F + d[te + W + d[ie + _]]]] % 32 * 4;
							c = (de *= de) * de * (f[fe] * j + f[fe + 1] * U + f[fe + 2] * $ + f[fe + 3] * z)
						}
						var pe = .6 - X * X - Y * Y - Z * Z - ee * ee;
						if (pe < 0)
							l = 0;
						else {
							var he = d[ne + 1 + d[re + 1 + d[te + 1 + d[ie + 1]]]] % 32 * 4;
							l = (pe *= pe) * pe * (f[he] * X + f[he + 1] * Y + f[he + 2] * Z + f[he + 3] * ee)
						}
						return 27 * (i + a + o + c + l)
					}
				}, r._buildPermutationTable = t, n.SimplexNoise = r, e.exports = r
			}()
		}),
		h = e(function(e, n) {
			!function(n, r) {
				e.exports = function() {
					function e() {
						return function(e) {
							var r = 0,
								t = 0,
								i = 0,
								a = 1;
							0 == e.length && (e = [+new Date]);
							var o = n();
							r = o(" "), t = o(" "), i = o(" ");
							for (var s = 0; s < e.length; s++) (r -= o(e[s])) < 0 && (r += 1), (t -= o(e[s])) < 0 && (t += 1), (i -= o(e[s])) < 0 && (i += 1);
							o = null;
							var u = function() {
								var e = 2091639 * r + 2.3283064365386963e-10 * a;
								return r = t, t = i, i = e - (a = 0 | e)
							};
							return u.uint32 = function() {
									return 4294967296 * u()
								}, u.fract53 = function() {
									return u() + 1.1102230246251565e-16 * (2097152 * u() | 0)
								}, u.version = "Alea 0.9", u.args = e, u.exportState = function() {
									return [r, t, i, a]
								}, u.importState = function(e) {
									r = +e[0] || 0, t = +e[1] || 0, i = +e[2] || 0, a = +e[3] || 0
								}, u
						}(Array.prototype.slice.call(arguments))
					}
					function n() {
						var e = 4022871197,
							n = function(n) {
								n = n.toString();
								for (var r = 0; r < n.length; r++) {
									var t = .02519603282416938 * (e += n.charCodeAt(r));
									t -= e = t >>> 0, e = (t *= e) >>> 0, e += 4294967296 * (t -= e)
								}
								return 2.3283064365386963e-10 * (e >>> 0)
							};
						return n.version = "Mash 0.9", n
					}
					return e.importState = function(n) {
							var r = new e;
							return r.importState(n), r
						}, e
				}()
			}()
		});
	const m = 864e5,
		y = 2592e6,
		g = 22896e6;
	let v,
		b,
		w,
		M = {};
	const x = e => {
		M[e] ? (v = M[e].prng, b = M[e].simplex) : (v = new h(e), b = new p(v), M[e] = {
			prng: v,
			simplex: b
		});let n = w;
		w = e;return n
	};
	x(1);
	const A = () => {
			M = {};x(Math.random())
		},
		S = function() {
			let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
				n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
			return e + v() * (n - e)
		},
		D = (e, n) => Array(e).fill(0).map((e, r) => n(r)),
		H = () => f().slice(0, 4) + f().slice(-2),
		P = e => e[Math.floor(S(0, e.length))],
		B = e => {
			let n = e.reduce((e, n) => e + n[1], 0);
			if (0 === n) return P(e)[0];
			let r = S(0, n);
			return e.find((n, t) => {
				let i = e.slice(0, t).reduce((e, n) => e + n[1], 0);
				return r > i && r <= i + n[1]
			})[0]
		},
		C = (e, n) => b.noise2D(e.valueOf() / n / 5, 0),
		k = function(e) {
			let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3.3;
			return (e < 0 ? -1 : 1) * Math.pow(Math.abs(e), n)
		},
		T = e => e.reduce((n, r) => n + r / e.length, 0),
		O = e => e.reduce((e, n) => e + n, 0),
		R = e => e.split("").reduce((e, n) => e + n.charCodeAt(0), 0),
		N = e => {
			let n,
				r,
				t = e.length;
			for (; 0 !== t;) r = Math.floor(S(0, t)), n = e[t -= 1], e[t] = e[r], e[r] = n;
			return e
		},
		J = [["obesity", 1], ["heart failure", 1], ["hypertension", 1], ["atrial fibrillation", 1], ["stroke", 1], ["leg fracture", 1], ["arm fracture", 1], ["lung cancer", 1], ["depression", 1]],
		F = [{
			id: "weight",
			name: "Body weight",
			unit: "kg",
			description: "Body weight measure",
			thresholds() {
				return {
					min: 2,
					max: 500
				}
			},
			initial(e, n) {
				var r = e.age(n);
				return e.normalWeight / 93 * (r.months <= 3 ? 3.25 : r.years <= 1 ? (r.months + 9) / 2 : r.years <= 6 ? 2 * r.years + 8 : r.years <= 12 ? (7 * r.years - 5) / 2 : r.years <= 19 ? (9 * r.years - 26) / 2 : 75)
			},
			associations(e, n, r) {
				var t = n.getTime(),
					i = T(D(30, n => e.sample("intake", new Date(t - (n + 6) * m)))),
					a = O(D(30, n => e.sample("caloric_burn", new Date(t - (n + 4) * m))));
				return r + i / 200 - 4 * k(Math.min(1, a / 200))
			},
			fluctuations(e, n, r) {
				return r + .35 * r * k(C(n, 5 * g) + .25, 3) + .15 * r * k(C(n, g) + .25, 3) + .007 * r * k(C(n, 6048e5), 2)
			}
		}, {
			id: "sleep",
			name: "Sleep",
			unit: "hours",
			description: "Number of hours slept",
			thresholds() {
				return {
					min: 0,
					max: 24
				}
			},
			initial(e, n) {
				return 13.212 * (e.normalSleepHours / 6.3) * Math.pow(e.age(n).years, -.134)
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				var t = e.age(n);
				return r + .5 * k(C(n, 5 * g) + .25, 3) + .5 * k(C(n, g) + .25, 3) + (t.years < 18 ? t.years / 18 * r : r) * (.25 * k(C(n, y), 3) + .25 * k(C(n, m) - .15, 5) + .5 * k(C(n, m) + .06, 1.5))
			}
		}, {
			id: "satisfaction",
			name: "Life satisfaction",
			description: "Between 0% and 100%, how satisfied a person is with their current situation.",
			thresholds() {
				return {
					min: 0,
					max: 100
				}
			},
			initial(e) {
				return e.normalSatisfaction
			},
			associations(e, n, r) {
				var t = e.sample("sleep", n);
				return r + (t < 7 ? C(n, 3 * m) * (7 / t - 1) : 0)
			},
			fluctuations(e, n, r) {
				var t = e.age(n);
				return r + 15 * k(C(n, 5 * g), 3) + 25 * k(C(n, g), 1) + 35 * k(C(n, y), 6) + 15 * C(n, y) + (t.years < 18 ? t.years / 18 * 1 : 1) * (20 * k(C(n, m), 1) + 20 * k(C(n, 6048e5), 2) + 70 * k(C(n, 6048e5), 6))
			}
		}, {
			id: "procedure",
			name: "Clinical procedure",
			description: "A clinical procedure, such as surgery or blood test.",
			thresholds() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .3 * k(C(n, m), 25)
			}
		}, {
			id: "prescription",
			name: "Drug prescription",
			description: "A new prescription or change of a prescription for a drug",
			thresholds() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .3 * k(C(n, m), 8)
			}
		}, {
			id: "palpitations",
			name: "Palpitations",
			unit: "severity",
			description: "An episode of irregular heart rhythm",
			thresholds: function() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * k(C(n, 5 * g) + .25, 3) + .25 * r * k(C(n, g), 3) + .3 * k(C(n, 2 * m), 3)
			}
		}, {
			id: "medicate",
			name: "Dosage",
			unit: "%",
			description: "Between 0% and 100%, how well the patient has complied with the medication",
			thresholds() {
				return {
					min: 0,
					max: 100
				}
			},
			initial() {
				return 90
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + 55 * r * k(C(n, 5 * g) + 25, 3) + 25 * r * k(C(n, g), 3) + 30 * k(C(n, m), 3)
			}
		}, {
			id: "inr",
			name: "International Normalized Ratio (INR)",
			description: "The result (in seconds) for a prothrombin time performed on a normal individual will vary according to the type of analytical system employed.",
			thresholds() {
				return {
					min: 1.6,
					max: 8
				}
			},
			initial() {
				return 2.5
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * k(C(n, 5 * g) + .25, 3) + .25 * r * k(C(n, g), 3) + .3 * k(C(n, 2 * m), 1)
			}
		}, {
			id: "height",
			name: "Height",
			unit: "cm",
			description: "Height measurement",
			thresholds(e) {
				let n = ("female" === e.sex ? .96 : 1) * e.normalHeight / 167;
				return {
					min: 50 * n,
					max: 250 * n
				}
			},
			initial(e, n) {
				let r = e.age(n);
				return ("female" === e.sex ? .96 : 1) * e.normalHeight / 167 * (r.months < 3 ? 10 * r.months + 50 : r.years <= 14 ? 6 * r.years + 77 : r.years <= 19 ? 2 * r.years + 135 : 173)
			},
			other: (e, n, r) => {
				let t = 1.5 * k(C(n, 2 * m), 2);
				return r + t
			}
		}, {
			id: "hr",
			name: "Heart rate",
			unit: "bpm",
			description: "Heart rate",
			thresholds(e, n) {
				return {
					min: 40,
					max: 220 - e.age(n).years
				}
			},
			initial(e) {
				return e.restingHeartRate
			},
			associations(e, n, r) {
				return r + T(D(5, function(r) {
						return e.sample("caloric_burn", new Date(n.getTime() - 10 * r * 6e4))
					})) / e.avgBurn * 8
			},
			fluctuations(e, n, r) {
				return r + 20 * k(C(n, 5 * g), 3) + 20 * k(C(n, g), 3) + 50 * k(C(n, 36e5) + .1, 4)
			}
		}, {
			id: "diagnosis",
			name: "Diagnosis",
			description: "A diagnosis made by a clinician.",
			initial() {
				return B(J)
			}
		}, {
			id: "intake",
			name: "Caloric intake",
			unit: "kcal",
			description: "Calories consumed.",
			thresholds() {
				return {
					min: 0
				}
			},
			initial(e, n) {
				var r = e.age(n);
				return ("female" === e.sex ? .9 : 1) * e.normalIntake / 2e3 * (r.years < 18 ? 1e3 + r.years * (1600 / 14) : r.years < 40 ? 1e3 - (r.years - 68) / 40 * 1600 : 2e3)
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + (1e3 + .55 * r) * k(C(n, 5 * g) + .25, 3) + (1e3 + .25 * r) * k(C(n, g), 3) + r * C(n, m)
			}
		}, {
			id: "caloric_burn",
			name: "Caloric burn",
			unit: "kcal",
			description: "Calories burned, for example, through exercise",
			thresholds(e) {
				return {
					min: 800,
					max: 3 * e.avgBurn
				}
			},
			initial(e) {
				return e.avgBurn
			},
			fluctuations(e, n) {
				return e.avgBurn * (.9 + .2 * C(n, g)) + 1 * e.avgBurn * Math.abs(C(n, 6e4)) + 1 * e.avgBurn * k(C(n, 36e5), 19) + e.avgBurn / 24 * 60 * C(n, 6e4)
			}
		}, {
			id: "breathlessness",
			name: "Breathlessness",
			unit: "severity",
			description: "An episode of breathlessness.",
			thresholds() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * k(C(n, 5 * g) + .25, 3) + .25 * r * k(C(n, g), 3) + .3 * k(C(n, 2 * m), 3)
			}
		}, {
			id: "bp_systolic",
			name: "Systolic blood pressure",
			unit: "mmHg",
			description: "Systolic blood pressure",
			thresholds() {
				return {
					min: 50,
					max: 250
				}
			},
			initial() {
				return 110
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * k(C(n, 3 * g) + .25, 3) + .25 * r * k(C(n, y), 3) + .5 * r * k(C(n, 432e6), 3) + 40 * k(C(n, 18e6), 4.5)
			}
		}, {
			id: "bp_diastolic",
			name: "Diastolic blood pressure",
			unit: "mmHg",
			description: "Diastolic blood pressure",
			thresholds() {
				return {
					min: 30,
					max: 140
				}
			},
			initial() {
				return 70
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * k(C(n, 3 * g) + .25, 3) + .25 * r * k(C(n, y), 3) + .5 * r * k(C(n, 432e6), 3) + 40 * k(C(n, 18e6), 4.5)
			}
		}],
		W = [{
			id: "palpitations",
			types: ["palpitations"],
			name: "Symptom diary",
			description: "Person recorded an episode of palpitations.",
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "breathlessness",
			types: ["breathlessness"],
			name: "Symptom diary",
			description: "Person recorded an episode of breathlessness.",
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "scales",
			reviewQuery: "weighing scales accuracy health adult",
			types: ["weight"],
			name: "Weighing scales",
			description: "Consumer analog weighing scales.",
			precision: .5,
			next: e => m + 6048e5 * Math.abs(C(e, m))
		}, {
			id: "medicate",
			types: ["medicate"],
			precision: .01,
			name: "Medication diary",
			description: "The person took their medication and recorded it.",
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "inr_reader",
			name: "INR reader",
			description: "Consumer INR reader.",
			types: ["inr"],
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "height manual",
			types: ["height"],
			name: "Tape measure.",
			description: "Tape measure.",
			precision: .5,
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "fitbit-step-counter",
			name: "Fitbit Surge",
			reviewQuery: "fitbit physical activity",
			types: ["caloric_burn"],
			description: "A wearable device which records steps through motion sensors.",
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "fitbit-sleep",
			name: "Fitbit Surge",
			types: ["sleep"],
			reviewQuery: "fitbit sleep",
			description: "A wearable device which records sleep through motion sensors.",
			precision: .1,
			next: e => m + k(Math.abs(C(e, m)), 3) * m
		}, {
			id: "fitbit - intake",
			name: "Fitbit App",
			reviewQuery: "calorie tracker",
			description: "An app which can be used with the Fitbit device to record diet.",
			types: ["intake"],
			next: e => m + 2 * Math.abs(C(e, m)) * m
		}, {
			id: "daylio - mood",
			name: "Daylio app",
			reviewQuery: "mood diary app",
			description: "A mood diary app.",
			types: ["satisfaction"],
			next: e => m + Math.abs(C(e, m)) * y
		}, {
			id: "clinical-visit",
			name: "Clinical visit",
			description: "Visit to a clinic or hospital",
			types: ["diagnosis", "procedure", "prescription"],
			next: e => m + Math.abs(C(e, y)) * y
		}, {
			id: "valuemed-bp",
			name: "ValueMed Blood Pressure Cuff",
			types: ["bp_diastolic", "bp_systolic"],
			description: "A cheap consumer blood pressure cuff.",
			unit: "mmHg",
			reviewQuery: "consumer blood pressure cuff",
			precision: 2,
			next: e => 432e5 + Math.abs(C(e, m)) * y / 3
		}, {
			id: "iwatch-hr",
			name: "Apple Watch",
			description: "Apple Watch smartwatch heart rate monitor. The heart rate is read using light sensors.",
			types: ["hr"],
			reviewQuery: "apple watch heart rate",
			precision: 1,
			next: e => 6e4 + Math.abs(C(e, m)) * m
		}],
		_ = {
			male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas"],
			female: ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Stephanie", "Carolyn", "Christine", "Marie", "Janet"]
		},
		Q = ["Scully", "Lightfoot", "Sandberg", "Boggs", "Swain", "Herring", "Williford", "Jacobs", "Clifton", "Cooke", "Rinaldi", "Edward", "Villa", "Slater", "Reese", "Forrester", "Foley", "Wheaton", "Atherton", "Cady", "Branson", "Mcneal", "Sharp", "Wirth", "Archer", "Spivey", "Field", "Hagan", "Lin", "Andrew", "Guerra", "Kinsey", "Galindo", "Popp", "Hiatt", "Howes", "Hilliard", "Blackwell", "Elliott", "Tanner", "Alexander", "Ledford", "Alderman", "Hairston", "Markham"],
		q = [["a+", .3], ["a-", .08], ["b+", .08], ["b-", .02], ["o+", .36], ["o-", .12], ["ab+", .03], ["ab-", .01]],
		L = function() {
			let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			var n = e.person;
			let r = void 0 === n ? {} : n;
			var t = e.fluctuations;
			let i = void 0 === t || t;
			var a = e.associations;
			let o = void 0 === a || a;
			var s = e.days;
			let u = void 0 === s ? 30 : s;
			A(), r.hasOwnProperty("id") || (r.id = H()), r.hasOwnProperty("version") || (r.version = 0), r.hasOwnProperty("sex") || (r.sex = P(["male", "female"])), r.hasOwnProperty("firstName") || (r.firstName = P(_[r.sex])), r.hasOwnProperty("lastName") || (r.lastName = P(Q)), r.hasOwnProperty("birthdate") || (r.birthdate = new Date(Date.now() - S(0, 70) * g)), r.hasOwnProperty("bloodType") || (r.bloodType = B(q)), r.hasOwnProperty("normalHeight") || (r.normalHeight = 150), r.hasOwnProperty("normalWeight") || (r.normalWeight = 90), r.hasOwnProperty("normalIntake") || (r.normalIntake = 2500), r.hasOwnProperty("normalSatisfaction") || (r.normalSatisfaction = .5), r.hasOwnProperty("normalSleepHours") || (r.normalSleepHours = 8), r.hasOwnProperty("restingHeartRate") || (r.restingHeartRate = 60), r.hasOwnProperty("avgBurn") || (r.avgBurn = S(1500, 3e3)), x(r.id), r.version++, r.sources = W, r.types = F, r.nodes = [], r.birthdate = new Date(r.birthdate), r.age = (e => {
				let n = e.getTime() - r.birthdate.getTime();
				return {
					days: n / m,
					month: n / y,
					years: n / g
				}
			}), r.sample = ((e, n, t) => {
				let a = x(R(`${r.id}:type:${e}`)),
					s = F.find(n => n.id === e),
					u = s.initial(r, n);
				s.associations && t && o && (u = s.associations(r, n, u));s.fluctuations && i && (u = s.fluctuations(r, n, u));
				if (s.thresholds) {
					let e = s.thresholds(r, n);
					e.max && (u = Math.min(e.max, u)), e.min && (u = Math.max(e.min, u))
				}
				x(a);return u
			});
			let c = new Date(Date.now() - u * m),
				l = new Date;
			return N(W).map(e => {
					let n = x(R(`${r.id}:source:${e.id}`)),
						t = e.types.map(e => F.find(n => n.id === e)),
						i = c.getTime() + e.next(c),
						a = l.getTime();
					for (; i < a;) {
						let n = new Date(i);
						t.forEach(t => {
							let i = r.sample(t.id, n, !0);
							if (e.precision) {
								let n = (e.precision + ".").split(".")[1].length;
								i = Number((Math.round(1 * i / e.precision) * e.precision).toFixed(n))
							}
							r.nodes.push({
								date: n,
								type: t.id,
								source: e.id,
								value: i
							})
						}), i += e.next(n)
					}
					x(n);return {
						id: e.id,
						name: e.name,
						unit: e.unit,
						description: e.description,
						reviewQuery: e.reviewQuery
					}
				}), r.nodes = r.nodes.sort((e, n) => e.date.getTime() - n.date.getTime()), r
		};
	if ("undefined" != typeof require && require.main === module) {
		const e = require("fs"),
			n = require("yargs").usage("$0 [options] <outfile>", "Generate healthdata", e => {
				e.positional("outfile", {
					describe: "The output json file"
				})
			}).alias("p", "person").describe("p", "Existing person file").alias("d", "days").describe("days", "Number of days to generate health data for").default("d", 30).alias("a", "associations").describe("a", "Account for associated events").default("a", !0).alias("f", "fluctuations").describe("f", "Account for random fluctuations").default("f", !0).alias("h", "help").help("h").alias("v", "version").example("$0 example.json", "generate random person and health data").example("$0 -p example.json example2.json", "regenerate health data for existing person").demandCommand(1).argv;
		n.person && (n.person = JSON.parse(e.readFileSync(n.person), "utf8"));
		let r = L(n);
		e.writeFileSync(n.outfile, JSON.stringify(r, null, 2), "utf8")
	}
	return {
		generate: L,
		types: F,
		sources: W
	}
});
