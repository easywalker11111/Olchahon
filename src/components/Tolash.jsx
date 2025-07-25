import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [billingData, setBillingData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    sameAsShipping: true,
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePromoCode = () => {
    if (promoCode.trim() === 'CASPER10') {
      setDiscountApplied(true);
      alert('10% discount applied!');
    } else {
      alert('Invalid promo code');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 4) {
      setOrderConfirmed(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const calculateTotal = () => {
    if (discountApplied) {
      return totalPrice * 0.9;
    }
    return totalPrice;
  };

  const formattedTotal = calculateTotal().toLocaleString('ru-RU');
  const discountAmount = discountApplied ? (totalPrice * 0.1).toLocaleString('ru-RU') : 0;

  const ProgressBar = ({ currentStep }) => {
    const steps = ['SHIPPING', 'DELIVERY', 'BILLING', 'CONFIRM'];
    
    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center 
                ${currentStep > index + 1 ? 'bg-green-500' : 
                   currentStep === index + 1 ? 'bg-blue-500' : 'bg-gray-300'} 
                text-white font-medium`}>
                {currentStep > index + 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="ml-2 text-sm font-medium hidden sm:block">{step}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'} mx-2`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const OrderSummary = () => {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>
        
        <div className="space-y-4 mb-6">
          {cartItems.map(item => (
            <div key={item.key} className="flex justify-between">
              <div>
                <p className="font-medium">{item.title}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.color && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Color: {item.color}
                    </span>
                  )}
                  {item.memory && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Memory: {item.memory}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p>{(item.price * 12500 * item.quantity).toLocaleString('ru-RU')} сум</p>
                <p className="text-sm text-gray-500">{item.quantity} x {(item.price * 12500).toLocaleString('ru-RU')} сум</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>{totalPrice.toLocaleString('ru-RU')} сум</span>
          </div>
          
          {discountApplied && (
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount (10%)</span>
              <span>-{discountAmount} сум</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formattedTotal} сум</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Apply Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePromoCode}
              className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-colors"
            >
              Apply
            </button>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Don't love your Casper product?<br />
            We'll give you a full refund.
          </p>
        </div>
      </div>
    );
  };

  const ShippingStep = () => {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6">SHIPPING ADDRESS</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={shippingData.firstName}
                onChange={handleShippingChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={shippingData.lastName}
                onChange={handleShippingChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingData.address}
              onChange={handleShippingChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
              Apartment/Suite #
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={shippingData.apartment}
              onChange={handleShippingChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingData.city}
                onChange={handleShippingChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={shippingData.state}
                onChange={handleShippingChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code *
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={shippingData.zip}
                onChange={handleShippingChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <div className="flex">
              <div className="border border-gray-300 rounded-l-lg px-4 py-2 bg-gray-100 flex items-center">
                +1
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={shippingData.phone}
                onChange={handleShippingChange}
                required
                className="w-full border border-gray-300 border-l-0 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to="/cart" className="px-6 py-3 text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors">
              Back to Cart
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Continue to Delivery
            </button>
          </div>
        </form>
      </div>
    );
  };

  const DeliveryStep = () => {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6">DELIVERY OPTIONS</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
              <input
                type="radio"
                id="standard"
                name="delivery"
                value="standard"
                checked={deliveryOption === 'standard'}
                onChange={() => setDeliveryOption('standard')}
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="standard" className="ml-3 flex-1">
                <div className="font-medium">Standard Delivery</div>
                <div className="text-gray-600">3-5 business days</div>
              </label>
              <div className="font-medium">Free</div>
            </div>
            
            <div className="flex items-center border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
              <input
                type="radio"
                id="express"
                name="delivery"
                value="express"
                checked={deliveryOption === 'express'}
                onChange={() => setDeliveryOption('express')}
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="express" className="ml-3 flex-1">
                <div className="font-medium">Express Delivery</div>
                <div className="text-gray-600">1-2 business days</div>
              </label>
              <div className="font-medium">$19.99</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Back to Shipping
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Continue to Billing
            </button>
          </div>
        </form>
      </div>
    );
  };

  const BillingStep = () => {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6">BILLING INFORMATION</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="sameAsShipping"
              name="sameAsShipping"
              checked={billingData.sameAsShipping}
              onChange={handleBillingChange}
              className="h-5 w-5 text-blue-600"
            />
            <label htmlFor="sameAsShipping" className="ml-2 text-gray-700">
              Billing address same as shipping address
            </label>
          </div>
          
          {!billingData.sameAsShipping && (
            <div className="mb-6">
              <h3 className="font-medium mb-4">Different Billing Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="billingFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="billingFirstName"
                    name="billingFirstName"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="billingLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="billingLastName"
                    name="billingLastName"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="billingState"
                    name="billingState"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    id="billingZip"
                    name="billingZip"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-medium mb-4">Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card *
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={billingData.cardName}
                  onChange={handleBillingChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={billingData.cardNumber}
                  onChange={handleBillingChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={billingData.expiry}
                  onChange={handleBillingChange}
                  required
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={billingData.cvv}
                  onChange={handleBillingChange}
                  required
                  placeholder="123"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Back to Delivery
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Review Order
            </button>
          </div>
        </form>
      </div>
    );
  };

  const ConfirmationStep = () => {
    if (orderConfirmed) {
      return (
        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center">
          <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon. 
            A confirmation email has been sent to your email address.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
            <h3 className="font-medium text-lg mb-4">Order Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">{formattedTotal} сум</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">Credit Card</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6">ORDER CONFIRMATION</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Shipping Information</h3>
            <div className="space-y-2 text-gray-700">
              <p>{shippingData.firstName} {shippingData.lastName}</p>
              <p>{shippingData.address}</p>
              {shippingData.apartment && <p>Apt/Suite: {shippingData.apartment}</p>}
              <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
              <p>Phone: +1 {shippingData.phone}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Billing Information</h3>
            {billingData.sameAsShipping ? (
              <div className="space-y-2 text-gray-700">
                <p>Same as shipping address</p>
              </div>
            ) : (
              <div className="space-y-2 text-gray-700">
                <p>{billingData.firstName} {billingData.lastName}</p>
                <p>{billingData.address}</p>
                <p>{billingData.city}, {billingData.state} {billingData.zip}</p>
              </div>
            )}
            
            <div className="mt-4">
              <h3 className="font-medium text-lg mb-4">Payment Method</h3>
              <div className="space-y-2 text-gray-700">
                <p>Credit Card ending in ****{billingData.cardNumber?.slice(-4)}</p>
                <p>Expires: {billingData.expiry}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-medium text-lg mb-4">Delivery Method</h3>
          <p className="text-gray-700 capitalize">{deliveryOption} Delivery</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Total:</span>
            <span className="text-2xl font-bold text-gray-900">{formattedTotal} сум</span>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Edit Order
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      
      <ProgressBar currentStep={currentStep} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && <ShippingStep />}
          {currentStep === 2 && <DeliveryStep />}
          {currentStep === 3 && <BillingStep />}
          {currentStep === 4 && <ConfirmationStep />}
        </div>
        
        <div>
          <OrderSummary />
          
          {currentStep !== 4 && (
            <div className="mt-6 flex justify-center">
              <button className="flex items-center text-blue-600 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Talk To Casper
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;