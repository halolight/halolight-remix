import { describe, it, expect, beforeEach } from "vitest"
import { useTabsStore } from "~/stores/tabs-store"

describe("useTabsStore", () => {
  beforeEach(() => {
    // 使用 store 自带的 clearTabs 方法重置状态
    useTabsStore.getState().clearTabs()
  })

  describe("初始状态", () => {
    it("应该有默认的首页标签", () => {
      const { tabs } = useTabsStore.getState()
      expect(tabs).toHaveLength(1)
      expect(tabs[0].id).toBe("home")
      expect(tabs[0].title).toBe("首页")
      expect(tabs[0].path).toBe("/")
      expect(tabs[0].closable).toBe(false)
    })

    it("活动标签应该是首页", () => {
      const { activeTabId } = useTabsStore.getState()
      expect(activeTabId).toBe("home")
    })
  })

  describe("addTab", () => {
    it("应该添加新标签", () => {
      const { addTab } = useTabsStore.getState()
      const newTabId = addTab({ title: "用户管理", path: "/users" })

      const { tabs, activeTabId } = useTabsStore.getState()
      expect(tabs).toHaveLength(2)
      expect(tabs[1].title).toBe("用户管理")
      expect(tabs[1].path).toBe("/users")
      expect(tabs[1].closable).toBe(true)
      expect(activeTabId).toBe(newTabId)
    })

    it("添加相同路径的标签应该激活已存在的标签", () => {
      const { addTab } = useTabsStore.getState()
      addTab({ title: "用户管理", path: "/users" })

      const { tabs: tabsBefore } = useTabsStore.getState()
      const existingTabId = tabsBefore[1].id

      // 再次添加相同路径
      const returnedId = useTabsStore.getState().addTab({ title: "用户", path: "/users" })

      const { tabs: tabsAfter, activeTabId } = useTabsStore.getState()
      expect(tabsAfter).toHaveLength(2) // 数量不变
      expect(returnedId).toBe(existingTabId)
      expect(activeTabId).toBe(existingTabId)
    })

    it("应该支持不可关闭的标签", () => {
      const { addTab } = useTabsStore.getState()
      addTab({ title: "设置", path: "/settings", closable: false })

      const { tabs } = useTabsStore.getState()
      expect(tabs[1].closable).toBe(false)
    })
  })

  describe("removeTab", () => {
    it("应该移除可关闭的标签", () => {
      const { addTab } = useTabsStore.getState()
      const tabId = addTab({ title: "用户管理", path: "/users" })

      useTabsStore.getState().removeTab(tabId)

      const { tabs } = useTabsStore.getState()
      expect(tabs).toHaveLength(1)
      expect(tabs.find((t) => t.id === tabId)).toBeUndefined()
    })

    it("不应该移除不可关闭的标签", () => {
      const { removeTab } = useTabsStore.getState()
      removeTab("home")

      const { tabs } = useTabsStore.getState()
      expect(tabs).toHaveLength(1)
      expect(tabs[0].id).toBe("home")
    })

    it("关闭当前活动标签时应该切换到相邻标签", () => {
      const { addTab } = useTabsStore.getState()

      // 添加第二个标签
      const secondTabId = addTab({ title: "页面A", path: "/page-a" })
      expect(useTabsStore.getState().tabs).toHaveLength(2)

      // 添加第三个标签
      const thirdTabId = useTabsStore.getState().addTab({ title: "页面B", path: "/page-b" })
      expect(useTabsStore.getState().tabs).toHaveLength(3)

      // 当前活动的是第三个标签
      expect(useTabsStore.getState().activeTabId).toBe(thirdTabId)

      // 关闭第三个标签
      useTabsStore.getState().removeTab(thirdTabId)

      // 应该切换到前一个标签（第二个标签）
      const { tabs, activeTabId } = useTabsStore.getState()
      expect(tabs).toHaveLength(2)
      expect(activeTabId).toBe(secondTabId)
    })
  })

  describe("setActiveTab", () => {
    it("应该切换活动标签", () => {
      const { addTab } = useTabsStore.getState()
      addTab({ title: "用户管理", path: "/users" })

      useTabsStore.getState().setActiveTab("home")

      const { activeTabId } = useTabsStore.getState()
      expect(activeTabId).toBe("home")
    })

    it("切换到不存在的标签应该无效", () => {
      const { setActiveTab, activeTabId: before } = useTabsStore.getState()
      setActiveTab("non-existent")

      const { activeTabId: after } = useTabsStore.getState()
      expect(after).toBe(before)
    })
  })

  describe("updateTab", () => {
    it("应该更新标签属性", () => {
      const { updateTab } = useTabsStore.getState()
      updateTab("home", { title: "主页" })

      const { tabs } = useTabsStore.getState()
      expect(tabs[0].title).toBe("主页")
    })
  })

  describe("clearTabs", () => {
    it("应该清除所有标签，只保留首页", () => {
      const { addTab } = useTabsStore.getState()
      addTab({ title: "用户管理", path: "/users" })
      addTab({ title: "设置", path: "/settings" })

      useTabsStore.getState().clearTabs()

      const { tabs, activeTabId } = useTabsStore.getState()
      expect(tabs).toHaveLength(1)
      expect(tabs[0].id).toBe("home")
      expect(activeTabId).toBe("home")
    })
  })

  describe("getTab", () => {
    it("应该返回指定 ID 的标签", () => {
      const { getTab } = useTabsStore.getState()
      const tab = getTab("home")

      expect(tab).toBeDefined()
      expect(tab?.title).toBe("首页")
    })

    it("不存在的标签应该返回 undefined", () => {
      const { getTab } = useTabsStore.getState()
      const tab = getTab("non-existent")

      expect(tab).toBeUndefined()
    })
  })

  describe("getTabByPath", () => {
    it("应该返回指定路径的标签", () => {
      const { getTabByPath } = useTabsStore.getState()
      const tab = getTabByPath("/")

      expect(tab).toBeDefined()
      expect(tab?.id).toBe("home")
    })

    it("不存在的路径应该返回 undefined", () => {
      const { getTabByPath } = useTabsStore.getState()
      const tab = getTabByPath("/non-existent")

      expect(tab).toBeUndefined()
    })
  })
})
