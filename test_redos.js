// ReDoS vulnerability test
const testNumberboxParsing = () => {
    // Simulating the vulnerable part of jquery.numberbox.js
    const maliciousInput = "1" + "!".repeat(10000) + "1"; // Large input with special characters
    const groupSeparator = "!"; // Malicious separator that can cause catastrophic backtracking
    
    console.time('regex-operation');
    try {
        // This is the vulnerable operation
        const result = maliciousInput.replace(new RegExp("\\" + groupSeparator, "g"), "");
        console.log('Operation completed');
    } catch(e) {
        console.log('Operation failed:', e);
    }
    console.timeEnd('regex-operation');
};

console.log('Starting ReDoS test...');
testNumberboxParsing();