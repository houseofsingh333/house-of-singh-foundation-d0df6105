import { useEffect } from "react";

const Studio = () => {
  useEffect(() => {
    window.location.href = "https://studios.houseofsingh.com";
  }, []);

  return (
    <div className="px-6 py-16 text-center">
      <p className="text-muted-foreground">Redirecting to studios.houseofsingh.com…</p>
    </div>
  );
};

export default Studio;
