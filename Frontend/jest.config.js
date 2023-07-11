module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|styl|less|sass|scss)$': '<rootDir>/config/CSSStub.js',
    },
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    }
}