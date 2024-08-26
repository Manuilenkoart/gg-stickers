'use client';

import { Toaster } from 'react-hot-toast';

function Toast() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={true}
    />
  );
}

export default Toast;
