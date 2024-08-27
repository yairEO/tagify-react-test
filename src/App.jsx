import { useCallback, useRef, useState, useEffect, useMemo } from 'react'
import Tags, {MixedTags} from "@yaireo/tagify/react" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import './App.css'

const DEFAULT_PLACEHOLDER_TEXT = 'Add some tags'
const MAX_TAGS = 3;

function App() {
    const tagifyRef = useRef()
    const [cn, setCn] = useState('foo bar')
    const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER_TEXT)

    const updatePlaceholder = () => {
        setPlaceholder(`${MAX_TAGS - tagifyRef.current.value.length || 'no'} tags left`)
    }

    useEffect(() => {
        updatePlaceholder()
    }, [])

    const onChange = useCallback(updatePlaceholder, [])

    const mixTagsSettings = useMemo(() => ({
        pattern: /@/,  // <- must define "patten" in mixed mode
        dropdown: {
          enabled: 1,
          position: "text"
        },
        whitelist: [
          {id: 100, value: "kenny", title: "Kenny McCormick"},
          {id: 101, value: "cartman", title: "Eric Cartman"},
          {id: 102, value: "kyle", title: "Kyle Broflovski"},
          {id: 103, value: "token", title: "Token Black"},
          {id: 104, value: "jimmy", title: "Jimmy Valmer"},
          {id: 105, value: "butters", title: "Butters Stotch"},
          {id: 106, value: "stan", title: "Stan Marsh"},
          {id: 107, value: "randy", title: "Randy Marsh"},
          {id: 108, value: "Mr. Garrison", title: "POTUS"},
          {id: 109, value: "Mr. Mackey", title: "M'Kay"}
        ]
      })
    , []);

    return (
        <>
            <button onClick={() => setCn('bar xxx aaaa')}>change classname</button>
            <fieldset>
                <legend>Normal</legend>
                <Tags
                    tagifyRef={tagifyRef}
                    className={cn}
                    placeholder={placeholder}
                    whitelist={["aaa", "xxx"]}
                    settings={{
                        maxTags: MAX_TAGS,
                        dropdown: {
                            enabled: true
                        }
                        // templates: {

                        // }
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
            </fieldset>

            <fieldset>
                <legend>Mixed</legend>
                <MixedTags
                    settings={mixTagsSettings}
                    value={`
This is a textarea which mixes text with [[{"value":"tags"}]].
To add a [[{"value":"tag"}]], type <em>@</em> and a (Latin) character. Here's a [[{"value":"readonly", "readonly":true}]] tag.
<br>
<small>(Only tags from the <em>whitelist</em> are allowed. <em>Whitelist</em> contains names of Southpark characters.)</small
<br>
<small>(Open this demo in a full-window to be able to type new-line returns)</small>
                    `}
                />
            </fieldset>
        </>
    )
}

export default App
