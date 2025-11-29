/**
 * 环境变量配置
 * 客户端可访问的环境变量（VITE_ 前缀）
 */

/**
 * 获取环境变量配置
 */
export function getEnvConfig() {
  return {
    /** API 基础 URL */
    apiUrl: import.meta.env.VITE_API_URL || "/api",

    /** 是否启用 Mock 数据 */
    useMock: import.meta.env.VITE_MOCK === "true",

    /** 演示账号邮箱 */
    demoEmail: import.meta.env.VITE_DEMO_EMAIL || "",

    /** 演示账号密码 */
    demoPassword: import.meta.env.VITE_DEMO_PASSWORD || "",

    /** 是否显示演示账号提示 */
    showDemoHint: import.meta.env.VITE_SHOW_DEMO_HINT === "true",

    /** 应用标题 */
    appTitle: import.meta.env.VITE_APP_TITLE || "Admin Pro",

    /** 应用描述 */
    appDescription:
      import.meta.env.VITE_APP_DESCRIPTION || "Halolight 后台管理系统",

    /** 品牌名称 */
    brandName: import.meta.env.VITE_BRAND_NAME || "Halolight",

    /** 51.la 统计 ID */
    la51Id: import.meta.env.VITE_51LA_ID,

    /** Google Analytics ID */
    gaId: import.meta.env.VITE_GA_ID,

    /** 是否为开发环境 */
    isDev: import.meta.env.DEV,

    /** 是否为生产环境 */
    isProd: import.meta.env.PROD,
  };
}

/** 环境变量配置类型 */
export type EnvConfig = ReturnType<typeof getEnvConfig>;

/** 默认配置实例（客户端使用） */
export const env = getEnvConfig();
