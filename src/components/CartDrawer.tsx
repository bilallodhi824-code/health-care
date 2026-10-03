'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Upload,
  CheckCircle,
  Truck,
  CreditCard,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    showToast,
  } = useApp();

  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.medication.price * item.quantity, 0);
  const shipping = subtotal > 35 || cart.length === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  const hasPrescriptionMed = cart.some((item) => item.medication.requiresPrescription);

  const handleCheckout = () => {
    if (hasPrescriptionMed && !prescriptionUploaded) {
      showToast('Please upload prescription to fulfill prescription medications.');
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setOrderComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl text-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-400" />
              <h3 className="text-lg font-bold text-white">Pharmacy Cart</h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!orderComplete ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden py-4">
              {/* Item List */}
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-600" />
                  <p className="text-sm text-slate-400 font-medium">Your pharmacy cart is empty</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                  {cart.map(({ medication, quantity }) => (
                    <div
                      key={medication.id}
                      className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3"
                    >
                      <img
                        src={medication.image}
                        alt={medication.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-800"
                      />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {medication.name}
                        </h4>
                        <p className="text-[11px] text-teal-400">{medication.dosage}</p>
                        <p className="text-xs font-extrabold text-white mt-1">
                          ${medication.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(medication.id, quantity - 1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(medication.id, quantity + 1)}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(medication.id)}
                          className="p-1 text-rose-400 hover:text-rose-300 ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Prescription Upload Notice if Rx required */}
                  {hasPrescriptionMed && (
                    <div className="bg-teal-500/10 border border-teal-500/20 p-4 rounded-2xl space-y-2">
                      <p className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-teal-400" /> Rx Prescription Verification Needed
                      </p>
                      <p className="text-[11px] text-slate-300">
                        One or more items require a verified physician Rx.
                      </p>
                      <button
                        onClick={() => {
                          setPrescriptionUploaded(true);
                          showToast('Prescription uploaded & verified instantly!');
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          prescriptionUploaded
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                        }`}
                      >
                        {prescriptionUploaded ? '✓ Prescription Attached' : 'Upload Rx PDF / Photo'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Order Summary & Checkout */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
                  <div className="space-y-1.5 text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Express Delivery</span>
                      <span className="text-white font-bold">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                      <span>Total Amount</span>
                      <span className="text-teal-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    {isCheckingOut ? (
                      'Processing Medication Dispatch...'
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-slate-950" />
                        Place Prescription Order (${total.toFixed(2)})
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Order Success View */
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">Order Confirmed!</h4>
                <p className="text-xs text-teal-400 mt-1">Order #RX-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 w-full text-left space-y-2 text-xs">
                <p className="text-slate-300 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-400" />
                  Estimated Delivery: <strong className="text-white">Same-Day Express (2 Hours)</strong>
                </p>
                <p className="text-slate-400 text-[11px]">
                  Temperature-controlled pharmaceutical transit assigned.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                Back to Pharmacy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
