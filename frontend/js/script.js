const SCREEN_MAX_CHAR = 20;

const inputState = {
    INITIAL:    0,
    NUMBER:     1,
    OP:         2,
    DOT:        3,
};

class MathExpression {
    constructor() {
        this.exp_str = ""; //hold math expression
        this.input_state = inputState.INITIAL; //input state at the current time
        this.ans = 0;
    }

    is_exp_str_overflow() {
        return (this.exp_str.length > SCREEN_MAX_CHAR);
    }

    compute_exp() {
        return 123.5;
    }
}

var math_exp = new MathExpression();

var print_screen = (str) => {
    if (typeof str != "string") {
        return;
    }
    
    document.getElementById("screen").innerHTML = str;
}

var process_button_click_number = (value) => {
    if (typeof value != "number") {
        return;
    }

    if (math_exp.is_exp_str_overflow()) {
        return;
    }

    math_exp.exp_str = math_exp.exp_str.concat(value.toString());
    math_exp.input_state = inputState.NUMBER;
    print_screen(math_exp.exp_str);
}

var process_button_click_ans = () => {
    if (math_exp.is_exp_str_overflow()) {
        return;
    }

    if (math_exp.input_state != inputState.OP && math_exp.input_state != inputState.INITIAL) {
        return;
    }

    math_exp.exp_str = math_exp.exp_str.concat(math_exp.ans);
    math_exp.input_state = inputState.NUMBER;
    print_screen(math_exp.exp_str);
}

var process_button_click_op = (op) => {
    if (typeof op != "string") {
        return;
    }

    if (math_exp.is_exp_str_overflow()) {
        return;
    }

    if (math_exp.input_state != inputState.NUMBER) {
        return;
    }

    math_exp.exp_str = math_exp.exp_str.concat(op);
    math_exp.input_state = inputState.OP;
    print_screen(math_exp.exp_str);
}

var process_button_click_dot = () => {
    if (math_exp.is_exp_str_overflow()) {
        return;
    }

    if (math_exp.input_state != inputState.NUMBER) {
        return;
    }

    math_exp.exp_str = math_exp.exp_str.concat(".");
    math_exp.input_state = inputState.DOT;
    print_screen(math_exp.exp_str);
}

var process_button_click_equal = () => {
    if (math_exp.input_state != inputState.NUMBER) {
        return;
    }

    math_exp.ans = math_exp.compute_exp();
    math_exp.exp_str = math_exp.ans.toString();
    math_exp.input_state = inputState.NUMBER;
    print_screen(math_exp.exp_str);
}

var process_button_click_rst = () => {
    math_exp = new MathExpression();
    print_screen(math_exp.exp_str);
}

var process_button_click_del = () => {
    math_exp.exp_str = math_exp.exp_str.substring(0, math_exp.exp_str.length - 1);
    var last_char = math_exp.exp_str.charAt(math_exp.exp_str.length - 1);

    // is nothing
    if (last_char == "") {
        math_exp.input_state = inputState.INITIAL;
    }
    //is not a number -> op
    else if (isNaN(last_char)) {
        math_exp.input_state = inputState.OP;
    }

    else {
        math_exp.input_state = inputState.NUMBER;
    }

    print_screen(math_exp.exp_str);
}

var process_button_click_ac = () => {
    math_exp.exp_str = "";
    math_exp.input_state = inputState.INITIAL;
    print_screen(math_exp.exp_str);
}