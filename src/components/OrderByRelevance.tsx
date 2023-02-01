export const OrderByRelevance = ({
  isOrderedByRelevance,
  setIsOrderedByRelevance,
  setApiData,
}: any) => {
  const toggleOrderByRelevance = () => {
    setApiData(null);
    setIsOrderedByRelevance(!isOrderedByRelevance);
  };

  return (
    <div className="flex justify-center space-x-2 my-3" onClick={toggleOrderByRelevance}>
      <button>Ordenar por relevância</button>
      <input type="checkbox" checked={isOrderedByRelevance} readOnly />
    </div>
  );
};
