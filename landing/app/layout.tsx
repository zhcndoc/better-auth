import { GeistPixelSquare } from "geist/font/pixel";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { CommandMenuProvider } from "@/components/command-menu";
import { StaggeredNavFiles } from "@/components/landing/staggered-nav-files";
import { Providers } from "@/components/providers";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: process.env.NODE_ENV === "production"
				? "https://better-auth.zhcndoc.com"
				: (process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"),
	),
	title: {
		template: "%s | Better Auth 中文文档",
		default: "Better Auth 中文文档",
	},
	description: "最全面的身份验证框架",
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico", sizes: "any" },
			{
				url: "/favicon/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/favicon/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
		],
		apple: "/favicon/apple-touch-icon.png",
	},
	openGraph: {
		images: ["/og.png"],
	},
	twitter: {
		card: "summary_large_image",
		images: ["/og.png"],
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="zh-CN" suppressHydrationWarning>
			<head>
				<Script async src="https://www.zhcndoc.com/js/common.js"></Script>
        <Script id="wwads-inject" strategy="afterInteractive">
          {`
            (function () {
              function injectAdsIntoLayout() {
                const tocRoot = document.getElementById("nd-toc");
                if (!tocRoot) return;

                const firstChild = tocRoot.firstElementChild;
                if (!firstChild) return;

                if (firstChild.querySelector(".wwads-cn.wwads-vertical")) return;

                const verticalAd = document.createElement("div");
                verticalAd.className = "wwads-cn wwads-vertical";
                verticalAd.setAttribute(
                  "style",
                  "max-width: 200px; margin-top: 0; margin-bottom: 1rem; flex-shrink: 0;"
                );
                verticalAd.setAttribute("data-id", "354");
                firstChild.insertBefore(verticalAd, firstChild.firstChild);
              }

              function runWhenDomReady(fn) {
                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", fn, { once: true });
                } else {
                  fn();
                }
              }

              runWhenDomReady(() => {
                injectAdsIntoLayout();

                const observer = new MutationObserver(() => {
                  injectAdsIntoLayout();
                });

                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
              });
            })();
          `}
        </Script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
                    try {
                      if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        document.querySelector('meta[name="theme-color"]').setAttribute('content')
                      }
                    } catch (_) {}
                  `,
					}}
				/>
				{process.env.NODE_ENV === "development" && (
					<Script
						src="//unpkg.com/react-grab/dist/index.global.js"
						crossOrigin="anonymous"
						strategy="beforeInteractive"
						data-options={JSON.stringify({
							activationKey: " ",
							activationMode: "toggle",
							allowActivationInsideInput: false,
							maxContextLines: 3,
						})}
					/>
				)}
				{process.env.NODE_ENV === "development" && (
					<Script
						src="//unpkg.com/@react-grab/mcp/dist/client.global.js"
						strategy="lazyOnload"
					/>
				)}
			</head>
			<body
				className={`${fontSans.variable} ${fontMono.variable} ${GeistPixelSquare.variable} font-sans antialiased`}
				suppressHydrationWarning
			>
				<Providers>
					<CommandMenuProvider>
						<div className="relative min-h-dvh">
							<StaggeredNavFiles />
							{children}
						</div>
					</CommandMenuProvider>
				</Providers>
				{/* <Analytics /> */}
			</body>
		</html>
	);
}
