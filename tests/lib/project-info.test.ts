import { describe, it, expect } from "vitest"
import { projectInfo } from "~/lib/project-info"

describe("projectInfo", () => {
  it("应该包含项目名称", () => {
    expect(projectInfo.name).toBe("halolight-remix")
  })

  it("应该包含作者信息", () => {
    expect(projectInfo.author).toBe("h7ml")
  })

  it("应该包含仓库地址", () => {
    expect(projectInfo.repo).toBe("https://github.com/halolight/halolight-remix")
  })

  it("应该包含主页地址", () => {
    expect(projectInfo.homepage).toBe("https://halolight-remix.h7ml.cn")
  })

  it("应该包含文档地址", () => {
    expect(projectInfo.docs).toBe("https://halolight.docs.h7ml.cn")
  })

  it("应该包含项目描述", () => {
    expect(projectInfo.desc).toContain("React Router 7")
    expect(projectInfo.desc).toContain("Remix")
  })

  it("所有必需字段都应该是字符串", () => {
    expect(typeof projectInfo.name).toBe("string")
    expect(typeof projectInfo.author).toBe("string")
    expect(typeof projectInfo.repo).toBe("string")
    expect(typeof projectInfo.homepage).toBe("string")
    expect(typeof projectInfo.docs).toBe("string")
    expect(typeof projectInfo.desc).toBe("string")
  })

  it("URL 字段应该是有效的 URL 格式", () => {
    expect(projectInfo.repo).toMatch(/^https:\/\//)
    expect(projectInfo.homepage).toMatch(/^https:\/\//)
    expect(projectInfo.docs).toMatch(/^https:\/\//)
  })
})
