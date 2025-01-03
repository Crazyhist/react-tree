import { Tree } from '@/features/tree'
import styles from './home.module.css'

const data = [
	{ id: '1', name: 'Unread' },
	{ id: '2', name: 'Threads' },
	{
		id: '3',
		name: 'Chat Rooms',
		children: [
			{ id: 'c1', name: 'General' },
			{ id: 'c2', name: 'Random' },
			{
				id: 'c3',
				name: 'Open Source Projects',
				children: [
					{ id: 'd1', name: 'tattal' },
					{ id: 'd2', name: 'proeb' },
				],
			},
		],
	},
	{
		id: '4',
		name: 'Direct Messages',
		children: [
			{ id: 'd1', name: 'Alice' },
			{ id: 'd2', name: 'Bob' },
			{ id: 'd3', name: 'Charlie' },
		],
	},
]

export const HomePage = () => {
	return (
		<div className={styles.container}>
			<Tree data={data} />
		</div>
	)
}
