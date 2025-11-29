import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { Footer } from "~/components/layout/footer"
import { projectInfo } from "~/lib/project-info"

describe("Footer", () => {
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
  }

  it("应该渲染页脚", () => {
    renderFooter()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("应该显示项目名称", () => {
    renderFooter()
    expect(screen.getByText(new RegExp(projectInfo.name))).toBeInTheDocument()
  })

  it("应该显示作者名称", () => {
    renderFooter()
    expect(screen.getByText(projectInfo.author)).toBeInTheDocument()
  })

  it("应该包含文档链接", () => {
    renderFooter()
    const docsLink = screen.getByRole("link", { name: "文档" })
    expect(docsLink).toHaveAttribute("href", projectInfo.docs)
    expect(docsLink).toHaveAttribute("target", "_blank")
  })

  it("应该包含 GitHub 链接", () => {
    renderFooter()
    const githubLink = screen.getByRole("link", { name: "GitHub" })
    expect(githubLink).toHaveAttribute("href", projectInfo.repo)
    expect(githubLink).toHaveAttribute("target", "_blank")
  })

  it("应该包含隐私政策链接", () => {
    renderFooter()
    const privacyLink = screen.getByRole("link", { name: "隐私政策" })
    expect(privacyLink).toHaveAttribute("href", "/privacy")
  })

  it("应该包含服务条款链接", () => {
    renderFooter()
    const termsLink = screen.getByRole("link", { name: "服务条款" })
    expect(termsLink).toHaveAttribute("href", "/terms")
  })

  it("应该显示当前年份", () => {
    renderFooter()
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })
})
