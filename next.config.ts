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
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
