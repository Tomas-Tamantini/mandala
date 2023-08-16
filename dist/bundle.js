(() => {
  "use strict";
  var t = {
      874: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 });
        const r = 2 * Math.PI;
        function o(t, e, o, i) {
          t.beginPath(),
            t.arc(e.x, e.y, 0.75, 0, r),
            (t.strokeStyle = o),
            t.stroke(),
            (t.fillStyle = i),
            t.fill(),
            t.closePath();
        }
        e.default = function (t, e, r, i, s, n) {
          (t.fillStyle = n.background), t.fillRect(0, 0, i, s);
          for (let i of e.creatures)
            o(t, r.convertToCanvasCoordinates(i.position), n.stroke, n.fill);
        };
      },
      607: function (t, e, r) {
        var o =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        const i = o(r(874)),
          s = r(242),
          n = o(r(797)),
          a = r(653),
          l = document.getElementById("animation-canvas"),
          u = document.getElementById("framerate-slider"),
          c = document.getElementById("random-mandala-btn"),
          h = l.getContext("2d");
        let d = parseInt(u.value);
        c.addEventListener("click", () => {
          h.clearRect(0, 0, l.width, l.height),
            (f = (0, a.randomMandalaWorld)());
        }),
          u.addEventListener("input", () => {
            d = parseInt(u.value);
          });
        let f = (0, a.randomMandalaWorld)();
        const m = (0, s.cameraForWorld)(l.width, l.height, f),
          p = new n.default();
        !(function t() {
          (0, i.default)(h, f, m, l.width, l.height, p.currentColor),
            p.step(),
            f.multiStep(15),
            setTimeout(() => requestAnimationFrame(t), 1e3 / d);
        })();
      },
      242: function (t, e, r) {
        var o =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.cameraForWorld = e.Camera = void 0);
        const i = o(r(350));
        class s {
          constructor(t, e) {
            (this.scaleFactor = t), (this.translationOffset = e);
          }
          convertToCanvasCoordinates(t) {
            return t.times(this.scaleFactor).plus(this.translationOffset);
          }
        }
        (e.Camera = s),
          (e.cameraForWorld = function (t, e, r, o = 0.05) {
            const n = Math.min(
                (t * (1 - 2 * o)) / (r.width + 1e-6),
                (e * (1 - 2 * o)) / (r.height + 1e-6)
              ),
              a = t / 2 - n * (r.minXCoord + r.width / 2),
              l = e / 2 - n * (r.minYCoord + r.height / 2),
              u = new i.default(a, l);
            return new s(n, u);
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
              const o = t.position.minus(this.position);
              if (o.magnitudeSquared() < r * r) return;
              const i = o.unit().times(e);
              this._position = this.position.plus(i);
            }
          });
      },
      797: function (t, e, r) {
        var o =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        const i = o(r(350));
        class s {
          constructor() {
            (this.color = new i.default(68, 112, 112)),
              (this.colorVelocity = new i.default(-3, -2, 4));
          }
          static colorToHex(t) {
            const [e, r, o] = t.coordinates.map(Math.floor);
            return `rgb(${e}, ${r}, ${o})`;
          }
          static darkerColor(t) {
            return t.times(0.8);
          }
          step(t = 0.4) {
            let e = this.color.plus(this.colorVelocity.times(t)).coordinates;
            for (let t = 0; t < 3; t++) {
              let r = e[t];
              r < 0
                ? ((e[t] = 0),
                  (this.colorVelocity = this.colorVelocity.reflect(t)))
                : r > 255 &&
                  ((e[t] = 255),
                  (this.colorVelocity = this.colorVelocity.reflect(t)));
            }
            this.color = new i.default(...e);
          }
          get currentColor() {
            return {
              stroke: s.colorToHex(s.darkerColor(this.color)),
              fill: s.colorToHex(this.color),
              background: "#59EFE502",
            };
          }
        }
        e.default = s;
      },
      350: (t, e) => {
        Object.defineProperty(e, "__esModule", { value: !0 });
        class r {
          constructor(t, e, r = 0) {
            (this.x = t), (this.y = e), (this.z = r);
          }
          get coordinates() {
            return [this.x, this.y, this.z];
          }
          minus(t) {
            return new r(this.x - t.x, this.y - t.y, this.z - t.z);
          }
          plus(t) {
            return new r(this.x + t.x, this.y + t.y, this.z + t.z);
          }
          times(t) {
            return new r(this.x * t, this.y * t, this.z * t);
          }
          magnitudeSquared() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
          }
          unit() {
            const t = Math.sqrt(this.magnitudeSquared());
            return new r(this.x / t, this.y / t, this.z / t);
          }
          reflect(t) {
            if (t < 0 || t > 2)
              throw new Error("Invalid axis index - must be 0, 1, or 2");
            let e = this.coordinates;
            return (e[t] = -e[t]), new r(...e);
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
        var o =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        const i = o(r(598)),
          s = o(r(350));
        e.default = function (t, e = 200, r = new s.default(0, 0)) {
          const o = [],
            n = (2 * Math.PI) / t;
          for (let a = 0; a < t; a++) {
            const t = a * n,
              l = r.x + e * Math.cos(t),
              u = r.y + e * Math.sin(t);
            o.push(new i.default(new s.default(l, u)));
          }
          return o;
        };
      },
      653: function (t, e, r) {
        var o =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.randomMandalaWorld = e.mandalaWorld = void 0);
        const i = o(r(730)),
          s = o(r(627));
        function n(t, e, r = 1) {
          const o = t * e,
            n = (0, s.default)(o),
            a = t * r + 1,
            l = [];
          for (let t = 0; t < o; t++) {
            const e = { chaser: n[t], chased: n[(t * a) % o] };
            l.push(e);
          }
          return new i.default(n, l);
        }
        function a(t, e) {
          return Math.floor(Math.random() * (e - t + 1)) + t;
        }
        function l(t, e) {
          return e > t ? l(e, t) : 0 === e ? t : l(e, t % e);
        }
        (e.mandalaWorld = n),
          (e.randomMandalaWorld = function () {
            const t = a(2, 30);
            let e = -1;
            for (;;) {
              e = a(3, 50);
              let r = e * t;
              if (10 <= r && r <= 200) break;
            }
            let r = -1;
            for (; (r = a(1, e - 1)), 1 !== l(r, e); );
            return (
              console.log(
                `World info: Symmetry = ${t}, Point mult. = ${e}, Chase step mult. = ${r}`
              ),
              n(t, e, r)
            );
          });
      },
    },
    e = {};
  !(function r(o) {
    var i = e[o];
    if (void 0 !== i) return i.exports;
    var s = (e[o] = { exports: {} });
    return t[o].call(s.exports, s, s.exports, r), s.exports;
  })(607);
})();
