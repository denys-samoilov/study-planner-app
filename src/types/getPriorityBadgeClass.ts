export const getPriorityBadgeClass = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning text-dark';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };