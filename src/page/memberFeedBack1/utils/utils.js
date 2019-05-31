function newHref(url){
	window.location.href = url;
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

function validatemobile(mobile){ 
    if(mobile.length==0) { 
       alert('请输入手机号码！'); 
       return false; 
    }     
    if(mobile.length!=11){ 
        alert('请输入有效的手机号码！'); 
        return false; 
    } 
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(!myreg.test(mobile)) { 
        alert('请输入有效的手机号码！'); 
        return false;
	}
	return true;
}

var uploadFile = function(files,cbfun) {
    var fd = new FormData();
    fd.append("fileToUpload", files);
    var xhr = new XMLHttpRequest();
    //xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", function(evt){
    	cbfun(JSON.parse(evt.target.responseText));
    }, false);
    xhr.addEventListener("error", function(evt){
    }, false);
    xhr.addEventListener("abort", function(evt){
    	alert('abort');
    }, false);
    xhr.open("POST", "http://file.act.w-lans.cn");
    xhr.send(fd);
}

window.updateFile = function (files,cbfun) {
    lrz(files, {width: 750,quality:0.5}, function (results) {
        console.log(results);
    	window.imgData = results.base64;
		$('#ImgPath').attr({src:window.imgData});
		window.imgData = encodeURIComponent(window.imgData);
		cbfun(results.base64);
	});
};

var convertImgDataToBlob = function (base64Data) { 
	var format = "image/jpeg"; 
	var base64 = base64Data;
	
	var tmp = base64Data.split(',');
	tmp[1] = tmp[1].replace(/\s/g,'');

	var code = window.atob(tmp[1]); 
	var aBuffer = new window.ArrayBuffer(code.length); 
	var uBuffer = new window.Uint8Array(aBuffer); 
	for(var i = 0; i < code.length; i++){ 
		uBuffer[i] = code.charCodeAt(i) & 0xff ; 
	}
	var blob=null;
	try{ 
		blob = new Blob([uBuffer], {type : format}); 
	}
	catch(e){
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		if(e.name == 'TypeError' && window.BlobBuilder){
			var bb = new window.BlobBuilder();
			bb.append(uBuffer.buffer);
			blob = bb.getBlob("image/jpeg");
		} else if(e.name == "InvalidStateError"){
			blob = new Blob([aBuffer], {type : format}); 
		} else{
			blob = new Blob([uBuffer], {type : format}); 
		} 
	} 
	return blob; 
};

function newBlob(data, datatype){
    var out;
    try {
        out = new Blob([data], {type: datatype});
    }
    catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;

        if (e.name == 'TypeError' && window.BlobBuilder) {
        	 var bb = new BlobBuilder();
            bb.append(data.buffer);
            out = bb.getBlob(datatype);
        }
        else if (e.name == "InvalidStateError") {
            out = new Blob([data], {type: datatype});
        }
        else {
        }
    }
    return out;
}

// 判断是否需要blobbuilder
var needsFormDataShim = (function () {
        var bCheck = ~navigator.userAgent.indexOf('Android')
                        && ~navigator.vendor.indexOf('Google')
                        && !~navigator.userAgent.indexOf('Chrome');

        return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    })(),
    blobConstruct = !!(function () {
        try { return new Blob(); } catch (e) {}
    })(),
    XBlob = blobConstruct ? window.Blob : function (parts, opts) {
        var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        parts.forEach(function (p) {
            bb.append(p);
        });

        return bb.getBlob(opts ? opts.type : undefined);
};

function FormDataShim () {
    // Store a reference to this
    var o = this,
        parts = [],// Data to be sent
        boundary = Array(5).join('-') + (+new Date() * (1e16*Math.random())).toString(32),
        oldSend = XMLHttpRequest.prototype.send;

    this.append = function (name, value, filename) {
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

        if (value instanceof Blob) {
            parts.push('; filename="'+ (filename || 'blob') +'"\r\nContent-Type: ' + value.type + '\r\n\r\n');
            parts.push(value);
        } else {
            parts.push('\r\n\r\n' + value);
        }
        parts.push('\r\n');
    };

    // Override XHR send()
    XMLHttpRequest.prototype.send = function (val) {
        var fr,
            data,
            oXHR = this;

        if (val === o) {
            //注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
            parts.push('--' + boundary + '--\r\n');
            data = new XBlob(parts);
            fr = new FileReader();
            fr.onload = function () { oldSend.call(oXHR, fr.result); };
            fr.onerror = function (err) { throw err; };
            fr.readAsArrayBuffer(data);

            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        }
        else {
            oldSend.call(this, val);
        }
    };
}

//把图片转成formdata 可以使用的数据...
//这里要把\s替换掉..要不然atob的时候会出错....
function dataURLtoBlob(data) {
    var tmp = data.split(',');

    tmp[1] = tmp[1].replace(/\s/g,'');
    var binary = atob(tmp[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new newBlob(new Uint8Array(array), 'image/jpeg');
}

function convertImgDataToBlob2(img){
    var fd = needsFormDataShim ? new FormDataShim() : new FormData();
    var file = dataURLtoBlob(img);
    fd.append('img',file);

	return file;
 }


export { //很关键
 validatemobile,
 uploadFile,
 convertImgDataToBlob2,
 updateFile,
}