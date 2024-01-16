// To make the server side rendering (the most parent) with React

"use client";

import { useEffect } from "react";

function Test() {
  useEffect(() => {
    console.log("abc")
  }, []);
  
  return(
    <div>This is Test</div>
  );
}

export default Test;