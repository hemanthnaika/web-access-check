const CircleChart = ({ value }: { value: number }) => {
  const percentage = value; // e.g., 56

  return (
    <div className="flex items-center justify-center bg-primary p-5 rounded-lg -z-20">
      <div
        className="relative size-32 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(#4f46e5 ${
            percentage * 3.6
          }deg, #e5e7eb 0deg)`,
        }}
      >
        <div className="absolute bg-white rounded-full size-16  flex items-center justify-center ">
          <span className="text-sm font-semibold">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default CircleChart;
