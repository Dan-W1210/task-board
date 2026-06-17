import { useState } from 'react'

// タスク追加用の入力フォーム
export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input__field"
        placeholder="新しいタスクを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="task-input__button">
        追加
      </button>
    </form>
  )
}
