function checkNumbers() {
    const input = document.getElementById("user_input").value.trim();
    const resultMsg = document.getElementById("result_msg");

    resultMsg.classList.add("d-none");
    resultMsg.classList.remove("alert-danger", "alert-success");
    if (input.length === 0) {
        showError("Please enter a number");
        return;
    }

    let hasLetter = false;
    let hasInvalid = false;
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        const code = ch.charCodeAt(0);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            hasLetter = true;
            break;
        }
        if (
            !(code >= 48 && code <= 57) &&
            ch !== "," &&
            ch !== "." &&
            ch !== "-" &&
            ch !== "+" &&
            ch !== " "
        ) {
            hasInvalid = true;
            break;
        }
    }

    if (hasInvalid) {
        showError("Special Character(s) not allowed");
        return;
    }

    if (hasLetter) {
        showError("letter(s) not allowed");
        return;
    }

    const parts = input.split(",");
    if (parts.length > 2) {
        showError("Enter only two numbers");
        return;
    }

    if (parts.length < 2 || parts[0].trim() === "" || parts[1].trim() === "") {
        showError("Please enter two numbers");
        return;
    }

    const cleanPart = function(s) {
        let out = "";
        for (let j = 0; j < s.length; j++) {
            const c = s[j];
            if (c !== " ") out += c;
        }
        return out;
    };

    const a = cleanPart(parts[0].trim());
    const b = cleanPart(parts[1].trim());

    if (!isValidNumber(a) || !isValidNumber(b)) {
        showError("Invalid number(s)");
        return;
    }

    const num1 = Number(a);
    const num2 = Number(b);

    if (isNaN(num1) || isNaN(num2)) {
        showError("Invalid number(s)");
        return;
    }

    if (num1 === num2) {
        showError("both numbers are same");
        return;
    }

    const largest = num1 > num2 ? num1 : num2;
    resultMsg.innerText = `${largest} is larger`;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-success");
}

function isValidNumber(value) {
        if (value.length === 0) return false;
        let dotCount = 0;
        let hasDigit = false;
        for (let i = 0; i < value.length; i++) {
                const ch = value[i];
                if (ch >= "0" && ch <= "9") {
                    hasDigit = true;
                    continue;
                }
                if (ch === ".") {
                    dotCount++;
                    if (dotCount > 1) return false;
                    continue;
                }
                if (ch === "+" || ch === "-") {
                    if (i !== 0) return false;
                    continue;
                }
                return false;
        }
            if (!hasDigit) return false;
            if (value === "+" || value === "-" || value === ".") return false;
            return true;
}

function showError(message) {
    const resultMsg = document.getElementById("result_msg");
    resultMsg.innerText = message;
    resultMsg.classList.remove("d-none");
    resultMsg.classList.add("alert-danger");
}

function resetForm() {
    document.getElementById("user_input").value = "";
    document.getElementById("result_msg").classList.add("d-none");
}
