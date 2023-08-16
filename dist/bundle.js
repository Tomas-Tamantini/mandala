(() => {
  "use strict";
  var t = {
      874: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 });
        const r = 2 * Math.PI;
        function n(t, e, n, o) {
          t.beginPath(),
            t.arc(e.x, e.y, 0.75, 0, r),
            (t.strokeStyle = n),
            t.stroke(),
            (t.fillStyle = o),
            t.fill(),
            t.closePath();
        }
        e.default = function (t, e, r, o, s, i) {
          (t.fillStyle = i.background), t.fillRect(0, 0, o, s);
          for (let o of e.creatures)
            n(t, r.convertToCanvasCoordinates(o.position), i.stroke, i.fill);
        };
      },
      607: function (t, e, r) {
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        const o = n(r(874)),
          s = r(242),
          i = n(r(797)),
          a = r(653),
          u = document.getElementById("animation-canvas"),
          l = document.getElementById("framerate-slider"),
          d = document.getElementById("random-mandala-btn"),
          c = u.getContext("2d");
        let h = parseInt(l.value);
        d.addEventListener("click", () => {
          c.clearRect(0, 0, u.width, u.height),
            (f = (0, a.randomMandalaWorld)());
        }),
          l.addEventListener("input", () => {
            h = parseInt(l.value);
          });
        let f = (0, a.randomMandalaWorld)();
        const m = (0, s.cameraForWorld)(u.width, u.height, f),
          p = new i.default();
        !(function t() {
          (0, o.default)(c, f, m, u.width, u.height, p.currentColor),
            f.multiStep(15),
            setTimeout(() => requestAnimationFrame(t), 1e3 / h);
        })();
      },
      242: function (t, e, r) {
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.cameraForWorld = e.Camera = void 0);
        const o = n(r(531));
        class s {
          constructor(t, e) {
            (this.scaleFactor = t), (this.translationOffset = e);
          }
          convertToCanvasCoordinates(t) {
            return t.times(this.scaleFactor).plus(this.translationOffset);
          }
        }
        (e.Camera = s),
          (e.cameraForWorld = function (t, e, r, n = 0.05) {
            const i = Math.min(
                (t * (1 - 2 * n)) / (r.width + 1e-6),
                (e * (1 - 2 * n)) / (r.height + 1e-6)
              ),
              a = t / 2 - i * (r.minXCoord + r.width / 2),
              u = e / 2 - i * (r.minYCoord + r.height / 2),
              l = new o.default(a, u);
            return new s(i, l);
          });
      },
      598: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = class {
            constructor(t) {
              this._position = t;
            }
            get position() {
              return this._position;
            }
            pursue(t, e, r = 1) {
              const n = t.position.minus(this.position);
              if (n.magnitudeSquared() < r * r) return;
              const o = n.unit().times(e);
              this._position = this.position.plus(o);
            }
          });
      },
      797: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = class {
            get currentColor() {
              return {
                stroke: "#275579",
                fill: "#443838",
                background: "#59EFE502",
              };
            }
          });
      },
      531: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 });
        class r {
          constructor(t, e) {
            (this.x = t), (this.y = e);
          }
          get coordinates() {
            return [this.x, this.y];
          }
          minus(t) {
            return new r(this.x - t.x, this.y - t.y);
          }
          plus(t) {
            return new r(this.x + t.x, this.y + t.y);
          }
          times(t) {
            return new r(this.x * t, this.y * t);
          }
          magnitudeSquared() {
            return this.x * this.x + this.y * this.y;
          }
          unit() {
            const t = Math.sqrt(this.magnitudeSquared());
            return new r(this.x / t, this.y / t);
          }
        }
        e.default = r;
      },
      730: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.default = class {
            constructor(t = [], e = []) {
              (this._creatures = t), (this.chaseRelations = e);
            }
            step() {
              for (let t of this.chaseRelations) {
                const e = 0.1;
                t.chaser.pursue(t.chased, e);
              }
            }
            multiStep(t) {
              for (let e = 0; e < t; e++) this.step();
            }
            get creatures() {
              return this._creatures;
            }
            get minXCoord() {
              return 0 === this._creatures.length
                ? 0
                : Math.min(...this._creatures.map((t) => t.position.x));
            }
            get maxXCoord() {
              return 0 === this._creatures.length
                ? 0
                : Math.max(...this._creatures.map((t) => t.position.x));
            }
            get minYCoord() {
              return 0 === this._creatures.length
                ? 0
                : Math.min(...this._creatures.map((t) => t.position.y));
            }
            get maxYCoord() {
              return 0 === this._creatures.length
                ? 0
                : Math.max(...this._creatures.map((t) => t.position.y));
            }
            get width() {
              return this.maxXCoord - this.minXCoord;
            }
            get height() {
              return this.maxYCoord - this.minYCoord;
            }
          });
      },
      627: function (t, e, r) {
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        const o = n(r(598)),
          s = n(r(531));
        e.default = function (t, e = 200, r = new s.default(0, 0)) {
          const n = [],
            i = (2 * Math.PI) / t;
          for (let a = 0; a < t; a++) {
            const t = a * i,
              u = r.x + e * Math.cos(t),
              l = r.y + e * Math.sin(t);
            n.push(new o.default(new s.default(u, l)));
          }
          return n;
        };
      },
      653: function (t, e, r) {
        var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.randomMandalaWorld = e.mandalaWorld = void 0);
        const o = n(r(730)),
          s = n(r(627));
        function i(t, e, r = 1) {
          const n = t * e,
            i = (0, s.default)(n),
            a = t * r + 1,
            u = [];
          for (let t = 0; t < n; t++) {
            const e = { chaser: i[t], chased: i[(t * a) % n] };
            u.push(e);
          }
          return new o.default(i, u);
        }
        function a(t, e) {
          return Math.floor(Math.random() * (e - t + 1)) + t;
        }
        function u(t, e) {
          return e > t ? u(e, t) : 0 === e ? t : u(e, t % e);
        }
        (e.mandalaWorld = i),
          (e.randomMandalaWorld = function () {
            const t = a(2, 30);
            let e = -1;
            for (;;) {
              e = a(3, 50);
              let r = e * t;
              if (10 <= r && r <= 200) break;
            }
            let r = -1;
            for (; (r = a(1, e - 1)), 1 !== u(r, e); );
            return (
              console.log(
                `World info: Symmetry = ${t}, Point mult. = ${e}, Chase step mult. = ${r}`
              ),
              i(t, e, r)
            );
          });
      },
    },
    e = {};
  !(function r(n) {
    var o = e[n];
    if (void 0 !== o) return o.exports;
    var s = (e[n] = { exports: {} });
    return t[n].call(s.exports, s, s.exports, r), s.exports;
  })(607);
})();
