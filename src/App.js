import React, { useState, useEffect, useRef } from 'react'
import { storage } from './firebase/config'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const LOCAL_STORAGE_KEY_EDIT = 'grid-layout-edit'
const LOCAL_STORAGE_KEY_PRESENT = 'grid-layout-present'

const App = () => {
	const [editLayout, setEditLayout] = useState([
		{ i: 'a', x: 0, y: 0, w: 3, h: 3, maxH: 5 },
		{ i: 'b', x: 3, y: 0, w: 2, h: 2, maxH: 5 },
		{ i: 'c', x: 0, y: 3, w: 1, h: 1, maxH: 5 },
	])

	const [presentLayout, setPresentLayout] = useState([])
	const [isEditMode, setIsEditMode] = useState(true)
	const contentRefs = useRef({})

	useEffect(() => {
		const savedEditLayout = localStorage.getItem(LOCAL_STORAGE_KEY_EDIT)
		if (savedEditLayout) {
			setEditLayout(JSON.parse(savedEditLayout))
		}
		const savedPresentLayout = localStorage.getItem(LOCAL_STORAGE_KEY_PRESENT)
		if (savedPresentLayout) {
			setPresentLayout(JSON.parse(savedPresentLayout))
		}
	}, [])

	const handleEditLayoutChange = (newLayout) => {
		setEditLayout(newLayout)
		localStorage.setItem(LOCAL_STORAGE_KEY_EDIT, JSON.stringify(newLayout))
	}

	const handlePresentLayoutChange = (newLayout) => {
		setPresentLayout(newLayout)
		localStorage.setItem(LOCAL_STORAGE_KEY_PRESENT, JSON.stringify(newLayout))
	}

	const addItem = () => {
		const newItem = {
			i: `item-${editLayout.length}`,
			x: 0,
			y: 0,
			w: 2,
			h: 2,
			maxH: 5,
		}
		const newEditLayout = [...editLayout, newItem]
		setEditLayout(newEditLayout)
		localStorage.setItem(LOCAL_STORAGE_KEY_EDIT, JSON.stringify(newEditLayout))
	}

	const toggleEditMode = () => {
		setIsEditMode(!isEditMode)
		if (isEditMode) {
			updateLayoutForPresentation()
		} else {
			updateLayoutForEdit()
		}
	}

	const updateLayoutForPresentation = () => {
		const newPresentLayout = editLayout.map((item) => {
			const contentHeight = contentRefs.current[item.i]?.clientHeight || 100
			const gridHeight = Math.ceil(contentHeight / 100)
			return { ...item, h: gridHeight }
		})
		setPresentLayout(newPresentLayout)
		localStorage.setItem(LOCAL_STORAGE_KEY_PRESENT, JSON.stringify(newPresentLayout))
	}

	const updateLayoutForEdit = () => {
		const newEditLayout = presentLayout.map((item) => ({
			...item,
			h: Math.min(item.h, 5),
			maxH: 5,
		}))
		setEditLayout(newEditLayout)
		localStorage.setItem(LOCAL_STORAGE_KEY_EDIT, JSON.stringify(newEditLayout))
	}

	const renderItemContent = (item) => {
		return (
			<div
				ref={(el) => (contentRefs.current[item.i] = el)}
				style={{
					border: '1px solid black',
					height: '100%',
					overflow: isEditMode ? 'hidden' : 'auto',
				}}>
				{item.i}
				<div>
					{/* Example content */}
					{Array.from({ length: item.i === 'b' ? 20 : 5 }, (_, index) => (
						<p key={index}>Content {index + 1}</p>
					))}
				</div>
			</div>
		)
	}

	return (
		<div>
			<button onClick={addItem}>Add Item</button>
			<button onClick={toggleEditMode}>
				{isEditMode ? 'Switch to Presentation Mode' : 'Switch to Edit Mode'}
			</button>
			<GridLayout
				className='layout'
				layout={isEditMode ? editLayout : presentLayout}
				cols={3}
				rowHeight={100}
				width={500}
				compactType='vertical'
				onLayoutChange={isEditMode ? handleEditLayoutChange : handlePresentLayoutChange}
				isDraggable={isEditMode}
				isResizable={isEditMode}>
				{(isEditMode ? editLayout : presentLayout).map((item) => (
					<div key={item.i} style={{ height: isEditMode ? 'auto' : 'fit-content' }}>
						{renderItemContent(item)}
					</div>
				))}
			</GridLayout>
		</div>
	)
}

export default App
