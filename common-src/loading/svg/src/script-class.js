class Animate {
	constructor(tag, type, id_name, class_name, attr_name, values, from, to, dur) {
		this.tag = tag;
		this.type = type;
		this.id_name = id_name;
		this.class_name = class_name;
		this.attr_name = attr_name;
		this.values = values;
		this.from = from;
		this.to = to;
		this.dur = dur;
		this.repeatCount = "indefinite";
	}
	create() {
		return `
			<${this.tag} ${this.type == "" ? "" : `type="${this.type}"`} id="${this.id_name}" class="${this
			.class_name}" attributeName="${this.attr_name}" ${this.from == "" ? "" : `from="${this.from}"`} ${this.to == ""
			? ""
			: `to="${this.to}"`} ${this.values == "" ? "" : `values="${this.values}"`} dur="${this.dur}s" repeatCount="${this
			.repeatCount}" />
		`;
	}
}

class Circle {
	/**
		* コンストラクタの説明
		* @param {string} id_name - circleにつける一意のID
		* @param {string} class_name - circleにつけるclassName
		* @param {number} x - circleのx座標
		* @param {number} y - circleのy座標
		* @param {number} r - circleの半径r
	*/
	constructor(id_name, class_name, x, y, r, rad) {
		this.id_name = id_name;
		this.class_name = class_name;
		this.tag = "";
		this.x = x;
		this.y = y;
		this.px = x;
		this.py = y;
		this.r = r;
		this.rad = rad;
		this.stroke_color = "none";
		this.fill_color = "white";
		this.distance = common_r - common_small_r;
	}
	create() {
		this.tag = "circle";
		return `
			<${this.tag} id="${this.id_name}" class="${this.class_name}"  cx="${this.x}" cy="${this.y}" r="${this.r}" fill="${this
			.fill_color}" stroke="${this.stroke_color}"></${this.tag}>
		`;
	}
	create2() {
		this.tag = "rect";
		return `
			<${this.tag} id="${this.id_name}" class="${this.class_name}" x="${this.x}" width="${this.r * 2}" height="${this.r *
			2}" fill="${this.fill_color}" stroke="${this.stroke_color}"></${this.tag}>
		`;
	}
	goto_xy(x, y) {
		this.px = this.x;
		this.py = this.y;
		this.x = x;
		this.y = y;
		const set_arr = this.tag == "rect" ? ["x", "y"] : ["cx", "cy"];
		this.id().setAttribute(set_arr[0], `${this.x}`);
		this.id().setAttribute(set_arr[1], `${this.y}`);
	}
	update_distancs(d) {
		this.distance = d;
		let _x = common_cx + cos(this.rad) * this.distance;
		let _y = common_cy + sin(this.rad) * this.distance;
		this.goto_xy(_x, _y);
	}
	update_r(r) {
		this.r = r;
		if (this.tag == "rect") {
			this.id().setAttribute("width", `${this.r * 2}`);
			this.id().setAttribute("height", `${this.r * 2}`);
		} else if (this.tag == "circle") {
			this.id().setAttribute("r", `${this.r}`);
		}
	}
	fill(fill_color) {
		this.fill_color = fill_color;
		this.id().setAttribute("fill", `${this.fill_color}`);
	}
	stroke(stroke_color) {
		this.stroke_color = stroke_color;
		this.id().setAttribute("stroke", `${this.stroke_color}`);
	}
	id() {
		return document.getElementById(this.id_name);
	}
	add_inner_html(str) {
		this.id().innerHTML = str;
	}
	add_animation(mode = 0) {
		mode = String(mode);
		let add_str = "";
		switch (mode) {
			//風車
			case "0":
				let add_anm11 = new Animate(
					"animateTransform",
					"rotate",
					`kaza-anm-t-id-${this.id_name.match(/[0-9]+/)[0]}`,
					"kaza-anm-class",
					"transform",
					`0 ${common_r} ${common_r};180 ${common_r} ${common_r};-0 ${common_r} ${common_r}`,
					``,
					``,
					"2"
				);
				add_str += add_anm11.create();
				/*
				let add_anm2 = new Animate(
					"animate",
					"",
					`kaza-anm-id-${this.id_name.match(/[0-9]+/)[0]}`,
					"kaza-anm-class",
					"r",
					`${common_small_r / 2};${common_small_r * 2};${common_small_r / 2};`,
					"",
					"",
					"3"
				);
				add_str += add_anm2.create();
				*/
				break;
			default:
				break;
		}
		this.add_inner_html(add_str);
	}
}
