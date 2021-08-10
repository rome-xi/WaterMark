using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaterMark
{
    [Icon("pack://application:,,,/WaterMark;component/Resources/Icon.png")]
    public class WaterMark : Command
    {
        [DisplayName("水印文本")]
        [FormulaProperty]
        public object WaterMarkText { get; set; }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.PageLoad;
        }
        public override string ToString()
        {
            return "设置页面水印命令";
        }
    }
}
