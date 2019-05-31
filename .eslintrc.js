module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "linebreak-style": "off",
        'import/no-unresolved': 0,
        "import/extensions": [".js", ".jsx"],
        "no-plusplus": 0,
    },
    // 设置环境，使得window、document等变量可以通过eslint的校验
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
};