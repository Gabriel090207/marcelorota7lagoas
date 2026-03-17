import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import "./RichTextEditor.css"

export default function RichTextEditor() {

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p></p>
    `
  })

  return (
    <div className="editor">

      <div className="editorContent">
        <EditorContent editor={editor} />
      </div>

    </div>
  )
}