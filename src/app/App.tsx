import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useRef, useState, useEffect } from 'react'

type TreeNode = {
	id: string
	name: string
	children?: TreeNode[]
}

interface TreeProps {
	data: TreeNode[]
}

const Tree = ({ data }: TreeProps) => {
	const getAllExpandableNodes = (nodes: TreeNode[]): Set<string> => {
		const expandableNodes = new Set<string>()
		const stack = [...nodes]

		while (stack.length > 0) {
			const node = stack.pop()!
			if (node.children) {
				expandableNodes.add(node.id)
				stack.push(...node.children)
			}
		}

		return expandableNodes
	}

	const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

	useEffect(() => {
		setExpandedNodes(getAllExpandableNodes(data))
	}, [data])

	const flattenedData = useMemo(() => {
		const result: { id: string; name: string; depth: number }[] = []
		const stack: { node: TreeNode; depth: number }[] = []

		data.forEach((node) => stack.push({ node, depth: 0 }))

		while (stack.length > 0) {
			const { node, depth } = stack.pop()!

			result.push({ id: node.id, name: node.name, depth })

			if (node.children && expandedNodes.has(node.id)) {
				for (let i = node.children.length - 1; i >= 0; i--) {
					stack.push({ node: node.children[i], depth: depth + 1 })
				}
			}
		}

		return result
	}, [data, expandedNodes])

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
								position: 'absolute',
								top: `${virtualItem.start}px`,
								left: `${item.depth * 16}px`,
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

export default Tree
