// Updated Loading.jsx with dark mode support

import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-60 dark:bg-opacity-80">
      <div className="loader "></div>
    </div>
  );
}
