// 1件のタスク行。完了済みは done クラスでグレー表示する
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.done ? ' task-item--done' : ''}`}>
      <label className="task-item__label">
        <input
          type="checkbox"
          className="task-item__checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__title">{task.title}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label="削除"
      >
        削除
      </button>
    </li>
  )
}
