module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage", // 按需引入
          "corejs": 3             // corejs版本
        }
      ],
      "@vue/babel-preset-jsx"     // 支持vue中的jsx语法
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime", 
        { 
          "corejs": 3             // corejs版本
        }
      ]
    ]
  }
  