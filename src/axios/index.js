import axios from "axios";
// import { ElNotification } from "element-plus";
import store from "@/store";
import router from "@/router";
import i18n from "@/i18n";
import _ from "lodash";
import { ElNotification } from "@/utils";
import { URL_CONFIG, NOTIFICATION_DURATION, API_TIMEOUT } from "@/config";

const { t = (v) => v } = i18n?.global || {};

function getProfile() {
  try {
    const profile = JSON.parse(window.localStorage.getItem("auth")) || {};
    return profile;
  } catch (e) {}
  return {};
}

function getErrorMsg(e) {
  const paths = ["response.data", "response.data.message", "data"];
  const errorStr = paths.reduce((prev, p) => {
    const str = _.get(e, p);
    if (!prev && typeof str === "string") {
      return str;
    }
    return prev;
  }, "");
  return errorStr;
}

export default function (config = {}) {
  const { url = "", auth = false, showError = true } = config;
  const { accessToken = "" } = getProfile();

  let baseURL = auth ? URL_CONFIG.AUTH : URL_CONFIG.BASE;

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Expose-Headers": "Content-Disposition",
    },
    baseURL,
    timeout: API_TIMEOUT,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorCode = error?.response?.status;
      console.log(
        "URL :",
        url,
        "|| API error >>>>>>",
        error,
        "|| ERROR code:",
        errorCode
      );

      let msg = getErrorMsg(error);
      let title = `${error?.message || t("error")}`;

      if (showError) {
        if (errorCode === 401) {
          store.commit("global/logout");
          msg = msg || t("token_expired");
          ElNotification({
            title,
            message: msg,
            type: "error",
            duration: NOTIFICATION_DURATION,
          });
        } else {
          msg = msg || t("network_error");
          ElNotification({
            title,
            message: msg,
            type: "error",
            duration: NOTIFICATION_DURATION,
          });
        }
      }
      store.commit("global/addErrorMsg", { title, msg, url });
      throw new Error(error);
    }
  );

  return instance({ ...config });
}
