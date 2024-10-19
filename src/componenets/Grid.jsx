import { useState } from 'react'
import ReactGridLayout from 'react-grid-layout'

const convertToLayout = (elements) => {
	return elements.map((element) => {
		const { id: i, x, y, w, h } = element
		return { i, x, y, w, h }
	})
}

const Grid = (props) => {
	const { document, isEditMode } = props
	const { elements } = document

	const [layout, setLayout] = useState(elements)

	return (
		<div className='grid-layout-container'>
			<ReactGridLayout onLayoutChange={setLayout}>
				{layout.map((element) => (
					<div key={element.id} data-grid={element}>
						<Element element={element} isEditMode={isEditMode} />
					</div>
				))}
			</ReactGridLayout>
		</div>
	)
}
