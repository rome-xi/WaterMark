var WaterMark = (function (_super) {
    __extends(WaterMark, _super);
    function WaterMark() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    WaterMark.prototype.execute = function () {
        var commandSettings = this.CommandParam;
        var waterMarkText = this.evaluateFormula(commandSettings.WaterMarkText);
        function watermark(settings) {
            //默认设置
            var defaultSettings = {
                watermarl_element: "body",
                watermark_txt: "",
                watermark_x: 20, //水印起始位置x轴坐标
                watermark_y: 20, //水印起始位置Y轴坐标
                watermark_rows: 2000, //水印行数
                watermark_cols: 2000, //水印列数
                watermark_x_space: 70, //水印x轴间隔
                watermark_y_space: 30, //水印y轴间隔
                watermark_color: "#aaa", //水印字体颜色
                watermark_alpha: 0.4, //水印透明度
                watermark_fontsize: "15px", //水印字体大小
                watermark_width: 210, //水印宽度
                watermark_height: 80, //水印长度
                watermark_angle: 15, //水印倾斜度数
            };
            if (arguments.length === 1 && typeof arguments[0] === "object") {
                var src = arguments[0] || {};
                for (key in src) {
                    if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
                        continue;
                    else if (src[key]) defaultSettings[key] = src[key];
                }
            }

            var oTemp = document.createDocumentFragment();

            var maskElement =
                document.getElementById(defaultSettings.watermarl_element) || document.body;

            //获取页面最大宽度
            var page_width = Math.max(maskElement.scrollWidth, maskElement.clientWidth);

            //获取页面最大高度
            var page_height = Math.max(
                maskElement.scrollHeight,
                maskElement.clientHeight
            );
            defaultSettings.watermark_cols = Math.floor(page_width / (224 + defaultSettings.watermark_x_space));
            defaultSettings.watermark_x_space = (page_width - 224 * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1)  + 10;

            defaultSettings.watermark_rows = Math.floor(
                page_height /
                (defaultSettings.watermark_y_space + defaultSettings.watermark_height)
            );
            defaultSettings.watermark_y_space = (page_height - 50 - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1);

            var x;
            var y;
            for (var i = 0; i < defaultSettings.watermark_rows; i++) {
                y =
                    defaultSettings.watermark_y +
                    (defaultSettings.watermark_y_space + defaultSettings.watermark_height) *
                    i;
                for (var j = 0; j < defaultSettings.watermark_cols; j++) {
                    x =
                        defaultSettings.watermark_x +
                        (defaultSettings.watermark_width + defaultSettings.watermark_x_space) *
                        j;
                    var mask_div = document.createElement("div");
                    mask_div.id = "mask_div" + i + j;
                    mask_div.className = "mask_div";
                    mask_div.innerHTML = defaultSettings.watermark_txt;
                    mask_div.style.webkitTransform =
                        "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.MozTransform =
                        "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.msTransform =
                        "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.OTransform =
                        "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.transform =
                        "rotate(-" + defaultSettings.watermark_angle + "deg)";
                    mask_div.style.visibility = "";
                    mask_div.style.position = "absolute";
                    mask_div.style.left = x + "px";
                    mask_div.style.top = y + "px";
                    mask_div.style.overflow = "hidden";
                    mask_div.style.zIndex = "9999";
                    mask_div.style.pointerEvents = "none";
                    mask_div.style.filter = "alpha(opacity=50)";
                    mask_div.style.opacity = defaultSettings.watermark_alpha;
                    mask_div.style.fontSize = defaultSettings.watermark_fontsize;
                    mask_div.style.fontFamily = defaultSettings.watermark_font;
                    mask_div.style.color = defaultSettings.watermark_color;
                    mask_div.style.textAlign = "center";
                    mask_div.style.width = defaultSettings.watermark_width + "px";
                    mask_div.style.height = defaultSettings.watermark_height + "px";
                    mask_div.style.display = "block";
                    oTemp.appendChild(mask_div);
                }
            }
            maskElement.appendChild(oTemp);
        }
        watermark({
            watermarl_element: "pagesContainer",
            watermark_txt: waterMarkText,
        });
        $("pagesContainer").css("overflow", "auto");

        $(window).resize(function () {
            $("div").remove(".mask_div");
            watermark({
                watermarl_element: "pagesContainer",
                watermark_txt: waterMarkText,
            });
            $("pagesContainer").css("overflow", "auto");
        })

        var page = Forguncy.Page;

        page.bind("pageDefaultDataLoaded", function () {
            $("div").remove(".mask_div");
            watermark({
                watermarl_element: "pagesContainer",
                watermark_txt: waterMarkText,
            });
            $("pagesContainer").css("overflow", "auto");
        })
    };


    return WaterMark;
}(Forguncy.CommandBase));

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("WaterMark.WaterMark, WaterMark", WaterMark);