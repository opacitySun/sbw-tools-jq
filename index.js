import $ from 'jquery';

$.entend({
	/*
     * 是否存在指定变量
     */
	isExitsVariable(variableName) {
		try {
            if (typeof(variableName) == "undefined") {
                console.log("value is undefined");
                return false;
            } else {
                console.log("value is true");
                return true;
            }
        } catch(e) {}
        return false;
	},

	/*
     * 判断是否为空对象
     */
	isEmptyObject(obj) {
		for(var name in obj){return false;}
        return true;
	},

	/*
     * 判断是否为json对象
     */
    isJson(obj) {
    	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    },

    /*
     * 检测数组中是否存在指定元素
     */
    inArray(value,arr) {
    	if (arr.indexOf(value) > -1){return true;}
        return false;
    },

    /*
     * 检测字符串中是否存在指定字符
     */
    inString(value,string) {
    	if(string.indexOf(value) > 0){
            return true;
        }else{
            return false;
        }
    },

    /*
     * 获取url参数
     */
    getParams() {
    	var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            str = decodeURI(str);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    /*
     * 计算小数保留多位小数
     * src是数值，pos是要保留几位
     */
    formatFloat(src,pos) {
    	pos = pos || 0;
        if(pos == 0){
            return Math.round(src);
        }else{
            var num = Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
            num = num + "";
            var index = num.indexOf(".");
            var indexofNum = num.substr(index+1,num.length-1);
            var indexofNumLen = indexofNum.length;
            var zeroNum = "";
            if(index == -1){
                for(var i=0;i<pos;i++){
                    zeroNum += "0";
                }
                num = num + "." + zeroNum;
            }else if(indexofNumLen == 1){
                for(var i=0;i<pos-1;i++){
                    zeroNum += "0";
                }
                num = num + zeroNum;
            }
            return num;
        }
    },

    /*
     * 判断如果超过指定字数则显示省略号或进行截取
     * txt是要截取的文字,num是限定的字数
     * isEllipsis:true 添加省略号,false 不添加省略号
     */
    overTxtEllipsis(txt,num,isEllipsis) {
    	if(txt == null){
            return txt;
        }else{
            var len = txt.length;
            var txtSubstr = "";
            if(len > num){
                txtSubstr = txt.substr(0,num);
                if(isEllipsis == true){
                    txtSubstr = txtSubstr+"...";
                }
            }else{
                txtSubstr = txt;
            }
            return txtSubstr;
        }
    },

    /*
     * 将时间戳转换为发表时间的格式
     */
    getCreateTimeTxtByLong(dateTimeStamp) {
    	var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;

        var result = "";
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){
            //若日期不符则弹出窗口告之
            console.log("结束日期不能小于开始日期！");
            return false;
        }
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            result="发表于" + parseInt(monthC) + "个月前";
        }else if(weekC>=1){
            result="发表于" + parseInt(weekC) + "周前";
        }else if(dayC>=1){
            result="发表于"+ parseInt(dayC) +"天前";
        }else if(hourC>=1){
            result="发表于"+ parseInt(hourC) +"个小时前";
        }else if(minC>=1){
            result="发表于"+ parseInt(minC) +"分钟前";
        }else{
            result="刚刚发表";
        }
        return result;
    }
})