module.exports = {
    "extends":[ "airbnb","prettier","prettier/react"],
    "plugins": [
      "prettier",
    ],
    
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],                                                                                                       
    "max-len": [2, { "code": 150, "ignoreUrls": true}],
    "prettier/prettier":["error", {"printWidth": 120,"singleQuote": true,"trailingComma": "all",   "semi": true }]
  },
  
  "env": {
    "browser": true,
    "jest": true,
    "es6": true,
  }
};