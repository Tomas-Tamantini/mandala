(() => {
  "use strict";
  var t = {
      874: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 });
        const r = 2 * Math.PI;
        function n(t, e, n, o) {
          t.beginPath(),
            t.arc(e.x, e.y, 1, 0, r),
            (t.strokeStyle = n),
            t.stroke(),
            (t.fillStyle = o),
            t.fill(),
            t.closePath();
        }
        e.default = function (t, e, r, o, i) {
          (t.fillStyle = "#59EFE502"), t.fillRect(0, 0, o, i);
          for (let o of e.creatures)
            n(
              t,
              r.convertToCanvasCoordinates(o.position),
              "#275579",
              "#443838"
            );
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
          i = r(242),
          s = r(653),
          a = document.getElementById("animation-canvas"),
          u = document.getElementById("framerate-slider"),
          l = document.getElementById("random-mandala-btn"),
          d = a.getContext("2d");
        let c = parseInt(u.value);
        l.addEventListener("click", () => {
          d.clearRect(0, 0, a.width, a.height),
            (h = (0, s.randomMandalaWorld)());
        }),
          u.addEventListener("input", () => {
            c = parseInt(u.value);
          });
        let h = (0, s.randomMandalaWorld)();
        const f = (0, i.cameraForWorld)(a.width, a.height, h);
        !(function t() {
          (0, o.default)(d, h, f, a.width, a.height),
            h.multiStep(15),
            setTimeout(() => requestAnimationFrame(t), 1e3 / c);
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
        class i {
          constructor(t, e) {
            (this.scaleFactor = t), (this.translationOffset = e);
          }
          convertToCanvasCoordinates(t) {
            return t.times(this.scaleFactor).plus(this.translationOffset);
          }
        }
        (e.Camera = i),
          (e.cameraForWorld = function (t, e, r, n = 0.05) {
            const s = Math.min(
                (t * (1 - 2 * n)) / (r.width + 1e-6),
                (e * (1 - 2 * n)) / (r.height + 1e-6)
              ),
              a = t / 2 - s * (r.minXCoord + r.width / 2),
              u = e / 2 - s * (r.minYCoord + r.height / 2),
              l = new o.default(a, u);
            return new i(s, l);
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
              return Math.min(...this._creatures.map((t) => t.position.x));
            }
            get maxXCoord() {
              return Math.max(...this._creatures.map((t) => t.position.x));
            }
            get minYCoord() {
              return Math.min(...this._creatures.map((t) => t.position.y));
            }
            get maxYCoord() {
              return Math.max(...this._creatures.map((t) => t.position.y));
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
          i = n(r(531));
        e.default = function (t, e = 200, r = new i.default(0, 0)) {
          const n = [],
            s = (2 * Math.PI) / t;
          for (let a = 0; a < t; a++) {
            const t = a * s,
              u = r.x + e * Math.cos(t),
              l = r.y + e * Math.sin(t);
            n.push(new o.default(new i.default(u, l)));
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
          i = n(r(627));
        function s(t, e, r = 1) {
          const n = t * e,
            s = (0, i.default)(n),
            a = t * r + 1,
            u = [];
          for (let t = 0; t < n; t++) {
            const e = { chaser: s[t], chased: s[(t * a) % n] };
            u.push(e);
          }
          return new o.default(s, u);
        }
        function a(t, e) {
          return Math.floor(Math.random() * (e - t + 1)) + t;
        }
        function u(t, e) {
          return e > t ? u(e, t) : 0 === e ? t : u(e, t % e);
        }
        (e.mandalaWorld = s),
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
              s(t, e, r)
            );
          });
      },
    },
    e = {};
  !(function r(n) {
    var o = e[n];
    if (void 0 !== o) return o.exports;
    var i = (e[n] = { exports: {} });
    return t[n].call(i.exports, i, i.exports, r), i.exports;
  })(607);
})();
