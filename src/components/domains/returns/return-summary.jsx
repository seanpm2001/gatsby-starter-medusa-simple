import { Link } from "gatsby"
import React, { useState } from "react"
import { formatPrice } from "../../../utils/format-price"

const ReturnSummary = ({
  items,
  additionalItems,
  shipping = null,
  currencyCode,
}) => {
  const [accepted, setAccepted] = useState(false)

  const refundAmount = items.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  )

  const shippingAmount = shipping ? shipping.amount : 0

  return (
    <div className="bg-white shadow p-8 rounded-lg sticky top-28">
      <div className="flex flex-col">
        <h2 className="mb-3">Summary</h2>
        <div className="flex items-center justify-between mb-2">
          <p>Refund amount</p>
          <p>{formatPrice(refundAmount, currencyCode)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>– {formatPrice(shippingAmount, currencyCode)}</p>
        </div>
        <div className="h-px w-full bg-ui-medium my-2" />
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>{formatPrice(refundAmount - shippingAmount, currencyCode)}</p>
        </div>
        <label className="mt-3">
          <input
            type="checkbox"
            className="checkbox-ui"
            onChange={() => setAccepted(!accepted)}
          />
          <span>
            You agree with the{" "}
            <Link to="terms-and-conditions">Terms &amp; Conditions</Link> and
            our <Link to="/return-policy">Return Policy</Link>
          </span>
        </label>
        <button
          className="btn-ui mt-4 disabled:bg-ui disabled:cursor-default"
          disabled={!accepted}
        >
          Confirm Return
        </button>
      </div>
    </div>
  )
}

export default ReturnSummary
