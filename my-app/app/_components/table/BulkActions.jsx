import { Button } from "@/components/ui/button";
import { Trash2, Settings } from "lucide-react";

export default function BulkActions({ selectedCount, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-t bg-sidebar border-b">
      {selectedCount > 0 && (
        <span className="text-sm font-medium">
          {selectedCount} items selected
        </span>
      )}
      {selectedCount > 0 && (
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={onDelete}
            className="flex items-center gap-1"
            disabled={selectedCount === 0}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            disabled={selectedCount === 0}
          >
            <Settings className="w-4 h-4" />
            Bulk Actions
          </Button>
        </div>
      )}
    </div>
  );
}
