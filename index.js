const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentv1 = require("./swagger-v1.json");
const swaggerDocumentv2 = require("./swagger-v2.json");
const path = require("path");
const fs = require("fs");

const app = express();

const port = 1000;

const htmlPath = path.join(__dirname, "index.html");
const htmlContent = fs.readFileSync(htmlPath, "utf8");

function setupSwaggerUI(swaggerDocument, Options) {
	return (req, res, next) => {
		swaggerUi.setup(swaggerDocument, Options)(req, res, next);
	};
}

const Options = {
	customCss: `
	.topbar-wrapper a {
		visibility: hidden;
	}`,
	customSiteTitle: "API 文件 | ExpTechTW",
	customfavIcon: "https://api.exptech.com.tw/file/exptech/exptech.6e605140.png"
};

app.use("/docs/v1", swaggerUi.serve, setupSwaggerUI(swaggerDocumentv1, Options));
app.use("/docs/v2", swaggerUi.serve, setupSwaggerUI(swaggerDocumentv2, Options));

app.get("/", (req, res) => res.send(htmlContent));

app.listen(port, () => console.log(`http://localhost:${port}`));