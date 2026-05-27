import { describe, expect, it } from "vitest"

import { resolveLocale } from "@/i18n/utils"

describe("i18n/utils", () => {
  describe("resolveLocale", () => {
    it("should return the provided locale when it is valid", () => {
      expect(resolveLocale("en")).toBe("en")
      expect(resolveLocale("es")).toBe("es")
    })

    it("should return default locale when provided locale is invalid", () => {
      expect(resolveLocale("invalid-locale")).toBe("en")
      expect(resolveLocale("fr-FR")).toBe("en")
      expect(resolveLocale("de-DE")).toBe("en")
    })

    it("should return default locale when locale is undefined", () => {
      expect(resolveLocale(undefined)).toBe("en")
    })

    it("should return default locale when locale is empty string", () => {
      expect(resolveLocale("")).toBe("en")
    })
  })
})
