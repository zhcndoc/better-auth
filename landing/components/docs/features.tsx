import { useId } from "react";

export function Features() {
	return (
		<div className="py-2 max-w-[1300px]">
			<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
				{grid.map((feature, i) => (
					<div
						key={feature.title}
						className="relative bg-gradient-to-b min-h-[180px] dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white px-6 py-2 overflow-hidden"
					>
						<Grid size={i * 5 + 10} />
						<p className="text-base font-bold text-neutral-800 dark:text-white relative z-0">
							{feature.title}
						</p>
						<p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-0">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

const grid = [
	{
		title: "框架无关",
		description: "支持大多数主流框架",
	},
	{
		title: "邮箱和密码",
		description: "内置安全的邮箱密码认证支持",
	},
	{
		title: "账户与会话管理",
		description: "轻松管理用户账户和会话",
	},
	{
		title: "内置限流器",
		description: "内置支持自定义规则的限流能力",
	},
	{
		title: "自动数据库管理",
		description: "自动处理数据库管理与迁移",
	},
	{
		title: "社交登录",
		description: "支持多种社交登录提供商",
	},
	{
		title: "组织与访问控制",
		description: "管理组织与访问控制",
	},
	{
		title: "双因素认证",
		description: "通过双因素认证提升用户安全性",
	},
	{
		title: "插件生态",
		description: "通过插件获得更多能力",
	},
];

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][];
	size?: number;
}) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	];
	return (
		<div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
				<GridPattern
					width={size ?? 20}
					height={size ?? 20}
					x="-12"
					y="4"
					squares={p}
					className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
				/>
			</div>
		</div>
	);
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				strokeWidth={0}
				fill={`url(#${patternId})`}
			/>
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y]: any, idx: number) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}-${idx}`}
							width={width + 1}
							height={height + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}
