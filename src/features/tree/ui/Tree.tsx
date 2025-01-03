import { flattenTree, TreeNode } from '@/shared/lib/tree'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useMemo, useRef, useState } from 'react'

interface TreeProps {
	data: TreeNode[]
}

export const Tree = ({ data }: TreeProps) => {
	const getAllExpandableNodes = (nodes: TreeNode[]): Set<string> => {
		const expandableNodes = new Set<string>()
		const stack = [...nodes]

		while (stack.length > 0) {
			const node = stack.pop()!
			if (node.children) {
				expandableNodes.add(node.id)
			}
		}
		return expandableNodes
	}

	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
		() => new Set()
	)

	useEffect(() => {
		setExpandedNodes(getAllExpandableNodes(data))
	}, [data])

	// Плоский массив для виртуализации
	const flattenedData = useMemo(
		() => flattenTree(data, expandedNodes),
		[data, expandedNodes]
	)

	// Виртуализатор
	const parentRef = useRef<HTMLDivElement>(null)
	const virtualizer = useVirtualizer({
		count: flattenedData.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 30,
	})

	return (
		<div
			ref={parentRef}
			style={{
				height: '400px',
				overflow: 'auto',
				border: '1px solid #ccc',
				paddingLeft: '10px',
			}}
		>
			<div
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					position: 'relative',
				}}
			>
				{virtualizer.getVirtualItems().map((virtualItem) => {
					const item = flattenedData[virtualItem.index]

					return (
						<div
							key={item.id}
							style={{
								position: 'relative',
								top: 0,
								left: 0,
								paddingLeft: `${item.depth * 16}px`,
								height: '30px',
								lineHeight: '30px',
								cursor: 'pointer',
								userSelect: 'none',
							}}
						>
							{item.name}
						</div>
					)
				})}
			</div>
		</div>
	)
}
