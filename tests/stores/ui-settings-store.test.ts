import { describe, it, expect, beforeEach } from "vitest"
import { useUiSettingsStore, type SkinPreset } from "~/stores/ui-settings-store"

describe("useUiSettingsStore", () => {
  beforeEach(() => {
    // 每个测试前重置 store
    useUiSettingsStore.getState().resetSettings()
  })

  describe("初始状态", () => {
    it("应该有默认的皮肤设置", () => {
      const { skin } = useUiSettingsStore.getState()
      expect(skin).toBe("default")
    })

    it("应该默认显示页脚", () => {
      const { showFooter } = useUiSettingsStore.getState()
      expect(showFooter).toBe(true)
    })

    it("应该默认显示标签栏", () => {
      const { showTabBar } = useUiSettingsStore.getState()
      expect(showTabBar).toBe(true)
    })

    it("应该默认固定移动端头部", () => {
      const { mobileHeaderFixed } = useUiSettingsStore.getState()
      expect(mobileHeaderFixed).toBe(true)
    })

    it("应该默认固定移动端标签栏", () => {
      const { mobileTabBarFixed } = useUiSettingsStore.getState()
      expect(mobileTabBarFixed).toBe(true)
    })
  })

  describe("setSkin", () => {
    it("应该切换皮肤", () => {
      const { setSkin } = useUiSettingsStore.getState()
      setSkin("blue")

      const { skin } = useUiSettingsStore.getState()
      expect(skin).toBe("blue")
    })

    it("应该支持所有预设皮肤", () => {
      const presets: SkinPreset[] = [
        "default",
        "blue",
        "emerald",
        "amber",
        "violet",
        "rose",
        "teal",
        "slate",
        "ocean",
        "sunset",
        "aurora",
      ]

      presets.forEach((preset) => {
        useUiSettingsStore.getState().setSkin(preset)
        const { skin } = useUiSettingsStore.getState()
        expect(skin).toBe(preset)
      })
    })
  })

  describe("setShowFooter", () => {
    it("应该隐藏页脚", () => {
      const { setShowFooter } = useUiSettingsStore.getState()
      setShowFooter(false)

      const { showFooter } = useUiSettingsStore.getState()
      expect(showFooter).toBe(false)
    })

    it("应该显示页脚", () => {
      useUiSettingsStore.getState().setShowFooter(false)
      useUiSettingsStore.getState().setShowFooter(true)

      const { showFooter } = useUiSettingsStore.getState()
      expect(showFooter).toBe(true)
    })
  })

  describe("setShowTabBar", () => {
    it("应该隐藏标签栏", () => {
      const { setShowTabBar } = useUiSettingsStore.getState()
      setShowTabBar(false)

      const { showTabBar } = useUiSettingsStore.getState()
      expect(showTabBar).toBe(false)
    })

    it("应该显示标签栏", () => {
      useUiSettingsStore.getState().setShowTabBar(false)
      useUiSettingsStore.getState().setShowTabBar(true)

      const { showTabBar } = useUiSettingsStore.getState()
      expect(showTabBar).toBe(true)
    })
  })

  describe("setMobileHeaderFixed", () => {
    it("应该设置移动端头部固定", () => {
      const { setMobileHeaderFixed } = useUiSettingsStore.getState()
      setMobileHeaderFixed(false)

      const { mobileHeaderFixed } = useUiSettingsStore.getState()
      expect(mobileHeaderFixed).toBe(false)
    })
  })

  describe("setMobileTabBarFixed", () => {
    it("应该设置移动端标签栏固定", () => {
      const { setMobileTabBarFixed } = useUiSettingsStore.getState()
      setMobileTabBarFixed(false)

      const { mobileTabBarFixed } = useUiSettingsStore.getState()
      expect(mobileTabBarFixed).toBe(false)
    })
  })

  describe("resetSettings", () => {
    it("应该重置所有设置到默认值", () => {
      // 先修改所有设置
      const state = useUiSettingsStore.getState()
      state.setSkin("aurora")
      state.setShowFooter(false)
      state.setShowTabBar(false)
      state.setMobileHeaderFixed(false)
      state.setMobileTabBarFixed(false)

      // 重置
      useUiSettingsStore.getState().resetSettings()

      // 验证所有值都恢复默认
      const {
        skin,
        showFooter,
        showTabBar,
        mobileHeaderFixed,
        mobileTabBarFixed,
      } = useUiSettingsStore.getState()

      expect(skin).toBe("default")
      expect(showFooter).toBe(true)
      expect(showTabBar).toBe(true)
      expect(mobileHeaderFixed).toBe(true)
      expect(mobileTabBarFixed).toBe(true)
    })
  })
})
