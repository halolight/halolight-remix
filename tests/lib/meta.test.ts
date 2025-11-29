import { describe, it, expect } from "vitest"
import {
  siteMeta,
  pageMetas,
  getPageTitle,
  generateMeta,
  getMetaForPath,
} from "~/lib/meta"

describe("siteMeta", () => {
  it("应该包含正确的站点名称", () => {
    expect(siteMeta.siteName).toBe("HaloLight")
  })

  it("应该包含分隔符", () => {
    expect(siteMeta.separator).toBe(" · ")
  })

  it("应该包含默认关键词", () => {
    expect(siteMeta.defaultKeywords).toContain("后台管理系统")
    expect(siteMeta.defaultKeywords).toContain("React Router 7")
  })

  it("应该包含作者信息", () => {
    expect(siteMeta.author).toBe("h7ml")
  })
})

describe("pageMetas", () => {
  it("应该包含首页配置", () => {
    expect(pageMetas["/"]).toBeDefined()
    expect(pageMetas["/"].title).toBe("仪表盘")
  })

  it("应该包含登录页配置", () => {
    expect(pageMetas["/login"]).toBeDefined()
    expect(pageMetas["/login"].title).toBe("登录")
  })

  it("应该包含用户管理页配置", () => {
    expect(pageMetas["/users"]).toBeDefined()
    expect(pageMetas["/users"].title).toBe("用户管理")
  })

  it("每个页面配置应该有 title 和 description", () => {
    Object.entries(pageMetas).forEach(([path, meta]) => {
      expect(meta.title, `${path} 缺少 title`).toBeDefined()
      expect(meta.description, `${path} 缺少 description`).toBeDefined()
    })
  })
})

describe("getPageTitle", () => {
  it("应该生成完整的页面标题", () => {
    expect(getPageTitle("仪表盘")).toBe("仪表盘 · HaloLight")
  })

  it("没有页面标题时应该只返回站点名称", () => {
    expect(getPageTitle()).toBe("HaloLight")
    expect(getPageTitle("")).toBe("HaloLight")
  })
})

describe("generateMeta", () => {
  it("应该生成正确的 meta 标签数组", () => {
    const meta = generateMeta("/")

    // 检查标题
    expect(meta.find(m => "title" in m)?.title).toBe("仪表盘 · HaloLight")

    // 检查 description
    expect(meta.find(m => m.name === "description")?.content).toContain("实时运营驾驶舱")

    // 检查 keywords
    expect(meta.find(m => m.name === "keywords")?.content).toBeDefined()

    // 检查 Open Graph
    expect(meta.find(m => m.property === "og:title")?.content).toBe("仪表盘 · HaloLight")
    expect(meta.find(m => m.property === "og:type")?.content).toBe("website")

    // 检查 Twitter Card
    expect(meta.find(m => m.name === "twitter:card")?.content).toBe("summary_large_image")
  })

  it("对未配置的路径应该使用默认值", () => {
    const meta = generateMeta("/unknown-path")

    expect(meta.find(m => "title" in m)?.title).toBe("页面 · HaloLight")
  })

  it("应该支持覆盖默认值", () => {
    const meta = generateMeta("/", { title: "自定义标题" })

    expect(meta.find(m => "title" in m)?.title).toBe("自定义标题 · HaloLight")
  })
})

describe("getMetaForPath", () => {
  it("应该是 generateMeta 的快捷方法", () => {
    const meta1 = getMetaForPath("/login")
    const meta2 = generateMeta("/login")

    expect(meta1).toEqual(meta2)
  })
})
