import { useFullscreen } from "@/hooks/useFullscreen";
import { act, renderHook } from "@testing-library/react";

import { FullscreenProvider } from "./FullscreenProvider";

describe(FullscreenProvider, async () => {
  describe("without a provider", async () => {
    it("is not fullscreened", async () => {
      const { result } = renderHook(() => useFullscreen());
      expect(result.current.isFullscreen).toBe(false);
    });

    it("can not be made fullscreened", async () => {
      const { result } = renderHook(() => useFullscreen());

      await act(async () => result.current.setIsFullscreen(true));

      expect(result.current.isFullscreen).toBe(false);
    });
  });

  describe("with a provider", async () => {
    it("is not fullscreened by default", async () => {
      const { result } = renderHook(() => useFullscreen(), {
        wrapper: ({ children }) => (
          <FullscreenProvider>{children}</FullscreenProvider>
        ),
      });
      expect(result.current.isFullscreen).toBe(false);
    });
  });
});
