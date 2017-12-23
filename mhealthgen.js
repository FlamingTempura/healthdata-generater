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
		h = e(function(e, n) {
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
							h = Math.floor(e + f),
							p = Math.floor(n + f),
							m = (h + p) * a,
							y = e - (h - m),
							v = n - (p - m);
						y > v ? (r = 1, t = 0) : (r = 0, t = 1);
						var g = y - r + a,
							b = v - t + a,
							w = y - 1 + 2 * a,
							M = v - 1 + 2 * a,
							x = 255 & h,
							A = 255 & p,
							S = .5 - y * y - v * v;
						if (S >= 0) {
							var D = 3 * o[x + s[A]];
							c = (S *= S) * S * (u[D] * y + u[D + 1] * v)
						}
						var C = .5 - g * g - b * b;
						if (C >= 0) {
							var P = 3 * o[x + r + s[A + t]];
							l = (C *= C) * C * (u[P] * g + u[P + 1] * b)
						}
						var k = .5 - w * w - M * M;
						if (k >= 0) {
							var T = 3 * o[x + 1 + s[A + 1]];
							d = (k *= k) * k * (u[T] * w + u[T + 1] * M)
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
							h,
							p = this.permMod12,
							m = this.perm,
							y = this.grad3,
							v = (e + n + r) * (1 / 3),
							g = Math.floor(e + v),
							b = Math.floor(n + v),
							w = Math.floor(r + v),
							M = (g + b + w) * o,
							x = e - (g - M),
							A = n - (b - M),
							S = r - (w - M);
						x >= A ? A >= S ? (u = 1, c = 0, l = 0, d = 1, f = 1, h = 0) : x >= S ? (u = 1, c = 0, l = 0, d = 1, f = 0, h = 1) : (u = 0, c = 0, l = 1, d = 1, f = 0, h = 1) : A < S ? (u = 0, c = 0, l = 1, d = 0, f = 1, h = 1) : x < S ? (u = 0, c = 1, l = 0, d = 0, f = 1, h = 1) : (u = 0, c = 1, l = 0, d = 1, f = 1, h = 0);
						var D = x - u + o,
							C = A - c + o,
							P = S - l + o,
							k = x - d + 2 * o,
							T = A - f + 2 * o,
							H = S - h + 2 * o,
							O = x - 1 + .5,
							J = A - 1 + .5,
							N = S - 1 + .5,
							Q = 255 & g,
							R = 255 & b,
							B = 255 & w,
							F = .6 - x * x - A * A - S * S;
						if (F < 0)
							t = 0;
						else {
							var q = 3 * p[Q + m[R + m[B]]];
							t = (F *= F) * F * (y[q] * x + y[q + 1] * A + y[q + 2] * S)
						}
						var L = .6 - D * D - C * C - P * P;
						if (L < 0)
							i = 0;
						else {
							var W = 3 * p[Q + u + m[R + c + m[B + l]]];
							i = (L *= L) * L * (y[W] * D + y[W + 1] * C + y[W + 2] * P)
						}
						var E = .6 - k * k - T * T - H * H;
						if (E < 0)
							a = 0;
						else {
							var j = 3 * p[Q + d + m[R + f + m[B + h]]];
							a = (E *= E) * E * (y[j] * k + y[j + 1] * T + y[j + 2] * H)
						}
						var G = .6 - O * O - J * J - N * N;
						if (G < 0)
							s = 0;
						else {
							var K = 3 * p[Q + 1 + m[R + 1 + m[B + 1]]];
							s = (G *= G) * G * (y[K] * O + y[K + 1] * J + y[K + 2] * N)
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
							h = (e + n + r + t) * s,
							p = Math.floor(e + h),
							m = Math.floor(n + h),
							y = Math.floor(r + h),
							v = Math.floor(t + h),
							g = (p + m + y + v) * u,
							b = e - (p - g),
							w = n - (m - g),
							M = r - (y - g),
							x = t - (v - g),
							A = 0,
							S = 0,
							D = 0,
							C = 0;
						b > w ? A++ : S++, b > M ? A++ : D++, b > x ? A++ : C++, w > M ? S++ : D++, w > x ? S++ : C++, M > x ? D++ : C++;
						var P,
							k,
							T,
							H,
							O,
							J,
							N,
							Q,
							R,
							B,
							F,
							q,
							L = b - (P = A >= 3 ? 1 : 0) + u,
							W = w - (k = S >= 3 ? 1 : 0) + u,
							E = M - (T = D >= 3 ? 1 : 0) + u,
							j = x - (H = C >= 3 ? 1 : 0) + u,
							G = b - (O = A >= 2 ? 1 : 0) + 2 * u,
							K = w - (J = S >= 2 ? 1 : 0) + 2 * u,
							V = M - (N = D >= 2 ? 1 : 0) + 2 * u,
							I = x - (Q = C >= 2 ? 1 : 0) + 2 * u,
							U = b - (R = A >= 1 ? 1 : 0) + 3 * u,
							$ = w - (B = S >= 1 ? 1 : 0) + 3 * u,
							z = M - (F = D >= 1 ? 1 : 0) + 3 * u,
							_ = x - (q = C >= 1 ? 1 : 0) + 3 * u,
							X = b - 1 + 4 * u,
							Y = w - 1 + 4 * u,
							Z = M - 1 + 4 * u,
							ee = x - 1 + 4 * u,
							ne = 255 & p,
							re = 255 & m,
							te = 255 & y,
							ie = 255 & v,
							ae = .6 - b * b - w * w - M * M - x * x;
						if (ae < 0)
							i = 0;
						else {
							var oe = d[ne + d[re + d[te + d[ie]]]] % 32 * 4;
							i = (ae *= ae) * ae * (f[oe] * b + f[oe + 1] * w + f[oe + 2] * M + f[oe + 3] * x)
						}
						var se = .6 - L * L - W * W - E * E - j * j;
						if (se < 0)
							a = 0;
						else {
							var ue = d[ne + P + d[re + k + d[te + T + d[ie + H]]]] % 32 * 4;
							a = (se *= se) * se * (f[ue] * L + f[ue + 1] * W + f[ue + 2] * E + f[ue + 3] * j)
						}
						var ce = .6 - G * G - K * K - V * V - I * I;
						if (ce < 0)
							o = 0;
						else {
							var le = d[ne + O + d[re + J + d[te + N + d[ie + Q]]]] % 32 * 4;
							o = (ce *= ce) * ce * (f[le] * G + f[le + 1] * K + f[le + 2] * V + f[le + 3] * I)
						}
						var de = .6 - U * U - $ * $ - z * z - _ * _;
						if (de < 0)
							c = 0;
						else {
							var fe = d[ne + R + d[re + B + d[te + F + d[ie + q]]]] % 32 * 4;
							c = (de *= de) * de * (f[fe] * U + f[fe + 1] * $ + f[fe + 2] * z + f[fe + 3] * _)
						}
						var he = .6 - X * X - Y * Y - Z * Z - ee * ee;
						if (he < 0)
							l = 0;
						else {
							var pe = d[ne + 1 + d[re + 1 + d[te + 1 + d[ie + 1]]]] % 32 * 4;
							l = (he *= he) * he * (f[pe] * X + f[pe + 1] * Y + f[pe + 2] * Z + f[pe + 3] * ee)
						}
						return 27 * (i + a + o + c + l)
					}
				}, r._buildPermutationTable = t, n.SimplexNoise = r, e.exports = r
			}()
		}),
		p = e(function(e, n) {
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
		y = 22896e6;
	let v,
		g,
		b,
		w = {};
	const M = e => {
		w[e] ? (v = w[e].prng, g = w[e].simplex) : (v = new p(e), g = new h(v), w[e] = {
			prng: v,
			simplex: g
		});let n = b;
		b = e;return n
	};
	M(1);
	const x = () => {
			w = {};M(Math.random())
		},
		A = function() {
			let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
				n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
			return e + v() * (n - e)
		},
		S = (e, n) => Array(e).fill(0).map((e, r) => n(r)),
		D = () => f().slice(0, 4) + f().slice(-2),
		C = e => e[Math.floor(A(0, e.length))],
		P = e => {
			let n = e.reduce((e, n) => e + n[1], 0);
			if (0 === n) return C(e)[0];
			let r = A(0, n);
			return e.find((n, t) => {
				let i = e.slice(0, t).reduce((e, n) => e + n[1], 0);
				return r > i && r <= i + n[1]
			})[0]
		},
		k = (e, n) => g.noise2D(e.valueOf() / n / 5, 0),
		T = function(e) {
			let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3.3;
			return (e < 0 ? -1 : 1) * Math.pow(Math.abs(e), n)
		},
		H = e => e.reduce((n, r) => n + r / e.length, 0),
		O = e => e.reduce((e, n) => e + n, 0),
		J = e => e.split("").reduce((e, n) => e + n.charCodeAt(0), 0),
		N = e => {
			let n,
				r,
				t = e.length;
			for (; 0 !== t;) r = Math.floor(A(0, t)), n = e[t -= 1], e[t] = e[r], e[r] = n;
			return e
		},
		Q = [[null, 5], ["ablation", 2], ["bypass", 1]],
		R = [[null, 1], ["warfarin", 1], ["aspirin", 1], ["paracetemol", 1]],
		B = [[null, 10], ["obesity", 1], ["heart failure", 1], ["hypertension", 1], ["atrial fibrillation", 1], ["stroke", 1], ["leg fracture", 1], ["arm fracture", 1], ["lung cancer", 1], ["depression", 1]],
		F = [{
			id: "weight",
			name: "Body weight",
			unit: "kg",
			description: "Body weight measure",
			thresholds() {
				let e = Math.round(A(60, 100));
				return {
					min: 2,
					normal: e,
					max: 2.5 * e
				}
			},
			initial(e, n, r) {
				var t = e.age(n);
				return r / 93 * (t.months <= 3 ? 3.25 : t.years <= 1 ? (t.months + 9) / 2 : t.years <= 6 ? 2 * t.years + 8 : t.years <= 12 ? (7 * t.years - 5) / 2 : t.years <= 19 ? (9 * t.years - 26) / 2 : 75)
			},
			associations(e, n, r) {
				var t = n.getTime(),
					i = H(S(30, n => e.sample("caloric-intake", new Date(t - (n + 6) * m)))),
					a = O(S(30, n => e.sample("caloric-burn", new Date(t - (n + 4) * m))));
				return r + i / 200 - 4 * T(Math.min(1, a / 200))
			},
			fluctuations(e, n, r) {
				return r + .35 * r * T(k(n, 5 * y) + .25, 3) + .15 * r * T(k(n, y) + .25, 3) + .007 * r * T(k(n, 6048e5), 2)
			}
		}, {
			id: "sleep",
			name: "Sleep",
			unit: "hours",
			description: "Number of hours slept",
			thresholds() {
				return {
					min: 0,
					normal: Math.round(A(6, 9)),
					max: 24
				}
			},
			initial(e, n, r) {
				return 13.212 * (r / 6.3) * Math.pow(e.age(n).years, -.134)
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				var t = e.age(n);
				return r + .5 * T(k(n, 5 * y) + .25, 3) + .5 * T(k(n, y) + .25, 3) + (t.years < 18 ? t.years / 18 * r : r) * (.25 * T(k(n, 2592e6), 3) + .25 * T(k(n, m) - .15, 5) + .5 * T(k(n, m) + .06, 1.5))
			}
		}, {
			id: "satisfaction",
			name: "Life satisfaction",
			unit: "%",
			description: "Between 0% and 100%, how satisfied a person is with their current situation.",
			thresholds() {
				return {
					min: 0,
					normal: Math.round(A(50, 90)),
					max: 100
				}
			},
			associations(e, n, r) {
				let t = e.sample("sleep", n);
				return r + (t < 7 ? k(n, 3 * m) * (7 / t - 1) : 0)
			},
			fluctuations(e, n, r) {
				return r + 15 * T(k(n, 5 * y), 3) + 25 * T(k(n, y), 1) + 35 * T(k(n, 2592e6), 6) + 15 * k(n, 2592e6) + 20 * T(k(n, m), 1) + 20 * T(k(n, 6048e5), 2) + 70 * T(k(n, 6048e5), 6)
			}
		}, {
			id: "procedure",
			name: "Clinical procedure",
			description: "A clinical procedure, such as surgery or blood test.",
			initial() {
				return P(Q)
			},
			filter(e) {
				return null !== e
			}
		}, {
			id: "prescription",
			name: "Drug prescription",
			description: "A new prescription or change of a prescription for a drug",
			initial() {
				return P(R)
			},
			filter(e) {
				return null !== e
			}
		}, {
			id: "symptom-palpitations",
			name: "Palpitations",
			unit: "severity",
			description: "An episode of irregular heart rhythm",
			thresholds() {
				return {
					min: 0,
					normal: 0,
					max: 5
				}
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return 5 * (r + .55 * r * T(k(n, 5 * y) + .25, 3) + .25 * r * T(k(n, y), 3) + 2 * T(k(n, 2 * m), 3))
			},
			filter(e) {
				return e > 0
			}
		}, {
			id: "medicate",
			name: "Dosage",
			unit: "%",
			description: "Between 0% and 100%, how well the patient has complied with the medication",
			thresholds() {
				return {
					min: 0,
					normal: 90,
					max: 100
				}
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * T(k(n, 5 * y) + .25, 3) + .25 * r * T(k(n, y), 3) + 30 * T(k(n, m), 3) - 15
			}
		}, {
			id: "inr",
			name: "International Normalized Ratio (INR)",
			description: "The result (in seconds) for a prothrombin time performed on a normal individual will vary according to the type of analytical system employed.",
			thresholds() {
				return {
					min: 1.6,
					normal: 2.5,
					max: 8
				}
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * T(k(n, 5 * y) + .25, 3) + .25 * r * T(k(n, y), 3) + .3 * T(k(n, 2 * m), 1)
			}
		}, {
			id: "height",
			name: "Height",
			unit: "cm",
			description: "Height measurement",
			thresholds(e) {
				let n = Math.round(A(140, 170)),
					r = ("female" === e.sex ? .96 : 1) * n / 167;
				return {
					min: Math.round(50 * r * 10) / 10,
					normal: Math.round(r * n * 10) / 10,
					max: Math.round(r * n * 1.1 * 10) / 10
				}
			},
			initial(e, n, r) {
				let t = e.age(n);
				return ("female" === e.sex ? .96 : 1) * r / 167 * (t.months < 3 ? 10 * t.months + 50 : t.years <= 14 ? 6 * t.years + 77 : t.years <= 19 ? 2 * t.years + 135 : 173)
			},
			other: (e, n, r) => {
				let t = 1.5 * T(k(n, 2 * m), 2);
				return r + t
			}
		}, {
			id: "hr",
			name: "Heart rate",
			unit: "bpm",
			description: "Heart rate",
			thresholds() {
				return {
					min: 40,
					normal: Math.round(A(50, 70)),
					max: 220
				}
			},
			associations(e, n, r) {
				H(S(5, r => e.sample("caloric-burn", new Date(n.getTime() - 10 * r * 6e4))));return r
			},
			fluctuations(e, n, r) {
				return r + 20 * T(k(n, 5 * y), 3) + 20 * T(k(n, y), 3) + 50 * T(k(n, 36e5) + .1, 4)
			}
		}, {
			id: "diagnosis",
			name: "Diagnosis",
			description: "A diagnosis made by a clinician.",
			initial() {
				return P(B)
			},
			filter(e) {
				return null !== e
			}
		}, {
			id: "caloric-intake",
			name: "Caloric intake",
			unit: "kcal",
			description: "Calories consumed.",
			thresholds() {
				return {
					min: 0,
					normal: Math.round(A(2e3, 3500))
				}
			},
			initial(e, n, r) {
				var t = e.age(n);
				return ("female" === e.sex ? .9 : 1) * r / 2e3 * (t.years < 18 ? 1e3 + t.years * (1600 / 14) : t.years < 40 ? 1e3 - (t.years - 68) / 40 * 1600 : 2e3)
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + (1e3 + .55 * r) * T(k(n, 5 * y) + .25, 3) + (1e3 + .25 * r) * T(k(n, y), 3) + r * k(n, m)
			}
		}, {
			id: "caloric-burn",
			name: "Caloric burn",
			unit: "kcal",
			description: "Calories burned, for example, through exercise",
			thresholds() {
				let e = Math.round(A(1500, 3e3));
				return {
					min: Math.round(A(750, 950)),
					normal: e,
					max: Math.round(A(2.5 * e, 3.5 * e))
				}
			},
			fluctuations(e, n, r) {
				return r * (.9 + .2 * k(n, y)) + 1 * r * Math.abs(k(n, 6e4)) + 1 * r * T(k(n, 36e5), 19) + r / 24 * 60 * k(n, 6e4)
			}
		}, {
			id: "symptom-breathlessness",
			name: "Breathlessness",
			unit: "severity",
			description: "An episode of breathlessness.",
			thresholds() {
				return {
					min: 0,
					normal: 0,
					max: 5
				}
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return 5 * (r + .55 * r * T(k(n, 5 * y) + .25, 3) + .25 * r * T(k(n, y), 3) + 3 * T(k(n, 2 * m), 3))
			},
			filter(e) {
				return e > 0
			}
		}, {
			id: "bp-systolic",
			name: "Systolic blood pressure",
			unit: "mmHg",
			description: "Systolic blood pressure",
			thresholds() {
				return {
					min: Math.round(A(45, 55)),
					normal: Math.round(A(100, 120)),
					max: Math.round(A(140, 250))
				}
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * T(k(n, 3 * y) + .25, 3) + .25 * r * T(k(n, 2592e6), 3) + .5 * r * T(k(n, 432e6), 3) + 40 * T(k(n, 18e6), 4.5)
			}
		}, {
			id: "bp-diastolic",
			name: "Diastolic blood pressure",
			unit: "mmHg",
			description: "Diastolic blood pressure",
			thresholds() {
				return {
					min: Math.round(A(28, 42)),
					normal: Math.round(A(60, 80)),
					max: Math.round(A(130, 145))
				}
			},
			associations(e, n, r) {
				return r
			},
			fluctuations(e, n, r) {
				return r + .55 * r * T(k(n, 3 * y) + .25, 3) + .25 * r * T(k(n, 2592e6), 3) + .5 * r * T(k(n, 432e6), 3) + 40 * T(k(n, 18e6), 4.5)
			}
		}],
		q = [{
			id: "symptom-diary",
			types: ["symptom-palpitations", "symptom-breathlessness"],
			name: "Symptom diary",
			description: "Person recorded an episode of palpitations.",
			reviewQuery: "patient symptom diary",
			precision: 1,
			next: e => m + 2592e6 * Math.abs(k(e, m))
		}, {
			id: "scales",
			reviewQuery: "weighing scales accuracy health adult",
			types: ["weight"],
			name: "Weighing scales",
			description: "Consumer analog weighing scales.",
			precision: .5,
			next: e => m + 6048e5 * Math.abs(k(e, m))
		}, {
			id: "medicate",
			types: ["medicate"],
			precision: .01,
			name: "Medication diary",
			reviewQuery: "medication diary",
			description: "The person took their medication and recorded it.",
			next: e => m + 6048e5 * Math.abs(k(e, m))
		}, {
			id: "inr-reader",
			name: "INR reader",
			description: "Consumer INR reader.",
			reviewQuery: "inr self-monitoring",
			types: ["inr"],
			precision: .01,
			next: e => m + 2592e6 * Math.abs(k(e, m))
		}, {
			id: "height-manual",
			types: ["height"],
			name: "Tape measure.",
			description: "Tape measure.",
			reviewQuery: "patient height self tracking",
			precision: .5,
			next: e => m + 2592e6 * Math.abs(k(e, m))
		}, {
			id: "fitbit-step-counter",
			name: "Fitbit Surge",
			reviewQuery: "fitbit physical activity",
			types: ["caloric-burn"],
			precision: 1,
			description: "A wearable device which records steps through motion sensors.",
			next: e => m + 2592e6 * Math.abs(k(e, m))
		}, {
			id: "fitbit-sleep",
			name: "Fitbit Surge",
			types: ["sleep"],
			reviewQuery: "fitbit sleep",
			description: "A wearable device which records sleep through motion sensors.",
			precision: .2,
			next: e => m + T(Math.abs(k(e, m)), 3) * m
		}, {
			id: "fitbit-intake",
			name: "Fitbit App",
			reviewQuery: "patient calorie tracker",
			description: "An app which can be used with the Fitbit device to record diet.",
			types: ["caloric-intake"],
			precision: 1,
			next: e => m + 2 * Math.abs(k(e, m)) * m
		}, {
			id: "daylio-mood",
			name: "Daylio app",
			reviewQuery: "patient mood diary",
			description: "A mood diary app.",
			types: ["satisfaction"],
			precision: 10,
			next: e => m + 6048e5 * Math.abs(k(e, m))
		}, {
			id: "clinical-visit",
			name: "Clinical visit",
			description: "Visit to a clinic or hospital",
			types: ["diagnosis", "procedure", "prescription"],
			reviewQuery: "clinical visit diary patient",
			next: e => m + 2592e6 * Math.abs(k(e, 2592e6))
		}, {
			id: "valuemed-bp",
			name: "ValueMed Blood Pressure Cuff",
			types: ["bp-diastolic", "bp-systolic"],
			description: "A cheap consumer blood pressure cuff.",
			unit: "mmHg",
			reviewQuery: "consumer blood pressure cuff",
			precision: 2,
			next: e => 432e5 + 2592e6 * Math.abs(k(e, m)) / 3
		}, {
			id: "iwatch-hr",
			name: "Apple Watch",
			description: "Apple Watch smartwatch heart rate monitor. The heart rate is read using light sensors.",
			types: ["hr"],
			reviewQuery: "apple watch heart rate",
			precision: 1,
			next: e => 6e4 + Math.abs(k(e, m)) * m
		}],
		L = {
			male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas"],
			female: ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Stephanie", "Carolyn", "Christine", "Marie", "Janet"]
		},
		W = ["Scully", "Lightfoot", "Sandberg", "Boggs", "Swain", "Herring", "Williford", "Jacobs", "Clifton", "Cooke", "Rinaldi", "Edward", "Villa", "Slater", "Reese", "Forrester", "Foley", "Wheaton", "Atherton", "Cady", "Branson", "Mcneal", "Sharp", "Wirth", "Archer", "Spivey", "Field", "Hagan", "Lin", "Andrew", "Guerra", "Kinsey", "Galindo", "Popp", "Hiatt", "Howes", "Hilliard", "Blackwell", "Elliott", "Tanner", "Alexander", "Ledford", "Alderman", "Hairston", "Markham"],
		E = [["a+", .3], ["a-", .08], ["b+", .08], ["b-", .02], ["o+", .36], ["o-", .12], ["ab+", .03], ["ab-", .01]],
		j = function() {
			let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			var n = e.person;
			let r = void 0 === n ? {} : n;
			var t = e.fluctuations;
			let i = void 0 === t || t;
			var a = e.associations;
			let o = void 0 === a || a;
			var s = e.days;
			let u = void 0 === s ? 30 : s;
			x(), r.hasOwnProperty("id") || (r.id = D()), r.hasOwnProperty("version") || (r.version = 0), r.hasOwnProperty("sex") || (r.sex = C(["male", "female"])), r.hasOwnProperty("firstName") || (r.firstName = C(L[r.sex])), r.hasOwnProperty("lastName") || (r.lastName = C(W)), r.hasOwnProperty("birthdate") || (r.birthdate = new Date(Date.now() - A(0, 70) * y)), r.hasOwnProperty("bloodType") || (r.bloodType = P(E)), M(r.id), r.version++, r.types = F.map(e => {
				let n = (r.types || []).find(n => n.id === e.id),
					t = Object.assign({}, n, e);
				"function" == typeof t.thresholds && (t.thresholds = e.thresholds(r));return t
			}), r.sources = q, r.nodes = [], r.birthdate = new Date(r.birthdate), r.age = (e => {
				let n = e.getTime() - r.birthdate.getTime();
				return {
					days: n / m,
					month: n / 2592e6,
					years: n / y
				}
			}), r.sample = function(e, n) {
				let t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
					a = M(J(`${r.id}:type:${e}`)),
					s = r.types.find(n => n.id === e),
					u = null;
				return s.thresholds && s.thresholds.hasOwnProperty("normal") && (u = s.thresholds.normal), s.initial && (u = s.initial(r, n, u)), s.associations && t && o && (u = s.associations(r, n, u)), s.fluctuations && i && (u = s.fluctuations(r, n, u)), s.thresholds && s.thresholds.hasOwnProperty("max") && (u = Math.min(s.thresholds.max, u)), s.thresholds && s.thresholds.hasOwnProperty("min") && (u = Math.max(s.thresholds.min, u)), M(a), u
			};
			let c = new Date(Date.now() - u * m),
				l = new Date;
			return N(q).map(e => {
					let n = M(J(`${r.id}:source:${e.id}`)),
						t = e.types.map(e => F.find(n => n.id === e)),
						i = c.getTime() + e.next(c),
						a = l.getTime();
					for (; i < a;) {
						let n = new Date(i);
						t.forEach(t => {
							let i = r.sample(t.id, n, !0);
							if (e.hasOwnProperty("precision")) {
								let n = (e.precision + ".").split(".")[1].length;
								i = (Math.round(i / e.precision) * e.precision).toFixed(n)
							}
							(!t.filter || t.filter && t.filter(i)) && r.nodes.push({
								date: n,
								type: t.id,
								source: e.id,
								value: i
							})
						}), i += e.next(n)
					}
					M(n);return {
						id: e.id,
						name: e.name,
						unit: e.unit,
						description: e.description,
						reviewQuery: e.reviewQuery
					}
				}), r.nodes = r.nodes.sort((e, n) => e.date - n.date), r
		};
	if ("undefined" != typeof require && require.main === module) {
		const e = require("fs"),
			n = require("yargs").usage("$0 [options] <outfile>", "Generate healthdata", e => {
				e.positional("outfile", {
					describe: "The output json file"
				})
			}).alias("p", "person").describe("p", "Existing person file").alias("d", "days").describe("days", "Number of days to generate health data for").default("d", 30).alias("a", "associations").describe("a", "Account for associated events").default("a", !0).alias("f", "fluctuations").describe("f", "Account for random fluctuations").default("f", !0).alias("h", "help").help("h").alias("v", "version").example("$0 example.json", "generate random person and health data").example("$0 -p example.json example2.json", "regenerate health data for existing person").demandCommand(1).argv;
		n.person && (n.person = JSON.parse(e.readFileSync(n.person), "utf8"));
		let r = j(n);
		e.writeFileSync(n.outfile, JSON.stringify(r, null, 2), "utf8")
	}
	return {
		generate: j,
		types: F,
		sources: q
	}
});
