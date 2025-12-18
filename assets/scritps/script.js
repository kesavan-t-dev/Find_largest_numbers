function checkNumbers() {
    const input = document.getElementById("user_input").value.trim();
    const resultMsg = document.getElementById("result_msg");

    resultMsg.classList.add("d-none");
    resultMsg.classList.remove("alert-danger", "alert-success");
    if (input.length === 0) {
        showError("Please enter a number");
        return;
    }

    
    if (!/^[0-9+,\.\-\s]+$/.test(input)) {
        showError("Special Character(s) not allowed");
        return;
    }

    
    if (/^[,\.]/.test(input.trim()) || /[,\.]\s*$/.test(input)) {
        showError("Special Character(s) not allowed");
        return;
    }

    
    if (/[.,]\s*[.,]/.test(input)) {
        showError("Special Character(s) not allowed");
        return;
    }

    
    const commaCount = (input.match(/,/g) || []).length;
    if (commaCount === 0) {
        showError("Please enter two numbers");
        return;
    }
    if (commaCount > 1) {
        showError("Enter only two numbers");
        return;
    }

    const parts = input.split(",");
    if (parts.length !== 2) {
        showError("Enter only two numbers");
        return;
    }

    const a = parts[0].replace(/\s+/g, "").trim();
    const b = parts[1].replace(/\s+/g, "").trim();

    if (a === "" || b === "") {
        showError("Please enter two numbers");
        return;
    }

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
