export type TreeNode = {
	id: string
	name: string
	children?: TreeNode[]
}

export type FlattenedNode = {
	id: string
	name: string
	depth: number
}

export type TreeNodeWithDepth = {
	node: TreeNode
	depth: number
}
