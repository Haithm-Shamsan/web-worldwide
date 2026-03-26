import { useSearchParams } from "react-router-dom";

function UseUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat") ? searchParams.get("lat") : "";
  const lng = searchParams.get("lng") ? searchParams.get("lng") : "";

  return [lat, lng];
}

export default UseUrlPosition;
