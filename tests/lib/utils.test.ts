import { describe, it, expect } from "vitest"
import { cn } from "~/lib/utils"

describe("cn (classnames utility)", () => {
  it("应该合并多个类名", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("应该处理条件类名", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz")
    expect(cn("foo", true && "bar", "baz")).toBe("foo bar baz")
  })

  it("应该处理对象形式的类名", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo")
    expect(cn({ foo: true, bar: true })).toBe("foo bar")
  })

  it("应该处理数组形式的类名", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar")
  })

  it("应该合并 Tailwind 类名并去重", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("应该处理 undefined 和 null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar")
  })

  it("应该处理空字符串", () => {
    expect(cn("foo", "", "bar")).toBe("foo bar")
  })

  it("应该处理复杂的混合输入", () => {
    expect(
      cn(
        "base-class",
        { conditional: true, hidden: false },
        ["array-class"],
        undefined,
        "final-class"
      )
    ).toBe("base-class conditional array-class final-class")
  })
})
