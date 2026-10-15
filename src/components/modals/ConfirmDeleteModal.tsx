import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  isLoading?: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message,
  itemName,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-semibold">
            This action deletes the record from current in-memory preview state.
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {message || (
            <>
              Are you sure you want to permanently delete{' '}
              {itemName ? <strong className="text-foreground">"{itemName}"</strong> : 'this record'}?
              This operation cannot be undone.
            </>
          )}
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/60">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full px-4"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            className="rounded-full px-5 bg-rose-600 hover:bg-rose-700 text-white font-semibold"
          >
            Confirm Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
