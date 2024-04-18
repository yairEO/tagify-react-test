import { useCallback, useRef, useState, useEffect } from 'react'
import Tags from "@yaireo/tagify/react.tagify" // React-wrapper file
import "../../tagify/dist/tagify.css" // Tagify CSS
import './App.css'

const DEFAULT_PLACEHOLDER_TEXT = 'Add some tags'
const MAX_TAGS = 3;

function App() {
    const tagifyRef = useRef()
    const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER_TEXT)

    const updatePlaceholder = () => {
        setPlaceholder(`${MAX_TAGS - tagifyRef.current.value.length || 'no'} tags left`)
    }

    useEffect(() => {
        updatePlaceholder()
    }, [])

    const onChange = useCallback(updatePlaceholder, [])

    return (
        <>
            <Tags
                tagifyRef={tagifyRef}
                placeholder={placeholder}
                settings={{
                    maxTags: MAX_TAGS
                }}
                defaultValue="a,b"
                autoFocus={true}
                onChange={onChange}
                onEditInput={() => console.log("onEditInput")}
                onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
                onEditUpdated={() => console.log("onEditUpdated")}
                onEditStart={() => console.log("onEditStart")}
                onEditKeydown={() => console.log("onEditKeydown")}
                onDropdownShow={() => console.log("onDropdownShow")}
                onDropdownHide={() => console.log("onDropdownHide")}
                onDropdownSelect={() => console.log("onDropdownSelect")}
                onDropdownScroll={() => console.log("onDropdownScroll")}
                onDropdownNoMatch={() => console.log("onDropdownNoMatch")}
                onDropdownUpdated={() => console.log("onDropdownUpdated")}
            />
        </>
    )
}

export default App
