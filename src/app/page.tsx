'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Sample task - click to complete', completed: false, createdAt: new Date() },
    { id: 2, title: 'Another task - completed', completed: true, createdAt: new Date() },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
    };
    
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setIsLoading(false);
  };

  const toggleTask = async (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = async (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Test Task Manager
          </h1>
          <p className="mt-2 text-muted-foreground">
            A simple task management application built with Next.js
          </p>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
              <CardDescription>
                Create a new task to add to your list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="task-input" className="sr-only">
                    Task title
                  </Label>
                  <Input
                    id="task-input"
                    placeholder="Enter task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  />
                </div>
                <Button 
                  onClick={addTask} 
                  disabled={!newTaskTitle.trim() || isLoading}
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isLoading ? 'Adding...' : 'Add Task'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Tasks</h2>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {completedCount} of {totalCount} completed
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No tasks yet. Add your first task above!
                </p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="shrink-0 text-primary hover:text-primary/80 transition-colors"
                      aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${
                        task.completed 
                          ? 'line-through text-muted-foreground' 
                          : 'text-foreground'
                      }`}>
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Created {task.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="shrink-0 text-destructive hover:text-destructive/80"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Test Task App - Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}