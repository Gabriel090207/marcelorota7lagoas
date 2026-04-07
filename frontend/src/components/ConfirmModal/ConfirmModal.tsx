import "./ConfirmModal.css"

type Props = {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel
}: Props) {

  if (!open) return null

  return (
    <div className="confirmOverlay" onClick={onCancel}>

      <div
  className="confirmModal"
  onClick={(e) => e.stopPropagation()}
>

        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirmActions">
          <button className="btn btn--outline" onClick={onCancel}>
            Cancelar
          </button>

          <button className="btn btn--danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>

      </div>

    </div>
  )
}