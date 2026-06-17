import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'

const STORAGE_KEY = 'task-board.tasks'

// localStorage から初期タスクを読み込む
function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)

  // タスクが変わるたびに localStorage へ保存する
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // タスクを追加する
  function addTask(title) {
    const trimmed = title.trim()
    if (!trimmed) return
    const newTask = {
      id: crypto.randomUUID(),
      title: trimmed,
      done: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  // 完了・未完了を切り替える
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  // タスクを削除する
  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const remaining = tasks.filter((task) => !task.done).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>
        <p className="app-summary">
          全 {tasks.length} 件 / 未完了 {remaining} 件
        </p>
      </header>

      <main className="app-main">
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  )
}
