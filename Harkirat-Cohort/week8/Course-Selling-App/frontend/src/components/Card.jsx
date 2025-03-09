
export function Card({ children, width, backgroundColor, height }) {
  return (
    <>
      <div
        style={{ width, backgroundColor, height }}
        className={`px-6 py-3 rounded-2xl`}
      >
        {children}
      </div>
    </>
  );
}
