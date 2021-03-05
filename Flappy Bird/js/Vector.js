
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    div(s) {
        this.x /= s;
        this.y /= s;
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let s = this.mag()
        this.x /= s;
        this.y /= s;
        return this;
    }

    setMag(s) {
        this.normalize();
        this.mult(s)
        return this;
    }

    clone() {
        return new Vector(this.x, this.y)
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    negate() {
        this.x = -x;
        this.y = -y;
        return this;
    }

    dot(vec) {
        return Number(this.x * vec.x) + Number(this.y * vec.y);
    }

    det(vec) {
        return Number(this.x * vec.y) - Number(this.y * vec.x);
    }

    angleBetween(vec) {
        let cosa = Number(this.dot(vec) / (this.mag() * vec.mag()))
        return Math.acos(cosa);
    }

    angleBetween360(vec) {
        return Math.atan2(this.det(vec), this.dot(vec))
    }

    static angleBetween360(vec1, vec2) {
        let det = Number(vec1.x * vec2.y) - Number(vec1.y * vec2.x);
        let dot = Number(vec1.x * vec2.x) + Number(vec1.y * vec2.y);
        return Math.atan2(det, dot);
    }
}