import requests

def getJSDocWord(__str = "") :
	return f"/// <reference path='{__str.replace(url["delete"], "./")}.js' />\n"

url = {
	"target": "https://jsd.tshuto.com/all",
	"delete": "https://share.tshuto.com/common-src/javascript/def/"
};

res = requests.get(url["target"]);

url_arr = res.text.split(",");

for i in range(len(url_arr)) :
	url_arr[i] = getJSDocWord(url_arr[i]);

with open("./types.d.ts", mode="w", encoding="utf-8") as f:
	f.writelines(url_arr);