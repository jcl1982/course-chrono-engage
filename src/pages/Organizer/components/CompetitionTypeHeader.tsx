
interface CompetitionTypeHeaderProps {
  type: 'hillclimb' | 'slalom';
}

export const CompetitionTypeHeader = ({ type }: CompetitionTypeHeaderProps) => {
  const title = type === 'hillclimb' ? 'Courses de Côte' : 'Slaloms';
  const description = type === 'hillclimb' 
    ? 'Gérez vos courses de côte et les inscriptions'
    : 'Gérez vos slaloms et les inscriptions';

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-red-500">
        Gestion des {title}
      </h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};
