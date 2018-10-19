import axios from 'axios';
import Vue from 'vue';
import { REQUEST_BASE_PATH } from './../conf/configs';
import { Loading } from 'element-ui';
import Qs from 'qs';
let loadingInstance;
const loading_option = {
  lock: true,
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
};
let api = axios.create({
  url: '',
  method: 'post',
  baseURL: REQUEST_BASE_PATH,
  transformRequest: [
    function(data) {
      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      data = Qs.stringify(data);
      return data;
    }
  ],
  transformResponse: [
    function(data) {
      // 这里提前处理返回的数据
      //console.log(data)
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
  ],
  // 请求头信息
  headers: {},

  // parameter参数
  params: {},

  // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {},
  // 设置超时时间
  timeout: 5000,
  // 返回数据类型
  responseType: 'json' // default
});
export default class Api {
  static async getList() {
    loadingInstance = Loading.service(loading_option);
    let res = await api.post('queryTaoCodes').then(res => {
      return res.data.data;
    });
    Vue.nextTick(() => {
      loadingInstance.close();
    });
    //
    return res;
  }
  static async add({ title, code }) {
    loadingInstance = Loading.service(loading_option);
    let res = await api
      .post('addTaoCode', {
        title,
        code
      })
      .then(res => {
        return res.data.data;
      });
    Vue.nextTick(() => {
      loadingInstance.close();
    });
    return res;
  }
}
