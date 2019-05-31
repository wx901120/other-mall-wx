/* ajax工具方法 */
import axios from 'axios';
import Qs from 'qs';
import * as mUtils from '@/utils/mUtils.js';
import { MessageBox } from 'mint-ui';

const apiEnv = process.env.API_ENV;
const testApi = process.env.TEST_API; // 测试后台接口主机地址
const onLineApi = process.env.ONLINE_API; // 正式后台接口主机地址
const apiURL = apiEnv === 'test' ? testApi : onLineApi;

const removeAttr = function removeAttr(url) {
  if (/(.*)bid=.+&(.*)/.test(url)) {
    return url.replace(/(.*)bid=.+&(.*)/, '$1$2');
  }
  return url.replace(/(.*)(&bid=.*$|\?bid=.*$)/, '$1');
};

// 创建axios实例
const service = axios.create({
  apiURL, // api的base_url
  // timeout: 10000, // 请求超时时间
  transformRequest: [(data) => {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    data = Qs.stringify(data);
    return data;
  }],
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const dataText = response.data;
    let data = null;
    if (typeof dataText === 'object') {
      data = dataText;
    } else if (typeof dataText === 'string') {
      const startIndex = dataText.indexOf('(') + 1;
      const endIndex = dataText.lastIndexOf(')');
      const responseText = dataText.slice(startIndex, endIndex);
      data = JSON.parse(responseText);
    }

    let errMsg = '';
    let errCode = 0; // JSDK接口，后台不会返回errCode
    if (data) {
      errMsg = data.errMsg || data.ErrMsg;
      errCode = typeof data.errCode === 'number' ? errCode = data.errCode : errCode = data.ErrCode;
    }

    // errCode不等于0
    if (errCode !== 0 && errCode !== undefined) {
      if (errCode === -1) {  
        if(errMsg == '反馈成功！'){
            return Promise.resolve(data);
        }
        MessageBox('提示', errMsg);
        return Promise.reject(errMsg);
      } else if (errCode === -2) { // 第一次进入还未授权过
        const testApi = process.env.TEST_API;
        const onlineApi = process.env.ONLINE_API;
        const domainName = process.env.API_ENV === 'test' ? testApi : onlineApi;
        const href = removeAttr(window.location.href);
        const url = encodeURIComponent(href);
        const bid = window.$bid || process.env.BID;
        window.location.replace(`${domainName}/VueAuth.shtml?bid=${bid}&url=${url}`);
        return Promise.reject(errMsg);
      }

      MessageBox('提示', errMsg);
      return Promise.reject(errMsg);
    }

    // errCode等于0
    return Promise.resolve(data);
  },
  (error) => {
    MessageBox('提示', `系统繁忙请求稍后再试 ${error}`);
    return Promise.reject(error);
  },
);

export default service;
