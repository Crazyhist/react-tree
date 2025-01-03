import { FlattenedNode, TreeNode, TreeNodeWithDepth } from '../types'

// Преобразование дерева в плоский массив
export const flattenTree = (
	data: TreeNode[],
	expandedNodes: Set<string>
): FlattenedNode[] => {
	const result: FlattenedNode[] = []
	const stack: TreeNodeWithDepth[] = data.map((node) => ({
		node,
		depth: 0,
	}))

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
}
