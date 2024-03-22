/*
 * ウェブページ内のJSONスクリプトから特定の形式のオブジェクトを検索するためのユーティリティ関数。
 * これらの関数は、ウェブページ内に ld+json があるときに使う。
 */
// JSON文字列を解析し、Product型に変換する関数
function parseJSON(script) {
    try {
        // JSON文字列をパースしてオブジェクトに変換
        var obj = JSON.parse(script.textContent || '{}');
        // 変換されたオブジェクトがProduct型としてバリデーションされた場合は返す
        if (validateProduct(obj)) {
            return obj;
        }
    }
    catch (error) {
        // JSONのパースに失敗した場合はnullを返す
    }
    return null;
}
// オブジェクトがProduct型としてバリデーションされるかどうかをチェックする関数
var validateProduct = function (obj) {
    return (
    // オブジェクトであり、nullでないことを確認
    typeof obj === "object" &&
        obj !== null &&
        // 必要なプロパティがすべて存在し、型が適切であることを確認
        typeof obj["@context"] === "string" &&
        typeof obj["@type"] === "string");
};
// ドキュメント内のJSONスクリプトからProduct型のオブジェクトを検索する関数
var findLdJSON = function () {
    // JSONスクリプトを選択
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    // 各スクリプトを走査し、Product型のオブジェクトを探す
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        var obj = parseJSON(script); // JSONをパースしてオブジェクトに変換
        if (obj) {
            return obj; // Product型のオブジェクトが見つかった場合は返す
        }
    }
    return null; // 見つからなかった場合はnullを返す
};
// find_json関数で見つかったProduct型のオブジェクトから名前を取得する関数
function getPropertyFromJSON(json, property) {
    if (json && typeof json === 'object') {
        if (property in json) {
            return json[property];
        }
    }
    return null;
}
