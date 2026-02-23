"use client";

import { cn } from "@/lib/utils";
import { categories, type ToolCategory } from "@/data/tools";

interface CategoryFilterProps {
  activeCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
  counts: Record<ToolCategory, number>;
}

export function CategoryFilter({ activeCategory, onCategoryChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border border-zinc-200",
            "hover:border-zinc-400",
            activeCategory === category.id
              ? "bg-zinc-900 text-white border-zinc-900"
              : "bg-white text-zinc-700"
          )}
        >
          {category.label}
          <span className={cn(
            "ml-2 text-xs",
            activeCategory === category.id
              ? "text-zinc-300"
              : "text-zinc-400"
          )}>
            {counts[category.id] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
