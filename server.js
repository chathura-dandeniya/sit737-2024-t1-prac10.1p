const express = require("express");
const app = express();

const add = (n1, n2) => {
    return n1 + n2;
};
const subtract = (n1, n2) => {
    return n1 - n2;
}
const multiply = (n1, n2) => {
    return n1 * n2;
}
const divide = (n1, n2) => {
    if (n2 === 0) throw new Error("Cannot divide by zero");
    return n1 / n2;
};

const performOperation = (req, res, operation, operationName) => {
    try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);

        if (isNaN(n1) || isNaN(n2)) {
            throw new Error("One or both numbers are incorrectly defined");
        }

        const result = operation(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
};

// Addition endpoint
app.get("/add", (req, res) => {
    performOperation(req, res, add, "add");
});

// Subtraction endpoint
app.get("/subtract", (req, res) => {
    performOperation(req, res, subtract, "subtract");
});

// Multiplication endpoint
app.get("/multiply", (req, res) => {
    performOperation(req, res, multiply, "multiply");
});

// Division endpoint
app.get("/divide", (req, res) => {
    performOperation(req, res, divide, "divide");
});

const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the calculator HTML
app.get('/calculator', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});