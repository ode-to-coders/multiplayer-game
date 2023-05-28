// ../client/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { resolve } from "node:path";
import svgr from "vite-plugin-svgr";
var __vite_injected_original_dirname = "C:\\folderNodeJS\\Practicum\\MODULE_2\\multiplayer-game\\packages\\client";
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  preview: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __CLIENT_URL__: `'${process.env.CLIENT_URL}'`,
    __APP_PATH__: `'${process.env.APP_PATH}'`,
    __YANDEX_OAUTH_REDIRECT_PATH__: `'${process.env.YANDEX_OAUTH_REDIRECT_PATH}'`
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      app: resolve(__vite_injected_original_dirname, "src/app/"),
      entities: resolve(__vite_injected_original_dirname, "src/entities/"),
      features: resolve(__vite_injected_original_dirname, "src/features/"),
      pages: resolve(__vite_injected_original_dirname, "src/pages/"),
      components: resolve(__vite_injected_original_dirname, "src/components/"),
      shared: resolve(__vite_injected_original_dirname, "src/shared/"),
      widgets: resolve(__vite_injected_original_dirname, "src/widgets/")
    }
  },
  plugins: [react(), svgr()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZm9sZGVyTm9kZUpTXFxcXFByYWN0aWN1bVxcXFxNT0RVTEVfMlxcXFxtdWx0aXBsYXllci1nYW1lXFxcXHBhY2thZ2VzXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZm9sZGVyTm9kZUpTXFxcXFByYWN0aWN1bVxcXFxNT0RVTEVfMlxcXFxtdWx0aXBsYXllci1nYW1lXFxcXHBhY2thZ2VzXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZm9sZGVyTm9kZUpTL1ByYWN0aWN1bS9NT0RVTEVfMi9tdWx0aXBsYXllci1nYW1lL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnO1xyXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcclxuXHJcbmRvdGVudi5jb25maWcoKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXHJcbiAgfSxcclxuICBwcmV2aWV3OiB7XHJcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICAgIF9fQ0xJRU5UX1VSTF9fOiBgJyR7cHJvY2Vzcy5lbnYuQ0xJRU5UX1VSTH0nYCxcclxuICAgIF9fQVBQX1BBVEhfXzogYCcke3Byb2Nlc3MuZW52LkFQUF9QQVRIfSdgLFxyXG4gICAgX19ZQU5ERVhfT0FVVEhfUkVESVJFQ1RfUEFUSF9fOiBgJyR7cHJvY2Vzcy5lbnYuWUFOREVYX09BVVRIX1JFRElSRUNUX1BBVEh9J2AsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICAgIGFwcDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXBwLycpLFxyXG4gICAgICBlbnRpdGllczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZW50aXRpZXMvJyksXHJcbiAgICAgIGZlYXR1cmVzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9mZWF0dXJlcy8nKSxcclxuICAgICAgcGFnZXM6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzLycpLFxyXG4gICAgICBjb21wb25lbnRzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzLycpLFxyXG4gICAgICBzaGFyZWQ6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3NoYXJlZC8nKSxcclxuICAgICAgd2lkZ2V0czogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvd2lkZ2V0cy8nKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3ZncigpXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVksU0FBUyxvQkFBb0I7QUFDdGEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLE9BQU8sT0FBTztBQUdkLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU0sT0FBTyxRQUFRLElBQUksV0FBVyxLQUFLO0FBQUEsRUFDM0M7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU0sT0FBTyxRQUFRLElBQUksV0FBVyxLQUFLO0FBQUEsRUFDM0M7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGdCQUFnQixJQUFJLFFBQVEsSUFBSTtBQUFBLElBQ2hDLGNBQWMsSUFBSSxRQUFRLElBQUk7QUFBQSxJQUM5QixnQ0FBZ0MsSUFBSSxRQUFRLElBQUk7QUFBQSxFQUNsRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUM3QixLQUFLLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQ2xDLFVBQVUsUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDNUMsVUFBVSxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUM1QyxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLFlBQVksUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNoRCxRQUFRLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3hDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMzQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
