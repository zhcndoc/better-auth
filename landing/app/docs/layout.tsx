import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { FloatingToolbar } from "@/components/floating-toolbar";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<RootProvider
			i18n={{
				locale: "zh-CN",
				translations: {
					search: "搜索",
					searchNoResult: "未找到结果",
					toc: "本页目录",
					tocNoHeadings: "本页暂无标题",
					lastUpdate: "最后更新于",
					chooseLanguage: "选择语言",
					nextPage: "下一页",
					previousPage: "上一页",
					chooseTheme: "选择主题",
					editOnGithub: "在 GitHub 上编辑",
				},
			}}
			search={{
				enabled: false,
			}}
		>
			<Suspense>
				<DocsSidebar />
			</Suspense>
			<DocsLayout
				tree={source.pageTree}
				nav={{ enabled: false }}
				searchToggle={{ enabled: false }}
				themeSwitch={{ enabled: false }}
				sidebar={{ enabled: false }}
				containerProps={{
					className: "docs-layout",
				}}
			>
				{children}
			</DocsLayout>
			<FloatingToolbar />
		</RootProvider>
	);
}
