import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Collapse,
  Button
} from '@mui/material';
import { useState, useEffect, useMemo } from 'react';

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = 'healthbreak-todos';
const COMPLETED_COLLAPSE_THRESHOLD = 5;

function loadTodos(): TodoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: TodoItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>(loadTodos);
  const [input, setInput] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const activeTodos = useMemo(() => todos.filter((t) => !t.done), [todos]);
  const completedTodos = useMemo(() => todos.filter((t) => t.done), [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="overline" sx={{ opacity: 0.7, letterSpacing: 2 }}>
        Tasks
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          sx={{
            flex: 1,
            '& .MuiInputBase-root': {
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.08)',
              borderRadius: 1
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.2)'
            }
          }}
        />
        <IconButton
          onClick={addTodo}
          sx={{ color: 'white', fontSize: '1.2rem' }}
        >
          +
        </IconButton>
      </Box>

      <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
        {activeTodos.map((todo) => (
          <ListItem
            key={todo.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                onClick={() => deleteTodo(todo.id)}
                sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}
              >
                ✕
              </IconButton>
            }
          >
            <Checkbox
              size="small"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              sx={{
                color: 'rgba(255,255,255,0.5)',
                '&.Mui-checked': { color: 'rgba(100,255,150,0.7)' }
              }}
            />
            <ListItemText primary={todo.text} />
          </ListItem>
        ))}
        {activeTodos.length === 0 && (
          <Typography
            variant="body2"
            sx={{ opacity: 0.4, textAlign: 'center', py: 1 }}
          >
            No tasks yet
          </Typography>
        )}
      </List>

      {completedTodos.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Button
            size="small"
            variant="text"
            onClick={() => setShowCompleted((v) => !v)}
            sx={{
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'none',
              fontSize: '0.75rem',
              p: 0,
              minWidth: 0
            }}
          >
            {showCompleted ? '▾' : '▸'} Completed ({completedTodos.length})
          </Button>
          <Collapse
            in={
              showCompleted ||
              completedTodos.length <= COMPLETED_COLLAPSE_THRESHOLD
            }
          >
            <List dense sx={{ maxHeight: 150, overflow: 'auto' }}>
              {completedTodos.map((todo) => (
                <ListItem
                  key={todo.id}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => deleteTodo(todo.id)}
                      sx={{
                        color: 'rgba(255,255,255,0.3)',
                        fontSize: '0.8rem'
                      }}
                    >
                      ✕
                    </IconButton>
                  }
                >
                  <Checkbox
                    size="small"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    sx={{
                      color: 'rgba(255,255,255,0.3)',
                      '&.Mui-checked': { color: 'rgba(100,255,150,0.5)' }
                    }}
                  />
                  <ListItemText
                    primary={todo.text}
                    sx={{ textDecoration: 'line-through', opacity: 0.45 }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      )}
    </Box>
  );
}
