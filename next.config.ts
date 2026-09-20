import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              // 아이콘 원본에 박혀 있는 색을 currentColor로 바꿔
              // text-* 유틸로 색을 제어할 수 있게 한다.
              replaceAttrValues: { "#1D1D1F": "currentColor" },
              // SVGO 기본값은 viewBox를 지운다. viewBox가 없으면
              // CSS로 크기를 줄일 때 아이콘이 축소되지 않고 잘린다.
              // vitest.config.mts의 svgr 설정과 맞춰 둘 것.
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
