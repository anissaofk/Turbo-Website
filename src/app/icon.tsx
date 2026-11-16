import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 6L42 42H34.2L30.6 33.2H17.4L13.8 42H6L24 6Z"
            fill="#0066FF"
          />
          <path d="M24 16.5 28.4 27.2H19.6L24 16.5Z" fill="#ffffff" />
          <path
            d="M14 29.5H34"
            stroke="#93C5FD"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
