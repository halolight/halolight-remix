/// <reference types="vite/client" />

/**
 * Vite 环境变量类型定义
 * 通过 import.meta.env 访问
 */
interface ImportMetaEnv {
  /** API 基础 URL */
  readonly VITE_API_URL: string;

  /** 是否启用 Mock 数据 */
  readonly VITE_MOCK: string;

  /** 演示账号邮箱 */
  readonly VITE_DEMO_EMAIL: string;

  /** 演示账号密码 */
  readonly VITE_DEMO_PASSWORD: string;

  /** 是否显示演示账号提示 */
  readonly VITE_SHOW_DEMO_HINT: string;

  /** 应用标题 */
  readonly VITE_APP_TITLE: string;

  /** 应用描述 */
  readonly VITE_APP_DESCRIPTION?: string;

  /** 品牌名称 */
  readonly VITE_BRAND_NAME: string;

  /** 51.la 统计 ID */
  readonly VITE_51LA_ID?: string;

  /** Google Analytics ID */
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
