// Test both the original vulnerable pattern and our fixed version
console.log("Starting ReDoS vulnerability tests...\n");

function testOriginalPattern(input, params) {
    console.log("Testing original vulnerable pattern:");
    console.time('Original pattern');
    try {
        for(var i=0; i<params.length; i++){
            input = input.replace(new RegExp("\\{"+i+"\\}","g"), params[i]);
        }
        console.log(`Result length: ${input.length}`);
    } catch(e) {
        console.error('Error:', e.message);
    }
    console.timeEnd('Original pattern');
}

function testFixedPattern(input, params) {
    console.log("\nTesting fixed pattern:");
    console.time('Fixed pattern');
    try {
        for(var i=0; i<params.length; i++){
            if (typeof i === 'number' && i >= 0 && i < params.length) {
                var replacement = params[i];
                if (replacement && replacement.length > 1000) {
                    replacement = replacement.substring(0, 1000);
                }
                input = input.split('{' + i + '}').join(replacement || '');
            }
        }
        console.log(`Result length: ${input.length}`);
    } catch(e) {
        console.error('Error:', e.message);
    }
    console.timeEnd('Fixed pattern');
}

// Test cases
const testCases = [
    {
        name: "Normal case",
        input: "Test message with {0} and {1}",
        params: ["value1", "value2"]
    },
    {
        name: "Long parameter",
        input: "Message with {0}",
        params: ['A'.repeat(2000)]
    },
    {
        name: "ReDoS attack pattern",
        input: '{'.repeat(10000) + '0' + '}'.repeat(10000),
        params: ["test"]
    }
];

// Run tests
testCases.forEach(testCase => {
    console.log(`\n=== Test Case: ${testCase.name} ===`);
    testOriginalPattern(testCase.input, testCase.params);
    testFixedPattern(testCase.input, testCase.params);
});