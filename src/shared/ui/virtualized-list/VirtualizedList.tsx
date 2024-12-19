import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

interface VirtualizedListProps<T> {
	items: T[]
	renderItem: (item: T, index: number) => React.ReactNode
	itemSize?: number
	height: number
}

export const VirtualizedList = <T,>({
	items,
	renderItem,
	itemSize = 30,
	height,
}: VirtualizedListProps<T>) => {
	const parentRef = useRef<HTMLDivElement>(null)

	const virtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => itemSize,
	})

	return (
		<div
			ref={parentRef}
			style={{
				height: `${height}px`,
				overflow: 'auto',
			}}
		>
			<div
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					position: 'relative',
				}}
			>
				{virtualizer.getVirtualItems().map((virtualItem) => (
					<div
						key={virtualItem.index}
						style={{
							position: 'absolute',
							top: `${virtualItem.start}px`,
						}}
					>
						{renderItem(items[virtualItem.index], virtualItem.index)}
					</div>
				))}
			</div>
		</div>
	)
}
