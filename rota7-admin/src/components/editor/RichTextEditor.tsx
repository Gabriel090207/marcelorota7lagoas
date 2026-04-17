import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { useEffect, useState } from "react"
import { uploadImage } from "../../services/storage"
import {
  FiImage,
  FiTrash2,
  FiLink,
  FiSlash
} from "react-icons/fi"

import "./RichTextEditor.css"

type Props = {
  content?: string
  onChange: (value: string) => void
}

export default function RichTextEditor({
  content = "",
  onChange
}: Props) {
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [linkValue, setLinkValue] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit,

      Image.configure({
        inline: false,
        allowBase64: false
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer nofollow"
        }
      })
    ],

    content: content || "<p></p>",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  useEffect(() => {
    if (!editor) return

    const current = editor.getHTML()

    if (content !== current) {
      editor.commands.setContent(content || "<p></p>", {
        emitUpdate: false
      })
    }
  }, [content, editor])

  const handleAddImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    const url = await uploadImage(file)

    const html = `
      <img src="${url}" alt="" />
      <p class="editorCaptionPlaceholder"></p>
      <p></p>
    `

    editor
      .chain()
      .focus()
      .insertContent(html)
      .run()

    e.target.value = ""
  }

  const handleAddLink = () => {
    if (!editor) return

    const current =
      editor.getAttributes("link").href || ""

    setLinkValue(current)
    setLinkModalOpen(true)
  }

  const handleSaveLink = () => {
    if (!editor) return

    if (!linkValue.trim()) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: linkValue
        })
        .run()
    }

    setLinkModalOpen(false)
    setLinkValue("")
  }

  const handleRemoveLink = () => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .unsetLink()
      .run()
  }

  const handleRemoveImage = () => {
    if (!editor) return

    editor
      .chain()
      .focus()
      .deleteSelection()
      .run()
  }

  return (
    <div className="editor">

      <div className="editorToolbar">

        <label className="editorBtn">
          <FiImage size={16} />
          <span>Imagem</span>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAddImage}
          />
        </label>

        <button
          type="button"
          className="editorBtn"
          onClick={handleAddLink}
        >
          <FiLink size={16} />
          <span>Link</span>
        </button>

        <button
          type="button"
          className="editorBtn"
          onClick={handleRemoveLink}
        >
          <FiSlash size={16} />
          <span>Remover Link</span>
        </button>

        <button
          type="button"
          className="editorBtn"
          onClick={handleRemoveImage}
        >
          <FiTrash2 size={16} />
          <span>Remover</span>
        </button>

      </div>

      <div className="editorContent">
        <EditorContent editor={editor} />
      </div>

      {linkModalOpen && (
        <div className="editorModalOverlay">
          <div className="editorModal">

            <h3>Adicionar link</h3>

            <input
              type="text"
              className="editorModalInput"
              placeholder="https://instagram.com/empresa"
              value={linkValue}
              onChange={(e) =>
                setLinkValue(e.target.value)
              }
            />

            <div className="editorModalActions">

              <button
                type="button"
                className="editorBtn"
                onClick={() =>
                  setLinkModalOpen(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="editorBtn"
                onClick={handleSaveLink}
              >
                Salvar
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}