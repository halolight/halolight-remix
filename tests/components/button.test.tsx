import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "~/components/ui/button"

describe("Button", () => {
  it("应该渲染按钮", () => {
    render(<Button>点击</Button>)
    expect(screen.getByRole("button", { name: "点击" })).toBeInTheDocument()
  })

  it("应该响应点击事件", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>点击</Button>)

    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("禁用状态应该不响应点击", () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        点击
      </Button>
    )

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  describe("variants", () => {
    it("default variant 应该有正确的样式类", () => {
      render(<Button variant="default">默认</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-primary")
    })

    it("destructive variant 应该有正确的样式类", () => {
      render(<Button variant="destructive">删除</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-destructive")
    })

    it("outline variant 应该有边框", () => {
      render(<Button variant="outline">边框</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("border")
    })

    it("secondary variant 应该有正确的样式类", () => {
      render(<Button variant="secondary">次要</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-secondary")
    })

    it("ghost variant 应该有 hover 效果", () => {
      render(<Button variant="ghost">幽灵</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("hover:bg-accent")
    })

    it("link variant 应该有下划线", () => {
      render(<Button variant="link">链接</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("underline-offset-4")
    })
  })

  describe("sizes", () => {
    it("default size 应该有正确的高度", () => {
      render(<Button size="default">默认</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-9")
    })

    it("sm size 应该更小", () => {
      render(<Button size="sm">小</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-8")
    })

    it("lg size 应该更大", () => {
      render(<Button size="lg">大</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-10")
    })

    it("icon size 应该是正方形", () => {
      render(<Button size="icon">图标</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("size-9")
    })
  })

  it("应该支持自定义 className", () => {
    render(<Button className="custom-class">自定义</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("asChild 应该渲染子元素而非 button", () => {
    render(
      <Button asChild>
        <a href="/test">链接按钮</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: "链接按钮" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })

  it("应该有正确的 data-slot 属性", () => {
    render(<Button>按钮</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("data-slot", "button")
  })

  it("应该正确传递 ref", () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<Button ref={ref}>按钮</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
