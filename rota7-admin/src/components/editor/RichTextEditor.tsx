import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"
import "./RichTextEditor.css"

type Props = {
  content?: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ content = "", onChange }: Props) {

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  // 🔥 ATUALIZA QUANDO VEM DO BACKEND
 useEffect(() => {
  if (!editor) return

  const current = editor.getHTML()

  if (content && content !== current) {
    editor.commands.setContent(content, {
  emitUpdate: false
})
  }

}, [content, editor])

  return (
    <div className="editor">
      <div className="editorContent">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}