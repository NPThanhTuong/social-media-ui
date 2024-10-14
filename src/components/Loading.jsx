import { InfinitySpin } from "react-loader-spinner";

function Loading({ width = "200", color = "#1FA2FF", title = "Đang tải lên" }) {
  return (
    <div className="flex flex-col items-center">
      <InfinitySpin
        visible={true}
        color={color}
        width={width}
        ariaLabel="infinity-spin-loading"
      />
      <p>{title}</p>
    </div>
  );
}

export default Loading;
