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
		var t = n || 0,
			r = c;
		return r[e[t++]] + r[e[t++]] + r[e[t++]] + r[e[t++]] + "-" + r[e[t++]] + r[e[t++]] + "-" + r[e[t++]] + r[e[t++]] + "-" + r[e[t++]] + r[e[t++]] + "-" + r[e[t++]] + r[e[t++]] + r[e[t++]] + r[e[t++]] + r[e[t++]] + r[e[t++]]
	}
	function t(e, n, t) {
		var r = n && t || 0;
		"string" == typeof e && (n = "binary" == e ? new Array(16) : null, e = null);var a = (e = e || {}).random || (e.rng || u)();
		if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, n)
			for (var i = 0; i < 16; ++i) n[r + i] = a[i];
		return n || l(a)
	}
	var r,
		a = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		i = a.crypto || a.msCrypto;
	if (i && i.getRandomValues) {
		var o = new Uint8Array(16);
		r = function() {
			return i.getRandomValues(o), o
		}
	}
	if (!r) {
		var s = new Array(16);
		r = function() {
			for (var e, n = 0; n < 16; n++) 0 == (3 & n) && (e = 4294967296 * Math.random()), s[n] = e >>> ((3 & n) << 3) & 255;
			return s
		}
	}
	for (var u = r, c = [], f = 0; f < 256; ++f) c[f] = (f + 256).toString(16).substr(1);
	var l = n,
		d = t,
		h = e(function(e, n) {
			!function() {
				function t(e) {
					e || (e = Math.random), this.p = r(e), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);
					for (var n = 0; n < 512; n++) this.perm[n] = this.p[255 & n], this.permMod12[n] = this.perm[n] % 12
				}
				function r(e) {
					var n,
						t = new Uint8Array(256);
					for (n = 0; n < 256; n++) t[n] = n;
					for (n = 0; n < 255; n++) {
						var r = n + 1 + ~~(e() * (255 - n)),
							a = t[n];
						t[n] = t[r], t[r] = a
					}
					return t
				}
				var a = .5 * (Math.sqrt(3) - 1),
					i = (3 - Math.sqrt(3)) / 6,
					o = 1 / 6,
					s = (Math.sqrt(5) - 1) / 4,
					u = (5 - Math.sqrt(5)) / 20;
				t.prototype = {
					grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
					grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
					noise2D: function(e, n) {
						var t,
							r,
							o = this.permMod12,
							s = this.perm,
							u = this.grad3,
							c = 0,
							f = 0,
							l = 0,
							d = (e + n) * a,
							h = Math.floor(e + d),
							p = Math.floor(n + d),
							m = (h + p) * i,
							y = e - (h - m),
							g = n - (p - m);
						y > g ? (t = 1, r = 0) : (t = 0, r = 1);
						var v = y - t + i,
							b = g - r + i,
							w = y - 1 + 2 * i,
							M = g - 1 + 2 * i,
							x = 255 & h,
							S = 255 & p,
							A = .5 - y * y - g * g;
						if (A >= 0) {
							var D = 3 * o[x + s[S]];
							c = (A *= A) * A * (u[D] * y + u[D + 1] * g)
						}
						var H = .5 - v * v - b * b;
						if (H >= 0) {
							var P = 3 * o[x + t + s[S + r]];
							f = (H *= H) * H * (u[P] * v + u[P + 1] * b)
						}
						var k = .5 - w * w - M * M;
						if (k >= 0) {
							var B = 3 * o[x + 1 + s[S + 1]];
							l = (k *= k) * k * (u[B] * w + u[B + 1] * M)
						}
						return 70 * (c + f + l)
					},
					noise3D: function(e, n, t) {
						var r,
							a,
							i,
							s,
							u,
							c,
							f,
							l,
							d,
							h,
							p = this.permMod12,
							m = this.perm,
							y = this.grad3,
							g = (e + n + t) * (1 / 3),
							v = Math.floor(e + g),
							b = Math.floor(n + g),
							w = Math.floor(t + g),
							M = (v + b + w) * o,
							x = e - (v - M),
							S = n - (b - M),
							A = t - (w - M);
						x >= S ? S >= A ? (u = 1, c = 0, f = 0, l = 1, d = 1, h = 0) : x >= A ? (u = 1, c = 0, f = 0, l = 1, d = 0, h = 1) : (u = 0, c = 0, f = 1, l = 1, d = 0, h = 1) : S < A ? (u = 0, c = 0, f = 1, l = 0, d = 1, h = 1) : x < A ? (u = 0, c = 1, f = 0, l = 0, d = 1, h = 1) : (u = 0, c = 1, f = 0, l = 1, d = 1, h = 0);
						var D = x - u + o,
							H = S - c + o,
							P = A - f + o,
							k = x - l + 2 * o,
							B = S - d + 2 * o,
							C = A - h + 2 * o,
							O = x - 1 + .5,
							T = S - 1 + .5,
							R = A - 1 + .5,
							J = 255 & v,
							F = 255 & b,
							N = 255 & w,
							W = .6 - x * x - S * S - A * A;
						if (W < 0)
							r = 0;
						else {
							var _ = 3 * p[J + m[F + m[N]]];
							r = (W *= W) * W * (y[_] * x + y[_ + 1] * S + y[_ + 2] * A)
						}
						var Q = .6 - D * D - H * H - P * P;
						if (Q < 0)
							a = 0;
						else {
							var q = 3 * p[J + u + m[F + c + m[N + f]]];
							a = (Q *= Q) * Q * (y[q] * D + y[q + 1] * H + y[q + 2] * P)
						}
						var L = .6 - k * k - B * B - C * C;
						if (L < 0)
							i = 0;
						else {
							var E = 3 * p[J + l + m[F + d + m[N + h]]];
							i = (L *= L) * L * (y[E] * k + y[E + 1] * B + y[E + 2] * C)
						}
						var G = .6 - O * O - T * T - R * R;
						if (G < 0)
							s = 0;
						else {
							var K = 3 * p[J + 1 + m[F + 1 + m[N + 1]]];
							s = (G *= G) * G * (y[K] * O + y[K + 1] * T + y[K + 2] * R)
						}
						return 32 * (r + a + i + s)
					},
					noise4D: function(e, n, t, r) {
						var a,
							i,
							o,
							c,
							f,
							l = this.perm,
							d = this.grad4,
							h = (e + n + t + r) * s,
							p = Math.floor(e + h),
							m = Math.floor(n + h),
							y = Math.floor(t + h),
							g = Math.floor(r + h),
							v = (p + m + y + g) * u,
							b = e - (p - v),
							w = n - (m - v),
							M = t - (y - v),
							x = r - (g - v),
							S = 0,
							A = 0,
							D = 0,
							H = 0;
						b > w ? S++ : A++, b > M ? S++ : D++, b > x ? S++ : H++, w > M ? A++ : D++, w > x ? A++ : H++, M > x ? D++ : H++;
						var P,
							k,
							B,
							C,
							O,
							T,
							R,
							J,
							F,
							N,
							W,
							_,
							Q = b - (P = S >= 3 ? 1 : 0) + u,
							q = w - (k = A >= 3 ? 1 : 0) + u,
							L = M - (B = D >= 3 ? 1 : 0) + u,
							E = x - (C = H >= 3 ? 1 : 0) + u,
							G = b - (O = S >= 2 ? 1 : 0) + 2 * u,
							K = w - (T = A >= 2 ? 1 : 0) + 2 * u,
							V = M - (R = D >= 2 ? 1 : 0) + 2 * u,
							j = x - (J = H >= 2 ? 1 : 0) + 2 * u,
							I = b - (F = S >= 1 ? 1 : 0) + 3 * u,
							U = w - (N = A >= 1 ? 1 : 0) + 3 * u,
							$ = M - (W = D >= 1 ? 1 : 0) + 3 * u,
							z = x - (_ = H >= 1 ? 1 : 0) + 3 * u,
							X = b - 1 + 4 * u,
							Y = w - 1 + 4 * u,
							Z = M - 1 + 4 * u,
							ee = x - 1 + 4 * u,
							ne = 255 & p,
							te = 255 & m,
							re = 255 & y,
							ae = 255 & g,
							ie = .6 - b * b - w * w - M * M - x * x;
						if (ie < 0)
							a = 0;
						else {
							var oe = l[ne + l[te + l[re + l[ae]]]] % 32 * 4;
							a = (ie *= ie) * ie * (d[oe] * b + d[oe + 1] * w + d[oe + 2] * M + d[oe + 3] * x)
						}
						var se = .6 - Q * Q - q * q - L * L - E * E;
						if (se < 0)
							i = 0;
						else {
							var ue = l[ne + P + l[te + k + l[re + B + l[ae + C]]]] % 32 * 4;
							i = (se *= se) * se * (d[ue] * Q + d[ue + 1] * q + d[ue + 2] * L + d[ue + 3] * E)
						}
						var ce = .6 - G * G - K * K - V * V - j * j;
						if (ce < 0)
							o = 0;
						else {
							var fe = l[ne + O + l[te + T + l[re + R + l[ae + J]]]] % 32 * 4;
							o = (ce *= ce) * ce * (d[fe] * G + d[fe + 1] * K + d[fe + 2] * V + d[fe + 3] * j)
						}
						var le = .6 - I * I - U * U - $ * $ - z * z;
						if (le < 0)
							c = 0;
						else {
							var de = l[ne + F + l[te + N + l[re + W + l[ae + _]]]] % 32 * 4;
							c = (le *= le) * le * (d[de] * I + d[de + 1] * U + d[de + 2] * $ + d[de + 3] * z)
						}
						var he = .6 - X * X - Y * Y - Z * Z - ee * ee;
						if (he < 0)
							f = 0;
						else {
							var pe = l[ne + 1 + l[te + 1 + l[re + 1 + l[ae + 1]]]] % 32 * 4;
							f = (he *= he) * he * (d[pe] * X + d[pe + 1] * Y + d[pe + 2] * Z + d[pe + 3] * ee)
						}
						return 27 * (a + i + o + c + f)
					}
				}, t._buildPermutationTable = r, n.SimplexNoise = t, e.exports = t
			}()
		}),
		p = e(function(e, n) {
			!function(n, t) {
				e.exports = function() {
					function e() {
						return function(e) {
							var t = 0,
								r = 0,
								a = 0,
								i = 1;
							0 == e.length && (e = [+new Date]);
							var o = n();
							t = o(" "), r = o(" "), a = o(" ");
							for (var s = 0; s < e.length; s++) (t -= o(e[s])) < 0 && (t += 1), (r -= o(e[s])) < 0 && (r += 1), (a -= o(e[s])) < 0 && (a += 1);
							o = null;
							var u = function() {
								var e = 2091639 * t + 2.3283064365386963e-10 * i;
								return t = r, r = a, a = e - (i = 0 | e)
							};
							return u.uint32 = function() {
									return 4294967296 * u()
								}, u.fract53 = function() {
									return u() + 1.1102230246251565e-16 * (2097152 * u() | 0)
								}, u.version = "Alea 0.9", u.args = e, u.exportState = function() {
									return [t, r, a, i]
								}, u.importState = function(e) {
									t = +e[0] || 0, r = +e[1] || 0, a = +e[2] || 0, i = +e[3] || 0
								}, u
						}(Array.prototype.slice.call(arguments))
					}
					function n() {
						var e = 4022871197,
							n = function(n) {
								n = n.toString();
								for (var t = 0; t < n.length; t++) {
									var r = .02519603282416938 * (e += n.charCodeAt(t));
									r -= e = r >>> 0, e = (r *= e) >>> 0, e += 4294967296 * (r -= e)
								}
								return 2.3283064365386963e-10 * (e >>> 0)
							};
						return n.version = "Mash 0.9", n
					}
					return e.importState = function(n) {
							var t = new e;
							return t.importState(n), t
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
		M[e] ? (v = M[e].prng, b = M[e].simplex) : (v = new p(e), b = new h(v), M[e] = {
			prng: v,
			simplex: b
		});let n = w;
		w = e;return n
	};
	x(1);
	const S = () => {
			M = {};x(Math.random())
		},
		A = function() {
			let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
				n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
			return e + v() * (n - e)
		},
		D = (e, n) => Array(e).fill(0).map((e, t) => n(t)),
		H = () => d().slice(0, 4) + d().slice(-2),
		P = e => e[Math.floor(A(0, e.length))],
		k = e => {
			let n = e.reduce((e, n) => e + n[1], 0);
			if (0 === n) return P(e)[0];
			let t = A(0, n);
			return e.find((n, r) => {
				let a = e.slice(0, r).reduce((e, n) => e + n[1], 0);
				return t > a && t <= a + n[1]
			})[0]
		},
		B = (e, n) => b.noise2D(e.valueOf() / n / 5, 0),
		C = function(e) {
			let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3.3;
			return (e < 0 ? -1 : 1) * Math.pow(Math.abs(e), n)
		},
		O = e => e.reduce((n, t) => n + t / e.length, 0),
		T = e => e.reduce((e, n) => e + n, 0),
		R = e => e.split("").reduce((e, n) => e + n.charCodeAt(0), 0),
		J = e => {
			let n,
				t,
				r = e.length;
			for (; 0 !== r;) t = Math.floor(A(0, r)), n = e[r -= 1], e[r] = e[t], e[t] = n;
			return e
		},
		F = [["obesity", 1], ["heart failure", 1], ["hypertension", 1], ["atrial fibrillation", 1], ["stroke", 1], ["leg fracture", 1], ["arm fracture", 1], ["lung cancer", 1], ["depression", 1]],
		N = [{
			id: "weight",
			name: "Body weight",
			unit: "kg",
			thresholds() {
				return {
					min: 2,
					max: 500
				}
			},
			initial(e, n) {
				var t = e.age(n);
				return e.normalWeight / 93 * (t.months <= 3 ? 3.25 : t.years <= 1 ? (t.months + 9) / 2 : t.years <= 6 ? 2 * t.years + 8 : t.years <= 12 ? (7 * t.years - 5) / 2 : t.years <= 19 ? (9 * t.years - 26) / 2 : 75)
			},
			associations(e, n, t) {
				var r = n.getTime(),
					a = O(D(30, n => e.sample("intake", new Date(r - (n + 6) * m)))),
					i = T(D(30, n => e.sample("caloric_burn", new Date(r - (n + 4) * m))));
				return t + a / 200 - 4 * C(Math.min(1, i / 200))
			},
			fluctuations(e, n, t) {
				return t + .35 * t * C(B(n, 5 * g) + .25, 3) + .15 * t * C(B(n, g) + .25, 3) + .007 * t * C(B(n, 6048e5), 2)
			}
		}, {
			id: "sleep",
			name: "Sleep",
			unit: "hours",
			thresholds() {
				return {
					min: 0,
					max: 24
				}
			},
			initial(e, n) {
				return 13.212 * (e.normalSleepHours / 6.3) * Math.pow(e.age(n).years, -.134)
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				var r = e.age(n);
				return t + .5 * C(B(n, 5 * g) + .25, 3) + .5 * C(B(n, g) + .25, 3) + (r.years < 18 ? r.years / 18 * t : t) * (.25 * C(B(n, y), 3) + .25 * C(B(n, m) - .15, 5) + .5 * C(B(n, m) + .06, 1.5))
			}
		}, {
			id: "satisfaction",
			name: "Life satisfaction",
			thresholds() {
				return {
					min: 0,
					max: 1
				}
			},
			initial(e) {
				return e.normalSatisfaction
			},
			associations(e, n, t) {
				var r = e.sample("sleep", n);
				return t + (r < 7 ? B(n, 3 * m) * (7 / r - 1) : 0)
			},
			fluctuations(e, n, t) {
				var r = e.age(n);
				return t + .15 * C(B(n, 5 * g), 3) + .25 * C(B(n, g), 1) + .35 * C(B(n, y), 6) + .15 * B(n, y) + (r.years < 18 ? r.years / 18 * 1 : 1) * (.2 * C(B(n, m), 1) + .2 * C(B(n, 6048e5), 2) + .7 * C(B(n, 6048e5), 6))
			}
		}, {
			id: "procedure",
			name: "Clinical procedure",
			thresholds() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .3 * C(B(n, m), 25)
			}
		}, {
			id: "prescription",
			name: "Drug prescription",
			thresholds() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .3 * C(B(n, m), 8)
			}
		}, {
			id: "palpitations",
			name: "Palpitations",
			unit: "severity",
			thresholds: function() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .55 * t * C(B(n, 5 * g) + .25, 3) + .25 * t * C(B(n, g), 3) + .3 * C(B(n, 2 * m), 3)
			}
		}, {
			id: "medicate",
			name: "Dosage",
			unit: "%",
			thresholds() {
				return {
					min: 0,
					max: 1
				}
			},
			initial() {
				return .9
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .55 * t * C(B(n, 5 * g) + .25, 3) + .25 * t * C(B(n, g), 3) + .3 * C(B(n, m), 3)
			}
		}, {
			id: "inr",
			name: "International Normalized Ratio (INR)",
			thresholds() {
				return {
					min: 1.6,
					max: 8
				}
			},
			initial() {
				return 2.5
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .55 * t * C(B(n, 5 * g) + .25, 3) + .25 * t * C(B(n, g), 3) + .3 * C(B(n, 2 * m), 1)
			}
		}, {
			id: "height",
			name: "Height",
			unit: "cm",
			thresholds(e) {
				let n = ("female" === e.sex ? .96 : 1) * e.normalHeight / 167;
				return {
					min: 50 * n,
					max: 250 * n
				}
			},
			initial(e, n) {
				let t = e.age(n);
				return ("female" === e.sex ? .96 : 1) * e.normalHeight / 167 * (t.months < 3 ? 10 * t.months + 50 : t.years <= 14 ? 6 * t.years + 77 : t.years <= 19 ? 2 * t.years + 135 : 173)
			},
			other: (e, n, t) => {
				let r = 1.5 * C(B(n, 2 * m), 2);
				return t + r
			}
		}, {
			id: "hr",
			name: "Heart rate",
			unit: "bpm",
			thresholds(e, n) {
				return {
					min: 40,
					max: 220 - e.age(n).years
				}
			},
			initial(e) {
				return e.restingHeartRate
			},
			associations(e, n, t) {
				return t + O(D(5, function(t) {
						return e.sample("caloric_burn", new Date(n.getTime() - 10 * t * 6e4))
					})) / e.avgBurn * 8
			},
			fluctuations(e, n, t) {
				return t + 20 * C(B(n, 5 * g), 3) + 20 * C(B(n, g), 3) + 50 * C(B(n, 36e5) + .1, 4)
			}
		}, {
			id: "diagnosis",
			name: "Diagnosis",
			initial() {
				return k(F)
			}
		}, {
			id: "intake",
			name: "Caloric intake",
			unit: "kcal",
			thresholds() {
				return {
					min: 0
				}
			},
			initial(e, n) {
				var t = e.age(n);
				return ("female" === e.sex ? .9 : 1) * e.normalIntake / 2e3 * (t.years < 18 ? 1e3 + t.years * (1600 / 14) : t.years < 40 ? 1e3 - (t.years - 68) / 40 * 1600 : 2e3)
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + (1e3 + .55 * t) * C(B(n, 5 * g) + .25, 3) + (1e3 + .25 * t) * C(B(n, g), 3) + t * B(n, m)
			}
		}, {
			id: "caloric_burn",
			name: "Caloric burn",
			unit: "kcal",
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
				return e.avgBurn * (.9 + .2 * B(n, g)) + 1 * e.avgBurn * Math.abs(B(n, 6e4)) + 1 * e.avgBurn * C(B(n, 36e5), 19) + e.avgBurn / 24 * 60 * B(n, 6e4)
			}
		}, {
			id: "breathlessness",
			name: "Breathlessness",
			unit: "severity",
			thresholds() {
				return {
					min: 0
				}
			},
			initial() {
				return 0
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .55 * t * C(B(n, 5 * g) + .25, 3) + .25 * t * C(B(n, g), 3) + .3 * C(B(n, 2 * m), 3)
			}
		}, {
			id: "bp_systolic",
			name: "Systolic blood pressure",
			unit: "mmHg",
			thresholds() {
				return {
					min: 50,
					max: 250
				}
			},
			initial() {
				return 110
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .55 * t * C(B(n, 3 * g) + .25, 3) + .25 * t * C(B(n, y), 3) + .5 * t * C(B(n, 432e6), 3) + 40 * C(B(n, 18e6), 4.5)
			}
		}, {
			id: "bp_diastolic",
			name: "Diastolic blood pressure",
			unit: "mmHg",
			thresholds() {
				return {
					min: 30,
					max: 140
				}
			},
			initial() {
				return 70
			},
			associations(e, n, t) {
				return t
			},
			fluctuations(e, n, t) {
				return t + .55 * t * C(B(n, 3 * g) + .25, 3) + .25 * t * C(B(n, y), 3) + .5 * t * C(B(n, 432e6), 3) + 40 * C(B(n, 18e6), 4.5)
			}
		}],
		W = [{
			id: "palpitations",
			types: ["palpitations"],
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "breathlessness",
			types: ["breathlessness"],
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "scales",
			reviewQuery: "weighing scales accuracy health adult",
			types: ["weight"],
			precision: .5,
			next: e => m + 6048e5 * Math.abs(B(e, m))
		}, {
			id: "medicate",
			types: ["medicate"],
			precision: .01,
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "inr_reader",
			types: ["inr"],
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "height manual",
			types: ["height"],
			precision: .5,
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "fitbit-step-counter",
			name: "Fitbit Surge",
			reviewQuery: "fitbit physical activity",
			types: ["caloric_burn"],
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "fitbit-sleep",
			name: "Fitbit Surge",
			types: ["sleep"],
			reviewQuery: "fitbit sleep",
			precision: .1,
			next: e => m + C(Math.abs(B(e, m)), 3) * m
		}, {
			id: "fitbit - intake",
			name: "Fitbit App",
			reviewQuery: "calorie tracker",
			types: ["intake"],
			next: e => m + 2 * Math.abs(B(e, m)) * m
		}, {
			id: "daylio - mood",
			name: "Daylio app",
			reviewQuery: "mood diary app",
			types: ["satisfaction"],
			next: e => m + Math.abs(B(e, m)) * y
		}, {
			id: "clinical-visit",
			name: "Clinical visit",
			description: "Visit to a clinic or hospital",
			types: ["diagnosis", "procedure", "prescription"],
			next: e => m + Math.abs(B(e, y)) * y
		}, {
			id: "valuemed-bp",
			name: "ValueMed Blood Pressure Cuff",
			types: ["bp_diastolic", "bp_systolic"],
			unit: "mmHg",
			reviewQuery: "consumer blood pressure cuff",
			precision: 2,
			next: e => 432e5 + Math.abs(B(e, m)) * y / 3
		}, {
			id: "iwatch-hr",
			name: "Apple Watch",
			description: "Apple Watch smartwatch heart rate monitor. The heart rate is read using light sensors.",
			types: ["hr"],
			reviewQuery: "apple watch heart rate",
			precision: 1,
			next: e => 6e4 + Math.abs(B(e, m)) * m
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
			let t = void 0 === n ? {} : n;
			var r = e.fluctuations;
			let a = void 0 === r || r;
			var i = e.associations;
			let o = void 0 === i || i;
			var s = e.days;
			let u = void 0 === s ? 30 : s;
			S(), t.hasOwnProperty("id") || (t.id = H()), t.hasOwnProperty("version") || (t.version = 0), t.hasOwnProperty("sex") || (t.sex = P(["male", "female"])), t.hasOwnProperty("firstName") || (t.firstName = P(_[t.sex])), t.hasOwnProperty("lastName") || (t.lastName = P(Q)), t.hasOwnProperty("birthdate") || (t.birthdate = new Date(Date.now() - A(0, 70) * g)), t.hasOwnProperty("bloodType") || (t.bloodType = k(q)), t.hasOwnProperty("normalHeight") || (t.normalHeight = 150), t.hasOwnProperty("normalWeight") || (t.normalWeight = 90), t.hasOwnProperty("normalIntake") || (t.normalIntake = 2500), t.hasOwnProperty("normalSatisfaction") || (t.normalSatisfaction = .5), t.hasOwnProperty("normalSleepHours") || (t.normalSleepHours = 8), t.hasOwnProperty("restingHeartRate") || (t.restingHeartRate = 60), t.hasOwnProperty("avgBurn") || (t.avgBurn = A(1500, 3e3)), x(t.id), t.version++, t.sources = W, t.types = N, t.nodes = [], t.birthdate = new Date(t.birthdate), t.age = (e => {
				let n = e.getTime() - t.birthdate.getTime();
				return {
					days: n / m,
					month: n / y,
					years: n / g
				}
			}), t.sample = ((e, n, r) => {
				let i = x(R(`${t.id}:type:${e}`)),
					s = N.find(n => n.id === e),
					u = s.initial(t, n);
				s.associations && r && o && (u = s.associations(t, n, u));s.fluctuations && a && (u = s.fluctuations(t, n, u));
				if (s.thresholds) {
					let e = s.thresholds(t, n);
					e.max && (u = Math.min(e.max, u)), e.min && (u = Math.max(e.min, u))
				}
				x(i);return u
			});
			let c = new Date(Date.now() - u * m),
				f = new Date;
			return J(W).map(e => {
					let n = x(R(`${t.id}:source:${e.id}`)),
						r = e.types.map(e => N.find(n => n.id === e)),
						a = c.getTime() + e.next(c),
						i = f.getTime();
					for (; a < i;) {
						let n = new Date(a);
						r.forEach(r => {
							let a = t.sample(r.id, n, !0);
							if (e.precision) {
								let n = (e.precision + ".").split(".")[1].length;
								a = Number((Math.round(1 * a / e.precision) * e.precision).toFixed(n))
							}
							t.nodes.push({
								date: n,
								type: r.id,
								source: e.id,
								value: a
							})
						}), a += e.next(n)
					}
					x(n);return {
						id: e.id,
						name: e.name,
						unit: e.unit,
						description: e.description,
						reviewQuery: e.reviewQuery
					}
				}), t.nodes = t.nodes.sort((e, n) => e.date.getTime() - n.date.getTime()), t
		};
	if ("undefined" != typeof require && require.main === module) {
		const e = require("fs"),
			n = require("yargs").usage("$0 [options] <outfile>", "Generate healthdata", e => {
				e.positional("outfile", {
					describe: "The output json file"
				})
			}).alias("p", "person").describe("p", "Existing person file").alias("d", "days").describe("days", "Number of days to generate health data for").default("d", 30).alias("a", "associations").describe("a", "Account for associated events").default("a", !0).alias("f", "fluctuations").describe("f", "Account for random fluctuations").default("f", !0).alias("h", "help").help("h").alias("v", "version").example("$0 example.json", "generate random person and health data").example("$0 -p example.json example2.json", "regenerate health data for existing person").demandCommand(1).argv;
		n.person && (n.person = JSON.parse(e.readFileSync(n.person), "utf8"));
		let t = L(n);
		e.writeFileSync(n.outfile, JSON.stringify(t, null, 2), "utf8")
	}
	return {
		generate: L,
		types: N,
		sources: W
	}
});
