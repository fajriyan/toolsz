"use client";
import React, { useState } from "react";

const ToastComponent = () => {
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Menutup toast setelah 3 detik
  };

  return (
    <div>
      <h1>Contoh Toast Sederhana</h1>
      <button onClick={showToastMessage}>Tampilkan Toast</button>
      {showToast && (
        <div className="toast">Ini adalah pesan toast sederhana!</div>
      )}
    </div>
  );
};

export default ToastComponent;
