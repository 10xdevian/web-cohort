const bgColor = {
  sky: "#2b64d3",
  iconBg: "#75aaf8",
  cardBg: "#eef2f9",
};

const roundedSizes = {
  full: "rounded-full",
};

const borderColors = {
  sky: "#2b64d3",
  border2:"border-2",
};

const borderSizes = {
    "2": "border-2",
    "4": "border-4",
    "8": "border-8",
  };


export default function Button({
  onClick,
  children,
  backgroundColor,
  rounded,
  borderColor,
  borderSize,
}) {
  return (
    <>
      <button
        onClick={onClick}
        style={{
          backgroundColor: bgColor[backgroundColor],
          borderColor: borderColors[borderColor],
        }}
        className={`${roundedSizes[rounded]}  py-2 px-7 cursor-pointer ${borderSizes[borderSize]}`}
      >
        {children}
      </button>
    </>
  );
}

export default function Card({children}){
    return(
        <>
        <div className={``}>
            {children}
        </div>
        </>
    )
}
