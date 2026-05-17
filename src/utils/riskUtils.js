export const getRiskColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'critical':
      return 'text-red-500 bg-red-500/10 border-red-500/20';
    case 'high':
      return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'medium':
      return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'low':
      return 'text-green-500 bg-green-500/10 border-green-500/20';
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
};

export const getRiskIconColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'critical':
      return '#ef4444';
    case 'high':
      return '#f97316';
    case 'medium':
      return '#eab308';
    case 'low':
      return '#22c55e';
    default:
      return '#9ca3af';
  }
};
