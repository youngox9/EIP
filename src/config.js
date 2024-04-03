/**
 * project config
 */
export const DEV_URL = '192.168.0.194:8080'; // 報工dev環境
export const PRD_URL = '192.168.0.194:8088'; // 報工prd環境

export const URL_MAPPING = {
    DEV: {
        AUTH: 'http://192.168.0.157:8080',
        BASE: 'http://192.168.0.157:3002',
    },

    PRD: {
        AUTH: 'http://192.168.0.157:8080',
        BASE: 'http://192.168.0.157:3082',
    },
};

export const DEV_PATHS = ['localhost', '127.0.0.1', DEV_URL]; // 若網域包含這些清單，則會被當成DEV來開發，套用DEV CONFIG
export const IS_DEV = DEV_PATHS.some((p) => window.location.origin.includes(p)); // 判斷現在是不是DEV
export const URL_CONFIG = IS_DEV ? URL_MAPPING.DEV : URL_MAPPING.PRD; // 判斷當前該用哪一份url config: dev/prd
export const NOTIFICATION_DURATION = 10000;
export const API_TIMEOUT = 100000;
// export const API_TIMEOUT = 1;
export const NOTIFICATION_MAX_COUNT = 3;

// /**
//  * 印出當前環境名稱
//  */
// export const logEnv = () => {
//   console.log(
//     `%c→ 目前環境: [${IS_DEV ? "測試站" : "正式站"}]`,
//     "background-color: #003a74; color: white; padding: 0 6px; font-size: 18px; font-weight: bolder;",
//     URL_CONFIG
//   );
// };
