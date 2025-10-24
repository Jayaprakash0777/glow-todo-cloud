import { useState } from "react";
import { Trash2, Edit2, Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "personal" | "work" | "shopping" | "health" | "other";
  due_date: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const priorityColors = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const categoryColors = {
  personal: "bg-primary/10 text-primary border-primary/20",
  work: "bg-accent/10 text-accent border-accent/20",
  shopping: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  health: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  other: "bg-muted text-muted-foreground border-border",
};

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 border-l-4" 
          style={{ borderLeftColor: `hsl(var(--${todo.priority === 'high' ? 'destructive' : todo.priority === 'medium' ? 'warning' : 'success'}))` }}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked) => onToggle(todo.id, checked as boolean)}
          className="mt-1"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-semibold ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 ${todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
                  {todo.description}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(todo)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => onDelete(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={priorityColors[todo.priority]}>
              {todo.priority}
            </Badge>
            <Badge variant="outline" className={categoryColors[todo.category]}>
              <Tag className="h-3 w-3 mr-1" />
              {todo.category}
            </Badge>
            {todo.due_date && (
              <Badge variant="outline" className="bg-background">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(todo.due_date), "MMM dd, yyyy")}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
